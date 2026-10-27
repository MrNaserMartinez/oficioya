# OficioYa Jutiapa: prototipo navegable

Proyecto final de **Análisis de Sistemas**, UMG Campus Jutiapa (entrega: 30 de octubre de 2026).

Es una plataforma que conecta a clientes de Jutiapa cabecera con prestadores de **pinchazos** (modalidad inmediata), **electricistas** (modalidad diagnóstico) y **herreros** (modalidad por presupuesto).

---

## Cómo abrirlo

- **En línea:** GitHub Pages (Settings → Pages → rama `main`, carpeta `/root`).
- **Local, sin internet (respaldo para la demo):** abrir la carpeta en VS Code y usar *Live Server*, o ejecutar `python -m http.server` y entrar a `http://localhost:8000`. Bootstrap e íconos vienen dentro de `vendor/`, así que funciona sin conexión.
- Para empezar la demo desde cero: menú del usuario → **Reiniciar datos de prueba**.

### Usuarios de prueba (datos ficticios)

| Correo | Contraseña | Rol |
|---|---|---|
| cliente@demo.com | demo123 | Cliente |
| cliente2@demo.com | demo123 | Cliente (tiene la cotización COT-0003 pendiente) |
| electricista@demo.com | demo123 | Prestador **y** Cliente (al entrar elige rol) |
| pinchazos@demo.com | demo123 | Prestador de pinchazos, atiende inmediato |
| herrero@demo.com | demo123 | Prestador sin verificar |
| electricista2@demo.com | demo123 | Prestador sin verificar |
| admin@demo.com | admin123 | Administrador |
| soporte@demo.com | demo123 | Soporte (solo reclamos) |

---

## Arquitectura: monolito

Es **una sola aplicación**, en un solo repositorio, que se publica completa de una vez. Las interfaces de cliente, prestador y administración son módulos de la misma app y comparten un único núcleo de datos y reglas.

```
Navegador
 └─ OficioYa (una sola aplicación)
     ├─ Módulo cliente      → cliente/
     ├─ Módulo prestador    → prestador/
     ├─ Módulo admin/soporte→ admin/
     ├─ Acceso              → acceso/
     ├─ Componentes UI      → js/componentes.js
     ├─ Núcleo de negocio   → js/estado.js   (reglas, estados, permisos)
     └─ Datos               → js/datos.js + localStorage (simula la BD)
```

En la versión real, `estado.js` sería el backend del monolito (ej. Node/Express o Laravel) y `localStorage` sería la base de datos (MySQL/SQL Server). Las pantallas no cambiarían de responsabilidad.

---

## Estructura y responsables

| Archivo | Pantalla | Responsable |
|---|---|---|
| `js/estado.js`, `js/datos.js`, `js/componentes.js`, `css/estilos.css` | Base compartida | Naser |
| `acceso/login.html`, `registro.html`, `recuperar.html` | Acceso (RF01) | Naser ✅ |
| `admin/index.html` | Panel admin y soporte (RF03, RF14) | Naser ✅ |
| `index.html` | Inicio y selección de oficio | Integrante 2 |
| `cliente/busqueda.html` | Búsqueda y resultados (RF04) | Integrante 2 |
| `estados/sin-resultados.html` | Excepción: sin prestadores | Integrante 2 |
| `cliente/perfil-prestador.html` | Perfil del prestador (RF02, RF05) | Integrante 3 |
| `cliente/solicitud.html` | Crear solicitud (RF06) | Integrante 3 |
| `prestador/cotizacion.html` | Preparar cotización (RF08) | Integrante 4 |
| `cliente/cotizacion.html` | Aprobar o rechazar cotización (RF08) | Integrante 4 |
| `cliente/seguimiento.html` | Seguimiento, chat y cancelación (RF09–RF11) | Integrante 4 |
| `prestador/bandeja.html` | Bandeja del prestador (RF07, RF09) | Integrante 5 ✅ |
| `cliente/historial.html` | Historial (RF13) | Integrante 5 ✅ |
| `cliente/calificar.html` | Calificar (RF12) | Integrante 5 ✅ |
| `cliente/reclamo.html` | Reclamo (RF11) | Integrante 5 ✅ |
| `estados/error.html`, `estados/sin-conexion.html` | Excepciones | Integrante 5 ✅ |

**Cada página existe** con la navbar y los permisos. Las que todavía no estén terminadas muestran una tarjeta "En construcción" que dice qué debe hacer, qué funciones usar y con qué datos probar; al terminar la pantalla, se borra esa tarjeta.

---

## Reglas para programar

1. **Solo HTML, CSS y JS con Bootstrap 5.** No agreguen otras librerías.
2. **Un solo archivo de estilos:** `css/estilos.css`. Usen sus clases (`tarjeta`, `btn-acento`, `texto-suave`, `estado-vacio`…) y no pongan `style=""` con colores.
3. **No guarden datos por su cuenta.** Todo pasa por `OY.*` (en `estado.js`). Si les falta una función, se la piden a Naser.
4. **Siempre usen `UI.escapar(texto)`** al pintar algo que escribió un usuario.
5. **Los estados de una solicitud se muestran con `UI.badgeEstado(estado)`**, que pone ícono y texto (requisito de accesibilidad).
6. **Lo simulado se marca** con `UI.etiquetaSimulado("mapa")`, `("pago")`, etc.
7. **Nombres exactos del glosario:** Solicitada, En evaluación, Pendiente de aprobación, Confirmada, En ejecución, Finalizada, Rechazada, Vencida, Cancelada.
8. **Git:** cada quien trabaja en su rama (`int2-busqueda`, `int3-solicitud`, `int4-cotizacion`, `int5-bandeja`) y abre un Pull Request a `main`. Naser revisa y une.

### Estructura mínima de una página

```html
<body data-base="../">          <!-- "" en la raíz, "../" en subcarpetas -->
  <div id="navbar"></div>
  <main class="container"> ... <div id="mensaje"></div> ... </main>

  <script src="../vendor/bootstrap/bootstrap.bundle.min.js"></script>
  <script src="../js/datos.js"></script>
  <script src="../js/estado.js"></script>
  <script src="../js/componentes.js"></script>
  <script>
    const u = UI.iniciarPagina({ roles: ["cliente"] }); // omitir roles si es pública
    // Leer parámetros: new URLSearchParams(location.search).get("solicitud")
  </script>
</body>
```

### Cómo usar las funciones

Las funciones que modifican datos devuelven `{ ok: true, dato }` o `{ ok: false, error }`:

```js
const r = OY.cambiarEstado("SOL-0004", "Cancelada", "Ya no lo necesito");
if (!r.ok) { UI.alerta("mensaje", "danger", r.error); return; }
UI.alerta("mensaje", "success", "Solicitud cancelada.");
```

| Necesito… | Función |
|---|---|
| Usuario en sesión | `OY.usuarioActual()` → `{ cuenta, persona, rol, prestador }` |
| Buscar prestadores | `OY.buscarPrestadores({ oficioId, zonaId, disponibleAhora, soloVerificados })` |
| Leer cualquier cosa | `OY.obtener("solicitudes", id)`, `OY.listar("zonas")` |
| Nombres legibles | `OY.nombreOficio(id)`, `OY.nombreZona(id)`, `OY.nombrePrestador(id)`, `OY.nombreCompleto(cuentaId)` |
| Crear solicitud sin duplicar | `const clave = OY.nuevaClaveEnvio();` al abrir → `OY.crearSolicitud(datos, clave)` |
| Mis solicitudes | `OY.solicitudesDelUsuario()` |
| Qué botones mostrar | `OY.accionesPermitidas(solicitudId)` |
| Cambiar estado | `OY.cambiarEstado(id, nuevoEstado, motivo)` |
| Historial | `OY.historialDe(id)` |
| Cotizar | `OY.guardarCotizacion(id, { detalles, costoVisita, tipoPrecio, vigenciaHoras })` |
| Totales de una cotización | `OY.totalesCotizacion(cot)` → `{ manoObra, materiales, cargos, visita, total }` |
| Aprobar o rechazar | `OY.aprobarCotizacion(id)`, `OY.rechazarCotizacion(id, motivo)` |
| Calificar | `OY.puedeCalificar(id)`, `OY.calificar(id, puntos, comentario)` |
| Reclamo | `OY.crearReclamo(id, motivo, descripcion, evidencia)` |
| Chat | `OY.mensajesDe(id)`, `OY.enviarMensaje(id, texto)` |
| Formato | `OY.formatoQ(75)` → "Q 75.00", `OY.formatoFecha(iso)` |
| UI | `UI.alerta`, `UI.badgeEstado`, `UI.estrellas`, `UI.etiquetaSimulado`, `UI.bloquearBoton`, `UI.liberarBoton`, `UI.escapar` |

---

## Reglas de negocio ya implementadas en `estado.js`

| Regla | Cómo se cumple |
|---|---|
| Transiciones y permisos | La tabla `OY.TRANSICIONES` define qué estado sigue a cuál y qué rol puede hacerlo |
| Doble aceptación | Cada solicitud tiene **un solo** prestador, elegido por el cliente; otro prestador no puede actuar sobre ella |
| Agenda | Un prestador no puede tener dos servicios confirmados en la misma fecha y franja |
| Cobertura | No se puede solicitar a un prestador fuera de sus zonas |
| Vencimiento | Las solicitudes sin respuesta pasan a *Vencida* (30 min si es inmediata, 24 h si es programada, y la vigencia de la cotización) |
| Duplicados | La misma `claveEnvio` no crea dos solicitudes al reintentar |
| Calificaciones | Solo el cliente, solo si el servicio está *Finalizado* y una sola vez |
| Verificación | Debe indicar qué se revisó; un prestador *Rechazado* no aparece en búsquedas |
| Cuentas suspendidas | No pueden iniciar sesión ni aparecer en búsquedas |
| Cancelar o rechazar | Exige un motivo, que queda en el historial |
| Soporte | Solo ve y atiende reclamos (permisos limitados) |

## Funciones operativas y simuladas

| Función | En el prototipo |
|---|---|
| Registro, login, roles, solicitudes, cotizaciones, estados, calificaciones, reclamos, chat, panel admin | **Operativas** (lógica real, datos en el navegador) |
| Base de datos | Simulada con `localStorage` |
| Correo o SMS de recuperación | Simulado: el código se muestra en pantalla |
| Mapas y ubicación | Simulados |
| Pagos | Simulados |
| Notificaciones | Simuladas |
| Fotos y evidencia | Simuladas: solo se guarda el nombre del archivo |
| Seguridad de contraseñas | No se cifran (es un prototipo); en producción se usaría hash |

---

## Documentación de la entrega

Los documentos de pruebas, despliegue y defensa del Integrante 5 están en `docs/`:

- `docs/05-pruebas-despliegue.md`: plan de pruebas, usabilidad, defectos, despliegue, operación, mantenimiento, retiro, indicadores, conclusiones, fuentes y declaración de IA.
- `docs/05-casos-de-prueba.md`: 29 casos PRU con precondiciones, pasos y resultado esperado.
- `docs/05-registro-defectos.csv`: plantilla para registrar defectos con severidad y evidencia.
- `docs/05-guion-defensa-y-diapositivas.md`: estructura del Word, guion de defensa y esquema de diapositivas.

> Los resultados de usabilidad y las pruebas formales se completan con evidencia real; no se inventan datos.
