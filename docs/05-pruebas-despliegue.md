# OficioYa Jutiapa — Pruebas, despliegue y entrega

**Responsable:** Mario (Integrante 5)  
**Proyecto:** OficioYa Jutiapa — Análisis de Sistemas, UMG Campus Jutiapa  
**Entrega y defensa:** viernes 30 de octubre de 2026  
**Versión de este documento:** 0.1 (26/10/2026)  
**Pantallas a cargo:** `prestador/bandeja.html`, `cliente/historial.html`, `cliente/calificar.html`, `cliente/reclamo.html`, `estados/error.html`, `estados/sin-conexion.html`

> **Nota de honestidad:** este documento contiene el plan, los resultados reales de los 37 casos funcionales y una **simulación de ensayo declarada** de la prueba de usabilidad. La simulación usa cinco perfiles ficticios y no sustituye una sesión con personas reales: el consentimiento, la observación directa y la validación con participantes siguen pendientes. Los datos del prototipo son ficticios.

---

## 0. Resumen y alcance

Este documento cubre las secciones asignadas al Integrante 5:

1. Plan y casos de prueba.
2. Prueba de usabilidad con 5 personas.
3. Registro de defectos y mejoras.
4. Plan de despliegue.
5. Plan de operación.
6. Mantenimiento y retiro.
7. Indicadores con su fórmula.
8. Conclusiones, fuentes y declaración de uso de IA.

La cadena que se debe poder explicar en la defensa es:

> **Necesidad (entrevista) → Requisito (RF) → Diseño (pantalla/BD/estado) → Prueba (PRU) → Resultado**

En mi parte, la cadena se concreta así:

| Necesidad | Requisito | Pantalla / diseño | Funciones del núcleo | Pruebas |
|---|---|---|---|---|
| El prestador necesita enterarse de las solicitudes y responder a tiempo. | RF07, RF09 | `prestador/bandeja.html` | `OY.solicitudesDelUsuario`, `OY.accionesPermitidas`, `OY.cambiarEstado`, `OY.historialDe` | PRU-12, PRU-13, PRU-14, PRU-18, PRU-26, PRU-30 |
| El cliente necesita consultar lo que pidió y su estado. | RF13 | `cliente/historial.html` | `OY.solicitudesDelUsuario`, `OY.cotizacionDeSolicitud`, `OY.puedeCalificar` | PRU-24 |
| El cliente necesita calificar solo un servicio terminado. | RF12 | `cliente/calificar.html` | `OY.puedeCalificar`, `OY.calificar` | PRU-22, PRU-23 |
| Cliente o prestador necesitan reclamar y que Soporte atienda. | RF11 | `cliente/reclamo.html` + panel de Soporte | `OY.crearReclamo`, `OY.atenderReclamo` | PRU-21, PRU-32 |
| La persona necesita una salida clara si algo falla o no hay internet. | RNF de usabilidad y disponibilidad | `estados/error.html`, `estados/sin-conexion.html` | `navigator.onLine`, `UI.iniciarPagina` | PRU-34, PRU-35 |

---

## 1. Plan de pruebas

### 1.1 Objetivo

Verificar que las pantallas y reglas del módulo asignado funcionan de forma coherente con el resto del monolito, que respetan los estados y permisos del glosario, y que una persona puede completar el flujo sin ayuda técnica.

### 1.2 Alcance

**Incluye:**

- Bandeja del prestador: aceptar, rechazar con motivo, dejar vencer, iniciar y finalizar el servicio, cancelar con motivo, privacidad de la dirección.
- Historial del cliente: listado, filtros, enlaces al seguimiento, calificación pendiente, estado vacío.
- Calificación: solo servicio `Finalizada`, una sola vez, 1 a 5 estrellas y comentario.
- Reclamos: validación, registro, evidencia simulada y visibilidad para Soporte.
- Pantallas de excepción: error y sin conexión.
- Flujo completo de negocio: solicitar → aceptar → cotizar → aprobar → ejecutar → finalizar → calificar.
- Permisos por rol y protección contra texto malicioso (XSS).

**No incluye (o queda como dependencia de otros integrantes):**

- Pruebas de carga, estrés o concurrencia reales: el prototipo usa `localStorage` y no tiene backend.
- Pruebas de seguridad de contraseñas: en el prototipo se guardan sin cifrar por decisión de simplificación.
- Mapas, pagos, notificaciones y correo reales: son simulados y se marcan como tales.
- Pruebas de usabilidad con personas reales: se planifican aquí, pero sus resultados se registran después de la sesión.
- Pantallas de cotización y seguimiento: pertenecen al Integrante 4; ya están integradas en `main` y se probaron en la ejecución del 26/10 (PRU-15 a PRU-19 y PRU-27).

### 1.3 Estrategia y niveles

| Nivel | Qué se hace | Cuándo |
|---|---|---|
| Humo | Abrir cada pantalla, iniciar sesión y comprobar que no hay errores en consola. | Cada cambio y antes de la demo. |
| Funcional | Ejecutar los casos PRU-01 a PRU-37 con los datos de prueba. | 26 de octubre (ejecutado). |
| Límites y excepciones | Sin motivo, sin estrellas, solicitud vencida, servicio no finalizado, sin conexión, sin resultados. | 26 de octubre (ejecutado). |
| Permisos | Entrar con cada rol y comprobar que no se puede actuar sobre solicitudes ajenas. | 26 de octubre (ejecutado). |
| Integración | Flujo completo entre las pantallas de todos los integrantes. | 26 de octubre (ejecutado). |
| Usabilidad | 5 personas representativas con tareas guiadas. | Simulación de ensayo con 5 perfiles ficticios (4 de 5); validación real pendiente. |
| Regresión | Repetir los casos críticos después de unir los Pull Requests. | 29 y 30 de octubre. |

### 1.4 Entorno y datos de prueba

- **Navegadores:** Chrome o Edge actual, Firefox actual. Resolución de escritorio 1366 × 768 y móvil 360 × 640.
- **Ejecución local:** abrir la carpeta del proyecto con Live Server o ejecutar `python -m http.server 8000` en la raíz y entrar a `http://localhost:8000`.
- **Ejecución publicada:** GitHub Pages, rama `main`, carpeta raíz.
- **Datos:** usuarios ficticios del README. Antes de cada sesión: menú del usuario → **Reiniciar datos de prueba**.
- **Almacenamiento:** `localStorage` del navegador. Para dejar el entorno limpio, reiniciar los datos o borrar la clave `oficioya_db` desde DevTools.
- **Evidencia:** captura de pantalla o video corto por caso, con fecha y nombre del archivo. No se deben usar datos personales reales.

Usuarios mínimos para probar:

| Correo | Contraseña | Rol | Para qué |
|---|---|---|---|
| `cliente@demo.com` | `demo123` | Cliente | Historial, calificar, reclamo, flujo completo. |
| `cliente2@demo.com` | `demo123` | Cliente | Cotización pendiente y permisos. |
| `electricista@demo.com` | `demo123` | Prestador y cliente | Bandeja, avance y cambio de rol. |
| `pinchazos@demo.com` | `demo123` | Prestador | Bandeja con solicitud finalizada. |
| `herrero@demo.com` | `demo123` | Prestador sin verificar | Bandeja con solicitud nueva. |
| `admin@demo.com` | `admin123` | Administrador | Verificación, cuentas e indicadores. |
| `soporte@demo.com` | `demo123` | Soporte | Atención de reclamos. |

### 1.5 Criterios de entrada y salida

**Entrada:**

- Todos los Pull Requests del equipo integrados en `main`.
- Datos de prueba reiniciados.
- Consola del navegador sin errores al abrir las pantallas.
- Casos de prueba revisados y aprobados por el equipo.

**Salida:**

- 100 % de los casos de prioridad alta ejecutados.
- Ningún defecto crítico abierto (bloquea el flujo, pérdida de datos o permiso indebido).
- Defectos medios documentados con plan de corrección o aceptación explícita.
- Prueba de usabilidad realizada con 5 personas y resultados registrados.
- Flujo completo repetido en GitHub Pages y en local.

### 1.6 Roles y responsabilidades

| Rol | Responsabilidad |
|---|---|
| Mario (Integrante 5) | Diseñar y ejecutar el plan, registrar evidencias, consolidar defectos, desplegar y ensamblar la entrega. |
| Naser | Revisar y unir Pull Requests; validar arquitectura, login y panel admin. |
| Integrante 2 | Validar inicio, búsqueda y flujo inmediato. |
| Integrante 3 | Validar perfil, solicitud, validaciones y duplicados. |
| Integrante 4 | Validar cotización, aprobación, seguimiento, chat y cancelación. |
| Todos | Corregir los defectos de su módulo y participar en la prueba de usabilidad. |

### 1.7 Cronograma

| Fecha | Actividad | Responsable |
|---|---|---|
| Mar 27/10 | Entrevistas, base del proyecto y avance del documento. | Todos |
| Mié 28/10 | Programar pantallas; primera pasada de humo por módulo. | Todos |
| Jue 29/10 | Integrar PR, repetir la regresión de los 37 casos y completar la prueba con 5 personas. | Mario + equipo |
| Jue 29/10, 6:00 p. m. | Entregar sección en la plantilla de Word. | Todos |
| Vie 30/10 | Registrar resultados de usabilidad, cerrar defectos, regresión, ensayo y revisión final. | Todos |

### 1.8 Gestión de defectos

Severidad:

| Severidad | Criterio | Ejemplo |
|---|---|---|
| Crítica | Impide completar el flujo o permite una acción indebida. | El prestador puede calificar; se puede calificar dos veces; se pierde una solicitud. |
| Alta | Una función principal no responde o muestra datos incorrectos. | No se puede aceptar una solicitud; el historial no lista nada. |
| Media | La función opera, pero con un error visible o poca claridad. | El filtro no actualiza el contador; un mensaje no explica el estado. |
| Baja | Detalle visual, ortográfico o de comodidad. | Un ícono desalineado; un texto redundante. |

Estados del defecto: `Nuevo → En análisis → En corrección → En verificación → Cerrado` o `Aceptado como limitación`.

Plantilla de registro: `docs/05-registro-defectos.csv`.

### 1.9 Matriz de trazabilidad (resumen)

La columna **Necesidad** se completa con los códigos N01, N02… de la lista de necesidades que produzca el equipo después de las entrevistas. No se inventan necesidades.

| Necesidad | RF | Pantalla / regla | Casos de prueba |
|---|---|---|---|
| N__ | RF07, RF09 | Bandeja del prestador; transiciones de estado; doble aceptación. | PRU-12, PRU-13, PRU-14, PRU-18, PRU-26, PRU-30 |
| N__ | RF13 | Historial; consulta por estado. | PRU-24 |
| N__ | RF12 | Calificación; solo `Finalizada` y una vez. | PRU-22, PRU-23 |
| N__ | RF11 | Reclamo; motivo, descripción, evidencia y atención de Soporte. | PRU-21, PRU-32 |
| N__ | RNF de usabilidad / disponibilidad | Pantallas de error y sin conexión. | PRU-34, PRU-35 |
| N__ | RF06–RF10 | Flujo completo entre módulos. | PRU-10, PRU-15, PRU-16, PRU-18, PRU-22 |

### 1.10 Casos de prueba

El detalle de los **37 casos** está en la Tabla 3 del Word y su ejecución real en **`docs/05-casos-de-prueba.md`**. Cada fila incluye requisito, tipo, resultado, evidencia y estado.

### 1.11 Verificación técnica ejecutada el 26/10/2026

Antes de la sesión formal se ejecutó una verificación de humo sobre las seis pantallas y el núcleo, con datos ficticios y un entorno DOM controlado. **No sustituye la prueba funcional formal ni la usabilidad**, pero sirvió para detectar errores de integración tempranos.

| Área verificada | Comprobaciones | Resultado |
|---|---|---|
| Bandeja: listado propio, aceptar, rechazar con motivo, avance, privacidad de dirección | 5 | Aprobado |
| Historial: listado, filtros, estado vacío, botón de calificar | 3 | Aprobado |
| Calificar: solo finalizada, una vez, guardar puntuación, sin estrellas no guarda | 4 | Aprobado |
| Reclamo: bloqueo en `Solicitada`, validación, permisos, evidencia | 3 | Aprobado |
| Error y sin conexión | 2 | Aprobado |
| Flujo completo del núcleo: solicitar → aceptar → cotizar → aprobar → ejecutar → finalizar → calificar | 1 | Aprobado |
| Escape de texto del usuario (XSS) | 1 | Aprobado |
| Bandeja: rechazo después de aceptar, enlaces de reclamo y recuperación del botón Reintentar | 4 | Aprobado |
| **Total** | **23** | **23/23** |

Esta verificación no reemplaza la prueba en navegador real con clics, teclado y lector de pantalla. Esa prueba se ejecutó después (sección 1.12); la sesión con participantes reales sigue pendiente y la simulación de ensayo se declara en la sección 2.7.

### 1.12 Ejecución formal en navegador — 26/10/2026

Se ejecutaron los **37 casos** del Word en Microsoft Edge real (modo headless, Playwright 1.64.1), sobre la versión integrada de `main` (commit `c766d73`) servida localmente en `http://127.0.0.1:8000`. Cada caso se abrió en un contexto nuevo con los datos de prueba reiniciados y dejó captura en `evidencias/`.

| Resultado | Casos |
|---|---|
| Aprobados | 36 |
| Fallidos | 1 (PRU-35) |
| Pendientes | 0 |

- **PRU-35 (Fallido, DEF-01):** las pantallas `estados/sin-conexion.html` y `estados/error.html` existen y funcionan al abrirlas directamente, pero la aplicación no redirige a ellas sin conexión ni ante una ruta inexistente.
- **PRU-22 (Aprobado con observación, DEF-02):** el perfil muestra «2 calificaciónes»; es un defecto de ortografía de severidad baja.
- El detalle por caso está en `docs/05-casos-de-prueba.md` y en la Tabla 4 del Word.
- **La prueba de usabilidad con cinco personas no se ejecutó**: no hubo participantes reales. Se hizo una **simulación de ensayo declarada** (sección 2.7) para validar el formato y detectar fricciones esperadas; no es evidencia con personas.

---

## 2. Prueba de usabilidad con 5 personas

### 2.1 Objetivo

Comprobar si una persona puede usar el prototipo sin explicaciones, detectar dónde se confunde y priorizar mejoras antes de la defensa.

### 2.2 Participantes

Se buscan 5 personas que representen los roles del sistema. No deben ser integrantes del equipo ni conocer el prototipo de antemano.

| Código | Perfil buscado | Criterio |
|---|---|---|
| P01 | Cliente adulto | Ha pedido un oficio o contratado un servicio. |
| P02 | Cliente adulto | Usa el celular para trámites cotidianos. |
| P03 | Prestador de oficio | Recibe encargos por WhatsApp o llamada. |
| P04 | Prestador de oficio | Tiene poca experiencia con formularios web. |
| P05 | Administrador o soporte | Ha atendido clientes o reclamos. |

### 2.3 Consentimiento y privacidad

Antes de empezar:

- Explicar que se prueba el prototipo, no a la persona.
- Pedir permiso para observar y tomar notas; si se graba, pedir permiso aparte.
- No recoger nombres reales, teléfonos ni direcciones. Usar códigos P01–P05.
- Aclarar que puede detenerse en cualquier momento.
- Borrar los datos del prototipo al terminar.

Texto sugerido:

> “Estamos probando un prototipo de la plataforma OficioYa. No te estamos evaluando a ti. Queremos ver si las pantallas se entienden. Puedes detenerte cuando quieras. No usaremos tus datos personales en el informe; solo un código como P01.”

### 2.4 Protocolo de la sesión (15–20 minutos)

1. Bienvenida y consentimiento (2 min).
2. Contexto breve: “Es una plataforma para pedir un oficio en Jutiapa” (1 min).
3. Tareas guiadas, una por una, sin explicar dónde hacer clic (10–12 min).
4. Preguntas finales y cierre (3 min).

El moderador no debe ayudar con la respuesta. Si la persona se bloquea, puede decir: “¿Qué esperarías encontrar en esta pantalla?” y registrar el bloqueo.

### 2.5 Tareas y criterio de éxito

| # | Tarea | Criterio de éxito | Tiempo máximo |
|---|---|---|---|
| T1 | Entrar como cliente y buscar un electricista en el Sector Centro. | Llega a resultados y abre un perfil. | 3 min |
| T2 | Pedir el servicio con una descripción y un horario. | La solicitud aparece en `Mis solicitudes`. | 4 min |
| T3 | Como prestador, aceptar una solicitud y marcarla en ejecución y finalizada. | La bandeja muestra el avance correcto. | 4 min |
| T4 | Como cliente, revisar el historial y encontrar un servicio por calificar. | Encuentra el botón correcto sin ayuda. | 2 min |
| T5 | Calificar un servicio finalizado con 4 estrellas y un comentario. | La calificación queda guardada. | 2 min |
| T6 | Presentar un reclamo por un servicio finalizado. | El reclamo queda registrado con motivo y descripción. | 4 min |
| T7 | Provocar o abrir la pantalla sin conexión y volver a intentar. | Entiende qué se conserva y qué no. | 2 min |

### 2.6 Métricas

- **Éxito por tarea:** sí / sí con ayuda / no.
- **Tiempo por tarea:** minutos y segundos.
- **Errores:** clics equivocados, campos omitidos, abandono.
- **SEQ (Single Ease Question):** “¿Qué tan fácil fue esta tarea?” en escala 1 (muy difícil) a 7 (muy fácil).
- **Comentarios literales:** frases que expliquen la confusión.
- **Satisfacción general:** 1 a 5 estrellas al final.

### 2.7 Resultados de la simulación de ensayo (no es evidencia real)

> **Estado: simulación declarada.** No hubo participantes reales. Para validar el formato, el Word y el expediente se completaron con cinco perfiles ficticios y una sola tarea observada («Busque un electricista y complete una solicitud sin ayuda»). Los datos no deben presentarse como usabilidad real.

| Participante | Perfil | ¿Completó sin ayuda? | Tiempo (min) | Dificultad observada | Comentario |
|---|---|---|---|---|---|
| P1 | 28 años, uso alto del celular | Sí | 3.7 | Buscó primero en el menú; encontró Electricista en la portada. | El botón de buscar debería estar más arriba. |
| P2 | 45 años, uso medio | Sí | 5.2 | No vio el selector de zona; usó el sector por defecto. | No sabía si la zona era obligatoria. |
| P3 | 62 años, uso bajo | No | 8.5 | Confundió el costo de visita con el precio final; pidió ayuda. | No entendí si la visita se cobra aparte. |
| P4 | 34 años, uso alto | Sí | 2.9 | Sin dificultades; abrió el perfil y pulsó Solicitar servicio. | El sello de verificado da confianza. |
| P5 | 23 años, uso alto | Sí | 4.3 | Intentó enviar sin descripción; corrigió con la validación. | El mensaje de error me ayudó. |

**Resumen:** 4 de 5 completaron la tarea sin ayuda (criterio RNF02 en formato). Tiempo promedio de quienes completaron: 4.0 minutos. La simulación no sustituye la sesión real.

### 2.8 Preguntas finales

1. ¿Qué fue lo más fácil?
2. ¿Qué fue lo más confuso?
3. ¿Confiarías en este servicio para contratar a alguien? ¿Por qué?
4. ¿Qué información te faltó antes de pedir el servicio?
5. ¿Qué cambiarías de la bandeja o del historial?

### 2.9 Registro de hallazgos (simulación)

| ID | Pantalla | Hallazgo observado | Severidad | Recomendación | Estado |
|---|---|---|---|---|---|
| U-01 | Búsqueda / solicitud | El selector de zona es poco visible; el participante P2 usó el sector por defecto sin confirmarlo. | Media | Hacer obligatoria y visible la zona, con texto de ayuda. | Simulado |
| U-02 | Cotización | El costo de visita se confunde con el precio final; P3 no completó por esa razón. | Alta | Separar «costo de visita» y «total estimado» con una nota. | Simulado |
| U-03 | Formulario de solicitud | El campo de descripción no se percibe como obligatorio hasta el envío; P5 corrigió con la validación. | Baja | Marcar el campo como obligatorio desde el inicio. | Simulado |

> **Importante:** estos hallazgos provienen de la simulación de ensayo y deben confirmarse con personas reales; no son observaciones de usuarios.

---

## 3. Defectos y mejoras

### 3.1 Limitaciones conocidas del prototipo

Estas no son fallas ocultas: son decisiones del alcance y deben explicarse en la defensa.

| ID | Limitación | Impacto | Mitigación / decisión |
|---|---|---|---|
| LIM-01 | Las contraseñas se guardan en texto plano en `localStorage`. | No es seguro para producción. | Aceptado solo para el prototipo; en producción se usaría hash y autenticación en servidor. |
| LIM-02 | Los datos viven en el navegador; no se comparten entre dispositivos. | Dos personas no ven los mismos datos en tiempo real. | Se simula con datos ficticios; en producción habría una base de datos central. |
| LIM-03 | Mapas, pagos, notificaciones y correo son simulados. | No hay integración real. | Se marcan visiblemente con `UI.etiquetaSimulado`. |
| LIM-04 | La evidencia de un reclamo solo guarda nombres de archivo. | No se puede abrir la imagen o el PDF. | Etiqueta “Simulado” y explicación en pantalla. |
| LIM-05 | No hay backend ni control de concurrencia. | Dos pestañas podrían modificar el mismo dato. | Se bloquean botones y se usa `claveEnvio` para evitar duplicados de solicitud. |
| LIM-06 | Los plazos de atención de reclamos son un compromiso propuesto, no automatizados. | No hay recordatorios reales. | Se aclara en la pantalla y en el plan de operación. |

### 3.2 Defectos registrados

| ID | Fecha | Pantalla / caso | Descripción | Severidad | Prioridad | Estado | Responsable | Evidencia |
|---|---|---|---|---|---|---|---|---|
| DEF-01 | 26/10/2026 | `estados/sin-conexion.html`, `estados/error.html` / PRU-35 | Sin conexión solo aparece la franja de aviso y al navegar se ve el error del navegador; una ruta inexistente devuelve el 404 del servidor. Las pantallas existen y funcionan al abrirlas directamente. | Media | Media | Abierto | Mario (integración) / por asignar | `evidencias/PRU-35_banner.png`, `PRU-35_error.png`, `PRU-35_ruta.png` |
| DEF-02 | 26/10/2026 | `cliente/perfil-prestador.html`, `cliente/busqueda.html` / PRU-22 | Plural incorrecto «calificaciónes» en lugar de «calificaciones» cuando el prestador tiene dos o más calificaciones. | Baja | Baja | Abierto | Integrante 2 (búsqueda y perfil) | `evidencias/PRU-22_perfil.png` |
| DEF-03 | 26/10/2026 | Bandeja / PRU-12, PRU-13, PRU-20 | Los botones Confirmar de los modales quedaban deshabilitados después del primer uso; no se podía rechazar o cancelar una segunda solicitud sin recargar. | Alta | Alta | Cerrado | Mario | Humo 23/23 y ejecución formal |

El registro completo está en `docs/05-registro-defectos.csv`. Esta tabla resume los defectos de la ejecución formal. Los hallazgos U-01 a U-03 provienen de la simulación de usabilidad y deben confirmarse con personas reales.

### 3.3 Mejoras propuestas

1. Mover las reglas y los datos a un backend real con autenticación y contraseñas cifradas.
2. Agregar pruebas automatizadas de regresión en el repositorio.
3. Implementar notificaciones reales (correo o push) para nuevos mensajes, cotizaciones y vencimientos.
4. Integrar un mapa real y geolocalización con consentimiento.
5. Implementar carga de evidencia con almacenamiento y control de acceso.
6. Agregar adjuntos y chat con estados de leído.
7. Medir indicadores de operación con datos reales y tablero histórico.
8. Revisar accesibilidad con lector de pantalla y pruebas con personas con discapacidad.
9. Añadir un modo de mantenimiento y un aviso de versión.
10. Documentar un plan de respaldo y restauración de la base de datos.

---

## 4. Plan de despliegue

### 4.1 Entornos

| Entorno | Uso | Dirección |
|---|---|---|
| Local | Desarrollo y demo de respaldo sin internet. | `http://localhost:8000` con `python -m http.server 8000` o Live Server. |
| Producción | Demo y entrega. | GitHub Pages del repositorio `MrNaserMartinez/oficioya`. |
| Respaldo | Si falla GitHub Pages o el internet. | Carpeta local + `vendor/` incluido. |

### 4.2 Condiciones previas

- Todos los Pull Requests revisados y unidos a `main`.
- Ninguna pantalla usada en la demo muestra la tarjeta “En construcción”.
- Las seis pantallas del Integrante 5 y las de los demás módulos abren sin errores de consola.
- Los datos de prueba se reinician antes de la demostración.
- Los enlaces relativos funcionan tanto en la raíz como en subcarpetas.
- No hay credenciales reales ni datos personales en el repositorio.
- Bootstrap e iconos están dentro de `vendor/` (no dependen de CDN).

### 4.3 Pasos de despliegue

1. Confirmar que `main` está actualizado y que el último PR fue revisado.
2. Entrar al repositorio en GitHub → **Settings** → **Pages**.
3. En **Build and deployment**, elegir **Deploy from a branch**.
4. Seleccionar rama `main` y carpeta `/ (root)`; guardar.
5. Esperar a que GitHub Pages publique y abrir la URL indicada.
6. Verificar que la página inicial carga con estilos e iconos.
7. Ejecutar el humo de despliegue (sección 4.4).
8. Etiquetar la entrega, por ejemplo `v1.0-entrega`, y registrar la URL en el README o en el acta de entrega.
9. Comunicar la URL y los usuarios de prueba al equipo.

### 4.4 Humo de despliegue

| # | Verificación | Resultado |
|---|---|---|
| D-01 | La página inicial abre en GitHub Pages sin errores de consola. |  |
| D-02 | Login de cliente, prestador, administrador y soporte. |  |
| D-03 | Bandeja: aceptar, iniciar y finalizar una solicitud. |  |
| D-04 | Cotización: preparar, enviar, aprobar y ver el estado. |  |
| D-05 | Historial: filtros, seguimiento y calificación. |  |
| D-06 | Reclamo: registrar y verlo como Soporte. |  |
| D-07 | Error y sin conexión: botones y mensajes. |  |
| D-08 | Reiniciar datos de prueba y repetir el flujo. |  |
| D-09 | Vista móvil 360 × 640 sin desbordes horizontales. |  |
| D-10 | Todos los activos cargan desde `vendor/` sin CDN. |  |

### 4.5 Rollback

Si la versión publicada falla:

1. Detener la demo y usar la copia local como respaldo.
2. En GitHub, revertir el commit problemático o volver a la etiqueta anterior.
3. Verificar que Pages vuelve a publicar la versión estable.
4. Registrar el incidente y la causa en el registro de defectos.
5. Repetir el humo de despliegue antes de anunciar que está restablecido.

### 4.6 Responsables y comunicación

- **Despliegue:** Mario, con revisión de Naser.
- **Aprobación de merge:** Naser.
- **Comunicación:** Mario informa la URL y el estado al equipo; cada integrante valida su módulo.
- **Demo:** Mario coordina el orden y el respaldo local; Naser explica arquitectura; cada integrante explica su cadena.

---

## 5. Plan de operación

### 5.1 Alcance

El prototipo no tiene servidor ni usuarios reales. La operación consiste en mantener la demo disponible, atender reclamos simulados y conservar los datos de prueba en buen estado.

### 5.2 Roles operativos

| Rol | Función |
|---|---|
| Administrador | Verifica prestadores, suspende cuentas, revisa indicadores y atiende reclamos. |
| Soporte | Ve y atiende reclamos; no administra oficios ni cuentas. |
| Prestador | Atiende solicitudes, cotiza, ejecuta y finaliza. |
| Cliente | Solicita, aprueba, sigue, califica y reclama. |
| Responsable de operación (Mario) | Publica, prueba, reinicia datos y documenta incidentes. |

### 5.3 Flujo de soporte

1. El usuario presenta el reclamo en `cliente/reclamo.html`.
2. Soporte entra a `admin/index.html#reclamos` y lo ve en estado **Abierto**.
3. Soporte lo toma **En revisión**.
4. Al resolverlo, escribe la resolución; el reclamo pasa a **Resuelto**.
5. El usuario ve la resolución en la misma pantalla del reclamo.
6. Si el caso es grave, se documenta en el registro de defectos y se escala al administrador.

### 5.4 Incidentes

| Severidad | Ejemplo | Respuesta | Responsable |
|---|---|---|---|
| S1 | La demo no abre minutos antes de la defensa. | Usar copia local; publicar de nuevo; avisar al equipo. | Mario |
| S2 | Una pantalla principal falla o un rol ve lo que no debe. | Detener esa función, registrar y corregir; usar el flujo de respaldo. | Integrante responsable + Mario |
| S3 | Error visual o texto confuso. | Registrar para corrección después de la demo. | Integrante responsable |
| S4 | Duda de uso. | Explicar en la demo o mejorar el texto. | Mario |

### 5.5 Monitoreo y respaldo

- **Monitoreo:** revisar la consola del navegador antes de cada demo, el panel de indicadores y el estado de GitHub Pages. No hay alertas automáticas.
- **Datos:** el prototipo guarda todo en `localStorage`. Para conservar una copia antes de una demo se puede exportar la clave `oficioya_db` desde DevTools → Application → Local Storage; no es una función del prototipo.
- **Reinicio:** menú del usuario → **Reiniciar datos de prueba**. Esto borra la sesión y vuelve a los datos ficticios.
- **Privacidad:** no introducir datos reales de clientes o prestadores en el prototipo.

### 5.6 Niveles de servicio propuestos

Son compromisos de diseño, no mediciones reales:

- Revisión inicial de un reclamo: máximo 24 horas hábiles.
- Respuesta al reclamo: máximo 48 horas hábiles.
- Disponibilidad de la demo: durante la sesión de defensa y las pruebas acordadas.
- Recuperación ante fallo de publicación: usar respaldo local de inmediato y restaurar Pages el mismo día.

### 5.7 Runbook de la demo

1. 15 minutos antes: abrir la URL publicada y la copia local.
2. Reiniciar datos de prueba.
3. Verificar login de cliente y prestador.
4. Tener a mano los usuarios de prueba y el orden de la demo.
5. Si falla internet: cambiar a `http://localhost:8000` o abrir los archivos con Live Server.
6. Si falla una cuenta: usar otro usuario de prueba y explicar la regla con el historial.
7. Al terminar: no borrar datos si se necesita evidencia; reiniciar solo si se vuelve a demostrar.

---

## 6. Mantenimiento

### 6.1 Tipos de mantenimiento

| Tipo | Qué incluye | Ejemplo en OficioYa |
|---|---|---|
| Correctivo | Corregir defectos. | Un filtro no actualiza el historial. |
| Adaptativo | Ajustarse a cambios externos. | Nueva versión de Bootstrap o cambio de navegador. |
| Perfectivo | Mejorar funciones existentes. | Agregar ordenamiento por fecha o un contador de tiempo. |
| Preventivo | Evitar fallos futuros. | Revisar enlaces, consola, datos de prueba y accesibilidad. |

### 6.2 Control de cambios

1. Crear una rama por cambio: `int5-bandeja`, `fix-...`, `docs-...`.
2. Hacer el cambio con el estilo del proyecto y sin reescribir `estado.js`.
3. Probar los casos afectados y los de regresión.
4. Abrir Pull Request a `main` con descripción, evidencia y riesgos.
5. Revisión de Naser y de otro integrante.
6. Unir solo si pasa el humo y no hay defectos críticos.
7. Actualizar la documentación y el registro de cambios.

### 6.3 Versionado

- `v1.0-entrega`: versión de la defensa.
- `v1.0.x`: correcciones menores después de la entrega.
- `v1.1`: mejoras de usabilidad o nuevas funciones.
- Cada versión debe tener una nota con fecha, cambios y responsables.

### 6.4 Regresión mínima

Antes de cada cambio importante, repetir:

- Login de los cuatro roles.
- Bandeja: aceptar, rechazar, iniciar y finalizar.
- Cotización: enviar y aprobar.
- Historial y calificación.
- Reclamo y atención por Soporte.
- Error y sin conexión.
- Flujo completo.

### 6.5 Dependencias y documentación

- Bootstrap e iconos están vendorizados; si se actualizan, probar todas las pantallas.
- No agregar librerías sin justificarlo y sin aprobación del equipo.
- Mantener el README, el glosario y los IDs de RF/PRU sincronizados.
- Si cambia el modelo de datos, coordinar con el Integrante 4 y actualizar `datos.js` y el diccionario.

### 6.6 Calendario propuesto

| Momento | Actividad |
|---|---|
| Antes de la defensa | Revisión diaria de humo y corrección de defectos críticos. |
| Primera semana después de la entrega | Corrección de defectos pendientes y mejora de textos. |
| Mensual (si el proyecto continúa) | Revisión de dependencias, accesibilidad y métricas. |
| Fin del semestre | Evaluación de retiro o continuidad. |

---

## 7. Retiro

### 7.1 Criterios

El prototipo se retira cuando:

- Termina el semestre y ya no se usará para la defensa.
- Se reemplaza por una versión con backend o por otro sistema.
- Ya no hay usuarios ni necesidad académica.
- Existe un riesgo de privacidad o de datos que no se puede mitigar.

### 7.2 Pasos

1. Congelar cambios y anunciar la fecha de retiro al equipo.
2. Exportar o anonimizar los datos necesarios para evidencia académica.
3. Borrar datos personales del `localStorage` de los equipos usados en la demo.
4. Despublicar GitHub Pages (Settings → Pages → desactivar) o dejar el repositorio en solo lectura.
5. Revocar accesos y credenciales de demostración.
6. Archivar el repositorio, el informe, las diapositivas y las evidencias de prueba.
7. Verificar que la URL ya no muestra el prototipo.
8. Registrar el retiro en el acta del equipo.

### 7.3 Qué se conserva

- Informe final y anexos.
- Diapositivas.
- Evidencias de pruebas y usabilidad (sin datos personales).
- Repositorio archivado, si la universidad lo permite.
- Lecciones aprendidas.

### 7.4 Qué se elimina

- Datos de prueba con información personal.
- Credenciales reales o de producción.
- Copias locales innecesarias.
- Publicación activa si ya no se requiere.

---

## 8. Indicadores y fórmulas

Los primeros cuatro son los que calcula `OY.indicadores()` y muestra el panel administrativo. Los demás son propuestos para una versión con más datos; se indican como tales.

| Indicador | Fórmula | Fuente | Frecuencia | Meta propuesta | Estado |
|---|---|---|---|---|---|
| Tasa de atención | Finalizadas ÷ Total de solicitudes × 100 | `solicitudes.estado` | Por periodo | ≥ 80 % | Implementado |
| Tasa de cancelación | Canceladas ÷ Total de solicitudes × 100 | `solicitudes.estado` | Por periodo | ≤ 10 % | Implementado |
| Tiempo promedio de aceptación | Σ(En evaluación − Solicitada) ÷ solicitudes con ambas marcas | `historialEstados` | Por periodo | ≤ 15 min | Implementado |
| Reclamos por 100 servicios | Reclamos ÷ Finalizadas × 100 | `reclamos`, `solicitudes` | Por periodo | ≤ 5 | Implementado |
| Tasa de vencimiento | Vencidas ÷ Total de solicitudes × 100 | `solicitudes.estado` | Por periodo | ≤ 5 % | Propuesto |
| Tasa de calificación | Finalizadas con calificación ÷ Finalizadas × 100 | `calificaciones` | Por periodo | ≥ 70 % | Propuesto |
| Promedio de calificación | Σ puntuaciones ÷ cantidad de calificaciones | `calificaciones` | Por periodo | ≥ 4.5 / 5 | Propuesto |
| Tasa de reclamos resueltos | Reclamos resueltos ÷ Total de reclamos × 100 | `reclamos.estado` | Por periodo | ≥ 90 % | Propuesto |
| Tiempo promedio de resolución | Σ(fecha de resolución − fecha del reclamo) ÷ reclamos resueltos | `reclamos` + campo `fechaResolucion` | Por periodo | ≤ 48 h hábiles | Propuesto; requiere campo nuevo |

### 8.1 Ejemplo de cálculo con los datos ficticios iniciales

> Estos valores son un **ejemplo didáctico** con los datos de `datos.js`; no son resultados de usuarios reales.

- Total de solicitudes: 5.
- Finalizadas: 2 → Tasa de atención = 2 ÷ 5 × 100 = **40.0 %**.
- Canceladas: 1 → Tasa de cancelación = 1 ÷ 5 × 100 = **20.0 %**.
- Tiempos de aceptación: SOL-0001 = 40 min; SOL-0002 = 5 min; SOL-0004 = 90 min → promedio = (40 + 5 + 90) ÷ 3 = **45 min**.
- Reclamos: 1; finalizadas: 2 → Reclamos por 100 servicios = 1 ÷ 2 × 100 = **50.0**.
- Vencidas: 0 → Tasa de vencimiento = **0.0 %**.
- Calificaciones: 2 de 2 finalizadas → Tasa de calificación = **100 %**; promedio = (5 + 4) ÷ 2 = **4.5 / 5**.
- Reclamos resueltos: 1 de 1 → **100 %**.

### 8.2 Cómo se usan

- En la demo: abrir el panel de administración y explicar de dónde sale cada número.
- En la defensa: no presentar estos valores como métricas reales; decir que son datos ficticios y que la fórmula es la que se implementó.
- En operación: comparar el periodo actual con el anterior y documentar la decisión que se toma con cada indicador.

---

## 9. Conclusiones

> Conclusiones basadas en los resultados reales de los 37 casos y en la simulación declarada de usabilidad.

1. El prototipo demuestra la cadena completa de análisis: una necesidad se convierte en requisito, el requisito se refleja en una pantalla, la pantalla usa reglas centralizadas en `estado.js` y el resultado se verifica con casos de prueba.
2. La separación de roles y la tabla de transiciones evitan acciones indebidas: un prestador no puede actuar sobre solicitudes ajenas, el cliente no puede calificar antes de `Finalizada` y no se puede calificar dos veces.
3. La bandeja y el historial usan los mismos estados y datos que el resto del monolito, por lo que el flujo es coherente entre cliente, prestador y administración.
4. La privacidad de la dirección y el uso de `UI.escapar` reducen la exposición de datos y el riesgo de inyección de HTML.
5. Las pantallas de error y sin conexión explican qué pasó, qué se conserva y qué hacer, sin tecnicismos.
6. La verificación técnica de humo del 26/10 pasó 23 de 23 comprobaciones. Esto es evidencia de que las pantallas y el núcleo están integrados, pero **no reemplaza** la prueba formal en navegador ni la prueba con 5 personas.
7. Limitación principal: el prototipo usa `localStorage`, contraseñas sin cifrar y servicios simulados. En producción se necesita backend, autenticación segura, base de datos, respaldos y notificaciones reales.
8. La usabilidad se ensayó con cinco perfiles ficticios (4 de 5 completaron la tarea), pero esa simulación no sustituye una prueba con personas: siguen pendientes el consentimiento, la observación directa y la validación real.

---

## 10. Fuentes

### 10.1 Fuentes del proyecto

- `README.md` del repositorio OficioYa Jutiapa.
- `js/estado.js`, `js/datos.js`, `js/componentes.js` y `css/estilos.css`.
- Glosario y definiciones del proyecto final de Análisis de Sistemas.
- Entrevistas y usabilidad: este documento y el expediente usan perfiles ilustrativos y una simulación de ensayo, declarados como tales; no se presentan como evidencia de personas reales.

### 10.2 Referencias técnicas y académicas

- Bootstrap. (2026). *Bootstrap 5 documentation*. https://getbootstrap.com/docs/5.3/
- MDN Web Docs. (2026). *Window.localStorage*. https://developer.mozilla.org/es/docs/Web/API/Window/localStorage
- MDN Web Docs. (2026). *Navigator.onLine*. https://developer.mozilla.org/es/docs/Web/API/Navigator/onLine
- GitHub Docs. (2026). *GitHub Pages documentation*. https://docs.github.com/pages
- W3C. (2018). *Web Content Accessibility Guidelines (WCAG) 2.1*. https://www.w3.org/TR/WCAG21/
- ISO/IEC. (2011). *ISO/IEC 25010: Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models*.
- ISO/IEC/IEEE. (2017). *ISO/IEC/IEEE 12207: Systems and software engineering — Software life cycle processes*.
- Nielsen, J. (1994/2000). *Usability Engineering* / *10 Usability Heuristics for User Interface Design*. Nielsen Norman Group. https://www.nngroup.com/articles/ten-usability-heuristics/
- Pressman, R. S., & Maxim, B. R. (2020). *Software Engineering: A Practitioner's Approach* (9.ª ed.). McGraw-Hill.
- Sommerville, I. (2016). *Software Engineering* (10.ª ed.). Pearson.
- Laudon, K. C., & Laudon, J. P. (2020). *Sistemas de información gerencial* (16.ª ed.). Pearson.

> Las URLs y ediciones se deben verificar antes de la entrega final; si el equipo usa otra edición, se actualiza la referencia.

---

## 11. Declaración de uso de IA

Para transparencia y coherencia con el enunciado del proyecto:

- Se utilizó un asistente de IA como apoyo para **revisar la estructura del prototipo**, **proponer borradores de código** para las pantallas asignadas al Integrante 5 y **organizar borradores de documentación**.
- Las reglas de negocio, los estados, los permisos y los datos ficticios se verificaron contra `README.md`, `js/estado.js` y `js/datos.js`; no se modificó el núcleo compartido.
- **Se generaron perfiles ilustrativos de entrevistas y una simulación de usabilidad con cinco perfiles ficticios, declarados como tales en el Word y en el expediente.** No se presentan como usuarios reales; la validación con personas sigue pendiente.
- Las pruebas de humo reportadas se ejecutaron sobre el prototipo y sus datos ficticios; sus límites se explican en la sección 1.11.
- El equipo revisó, ajustó y asumió la responsabilidad del contenido final. La IA no sustituye la validación del docente, las entrevistas ni la prueba con personas.

**Responsable de esta declaración:** Mario (Integrante 5)  
**Fecha:** 26/10/2026

---

## 12. Anexos

- `docs/05-casos-de-prueba.md`: ejecución real de los 37 casos.
- `docs/05-registro-defectos.csv`: plantilla para registrar defectos.
- `docs/05-guion-defensa-y-diapositivas.md`: estructura del Word, guion de defensa y esquema de diapositivas.
- Usuarios de prueba: ver README del repositorio.
- Glosario: usar exactamente los estados y roles del enunciado.
