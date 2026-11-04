"""Genera la máscara de tela de una foto para el recoloreo.

Uso: python3 scripts/mascara.py <foto> <salida.png> [umbral_saturacion] [tolerancia_tono] [cierre]

cierre (px, por defecto 5): agrandalo (15-25) para tapar pliegues oscuros entre gajos.
Si es mayor a 5 también se rellenan los huecos cerrados dentro de la tela.

Toma los píxeles con el tono dominante de la tela (los apliques metálicos, patas y el fondo
quedan afuera porque no tienen saturación) y guarda un PNG en escala de grises: blanco = tela.
"""
import sys
import cv2
import numpy as np

foto, salida = sys.argv[1], sys.argv[2]
umbral_sat = int(sys.argv[3]) if len(sys.argv) > 3 else 42
tol_tono = int(sys.argv[4]) if len(sys.argv) > 4 else 14
cierre = int(sys.argv[5]) if len(sys.argv) > 5 else 5

img = cv2.imread(foto, cv2.IMREAD_COLOR)
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
h, s, v = cv2.split(hsv)

# Tono dominante entre los píxeles bien saturados
sat = s > max(umbral_sat, 90)
hist = np.bincount(h[sat].ravel(), minlength=180)
hist = np.convolve(np.concatenate([hist[-5:], hist, hist[:5]]), np.ones(5), 'valid')[3:-3][:180]
tono = int(np.argmax(hist))
dif = np.minimum(np.abs(h.astype(int) - tono), 180 - np.abs(h.astype(int) - tono))
m = ((dif <= tol_tono) & (s > umbral_sat) & (v > 8)).astype(np.uint8) * 255

# Limpieza: quedarse con la pieza más grande, cerrar huequitos de pliegues
m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
n, lab, stats, _ = cv2.connectedComponentsWithStats(m)
if n > 1:
    mayor = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    m = np.where(lab == mayor, 255, 0).astype(np.uint8)
m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (cierre, cierre)))
if cierre > 5:
    relleno = m.copy()
    cv2.floodFill(relleno, np.zeros((m.shape[0] + 2, m.shape[1] + 2), np.uint8), (0, 0), 255)
    m = m | cv2.bitwise_not(relleno)
# Sumar el borde en sombra (muy oscuro, pierde el tono) pegado a la tela
for _ in range(3):
    borde = cv2.dilate(m, np.ones((5, 5), np.uint8)) & ~m
    m = m | (borde & np.where(v < 60, 255, 0).astype(np.uint8))
# Bordes suaves
m = cv2.GaussianBlur(m, (0, 0), 0.8)
cv2.imwrite(salida, m)
print(f'tono {tono}, tela {int((m > 127).mean() * 100)}% de la foto')
