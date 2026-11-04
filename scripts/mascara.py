"""Genera la máscara de tela de una foto para el recoloreo (PNG en escala de grises: blanco = tela).

Uso:
  python3 scripts/mascara.py <foto> <salida.png> [opciones]

Toma los píxeles del tono de la tela: los apliques metálicos, las patas y el fondo neutro quedan
afuera porque tienen otro tono o no tienen saturación.

Opciones:
  --hex '#d81f7d'     color de la tela en la foto (recomendado; si no, se adivina el tono dominante)
  --sat 42            saturación mínima (bajala para telas claras, subila si se cuela el fondo)
  --tol 14            cuánto puede variar el tono
  --cierre 5          tapar pliegues oscuros (15-25 en respaldos con gajos; rellena huecos cerrados)
  --piezas 1          quedarse también con piezas separadas de al menos esta fracción de la mayor
                      (ej. 0.05 para un mostrador con puffs y silla)
  --zona x0,y0,x1,y1  limitar a un recuadro (fracciones de 0 a 1) si se cuela algo del fondo
  --quitar x0,y0,x1,y1  sacar un recuadro (ej. almohadones estampados); se puede repetir
  --sin-sombra        no sumar el borde oscuro (usalo si la pared de atrás es oscura)
"""
import argparse
import cv2
import numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('foto')
ap.add_argument('salida')
ap.add_argument('--hex')
ap.add_argument('--sat', type=int, default=42)
ap.add_argument('--tol', type=int, default=14)
ap.add_argument('--cierre', type=int, default=5)
ap.add_argument('--piezas', type=float, default=1)
ap.add_argument('--zona')
ap.add_argument('--sin-sombra', action='store_true')
ap.add_argument('--quitar', action='append', default=[])
a = ap.parse_args()

img = cv2.imread(a.foto, cv2.IMREAD_COLOR)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
h, s, v = cv2.split(hsv)
alto, ancho = h.shape

if a.hex:
    r, g, b = (int(a.hex.lstrip('#')[i:i + 2], 16) for i in (0, 2, 4))
    tono = int(cv2.cvtColor(np.uint8([[[b, g, r]]]), cv2.COLOR_BGR2HSV)[0, 0, 0])
else:
    sat = s > max(a.sat, 90)
    hist = np.bincount(h[sat].ravel(), minlength=180)
    hist = np.convolve(np.concatenate([hist[-5:], hist, hist[:5]]), np.ones(5), 'valid')[3:-3][:180]
    tono = int(np.argmax(hist))
dif = np.minimum(np.abs(h.astype(int) - tono), 180 - np.abs(h.astype(int) - tono))
m = ((dif <= a.tol) & (s > a.sat) & (v > 8)).astype(np.uint8) * 255

zona = np.zeros_like(m)
if a.zona:
    x0, y0, x1, y1 = (float(t) for t in a.zona.split(','))
    zona[int(y0 * alto):int(y1 * alto), int(x0 * ancho):int(x1 * ancho)] = 255
else:
    zona[:] = 255
for q in a.quitar:
    x0, y0, x1, y1 = (float(t) for t in q.split(','))
    zona[int(y0 * alto):int(y1 * alto), int(x0 * ancho):int(x1 * ancho)] = 0
m &= zona

# Limpieza: quedarse con la pieza más grande (y las que pidan --piezas), cerrar huequitos
m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
n, lab, stats, _ = cv2.connectedComponentsWithStats(m)
if n > 1:
    areas = stats[1:, cv2.CC_STAT_AREA]
    quedan = 1 + np.flatnonzero(areas >= areas.max() * min(a.piezas, 1))
    m = np.where(np.isin(lab, quedan), 255, 0).astype(np.uint8)
m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (a.cierre, a.cierre)))
if a.cierre > 5:
    relleno = m.copy()
    cv2.floodFill(relleno, np.zeros((alto + 2, ancho + 2), np.uint8), (0, 0), 255)
    m = m | cv2.bitwise_not(relleno)
# Sumar el borde en sombra (muy oscuro, pierde el tono) pegado a la tela
for _ in range(0 if a.sin_sombra else 3):
    borde = cv2.dilate(m, np.ones((5, 5), np.uint8)) & ~m
    m = m | (borde & np.where(v < 60, 255, 0).astype(np.uint8) & zona)
# Agrandar 2 px para que no quede un contorno del color original
m = cv2.dilate(m, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))) & zona
# Bordes suaves
m = cv2.GaussianBlur(m, (0, 0), 0.8)
cv2.imwrite(a.salida, m)
print(f'tono {tono}, tela {int((m > 127).mean() * 100)}% de la foto')
