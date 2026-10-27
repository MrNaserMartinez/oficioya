# Evidencias de la ejecución — 26/10/2026

Capturas tomadas en Microsoft Edge (headless, Playwright 1.64.1) sobre la versión integrada
de `main` (commit `c766d73`), servida en `http://127.0.0.1:8000` con
`python -m http.server 8000`.

- `PRU-XX.png`: captura principal del caso.
- Los sufijos indican el paso o la pantalla adicional (`_formulario`, `_codigo`, `_perfil`, etc.).
- `PRU-35_error.png` es la pantalla de excepción abierta directamente; **no** es un error de la prueba.
- Las capturas `exploracion-*.png` son del recorrido inicial del flujo completo.

| Caso | Archivos |
|---|---|
| PRU-01 | PRU-01.png, PRU-01_formulario.png |
| PRU-02 | PRU-02.png |
| PRU-03 | PRU-03.png |
| PRU-04 | PRU-04.png, PRU-04_codigo.png |
| PRU-05 | PRU-05.png |
| PRU-06 | PRU-06.png, PRU-06_admin.png |
| PRU-07 | PRU-07.png |
| PRU-08 | PRU-08.png |
| PRU-09 | PRU-09.png |
| PRU-10 | PRU-10.png, PRU-10_formulario.png |
| PRU-11 | PRU-11.png |
| PRU-12 | PRU-12.png |
| PRU-13 | PRU-13.png |
| PRU-14 | PRU-14.png |
| PRU-15 | PRU-15.png |
| PRU-16 | PRU-16.png |
| PRU-17 | PRU-17.png |
| PRU-18 | PRU-18.png |
| PRU-19 | PRU-19.png, PRU-19_ajeno.png |
| PRU-20 | PRU-20.png |
| PRU-21 | PRU-21.png, PRU-21_cliente.png |
| PRU-22 | PRU-22.png, PRU-22_perfil.png |
| PRU-23 | PRU-23.png, PRU-23_1.png |
| PRU-24 | PRU-24.png |
| PRU-25 | PRU-25.png |
| PRU-26 | PRU-26.png |
| PRU-27 | PRU-27.png |
| PRU-28 | PRU-28.png |
| PRU-29 | PRU-29.png |
| PRU-30 | PRU-30.png |
| PRU-31 | PRU-31.png |
| PRU-32 | PRU-32.png |
| PRU-33 | PRU-33.png |
| PRU-34 | PRU-34.png |
| PRU-35 | PRU-35_banner.png, PRU-35_error.png, PRU-35_ruta.png |
| PRU-36 | PRU-36.png |
| PRU-37 | PRU-37.png, PRU-37_busqueda.png, PRU-37_recuperar.png |

Resultado: 36 aprobados y 1 fallido (PRU-35, DEF-01). Detalle en
`docs/05-casos-de-prueba.md`.
