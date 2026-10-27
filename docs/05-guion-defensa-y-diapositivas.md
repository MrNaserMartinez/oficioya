# OficioYa Jutiapa — Guion de defensa, Word y diapositivas

**Responsable:** Mario (Integrante 5)  
**Uso:** ensayo y defensa del 30/10/2026  
**Regla:** no inventar entrevistas, resultados de usabilidad ni métricas de usuarios reales. Los espacios marcados **[COMPLETAR]** se llenan con evidencia real.

---

## 1. Ensamblaje del Word final

### 1.1 Orden sugerido del documento

1. **Portada:** universidad, curso, proyecto, integrantes, docente, fecha.
2. **Índice** y tabla de figuras/tablas.
3. **Resumen ejecutivo** (Integrante 2).
4. **Acta de inicio, problema, objetivos, alcance y exclusiones** (Integrante 2).
5. **Interesados, cronograma, responsabilidades y riesgos** (Integrante 2).
6. **Cuestionario y resumen de entrevistas; lista de necesidades N01…** (todos; Integrante 2 consolida).
7. **Proceso actual (AS-IS) y propuesto (TO-BE)** (Integrantes 2 y 4).
8. **Factibilidad** técnica, económica, operativa, temporal y de privacidad (Integrante 2).
9. **Requisitos:** RF01–RF14 con ID, descripción, origen, prioridad y criterio de aceptación; RNF; reglas de negocio; historias/casos de uso (Integrante 3).
10. **Matriz de trazabilidad** Necesidad → RF → Diseño → Pantalla → Prueba (Integrante 3 + Mario).
11. **Modelado:** contexto, casos de uso, dominio, entidad-relación, diccionario de datos, estados y secuencia (Integrante 4).
12. **Arquitectura monolítica, interfaces y guía del prototipo** (Naser).
13. **Pruebas:** plan, casos, usabilidad con 5 personas, defectos y mejoras (Mario).
14. **Despliegue, operación, mantenimiento y retiro** (Mario).
15. **Indicadores con fórmula** (Mario; datos del panel admin).
16. **Conclusiones** (Mario con revisión del equipo).
17. **Fuentes** (todos; Mario consolida).
18. **Declaración de uso de IA** (Mario; firma el equipo).
19. **Anexos:** cuestionario, consentimiento, evidencias, capturas, usuarios de prueba, glosario.

### 1.2 Checklist de edición

- [ ] Misma fuente, tamaños y numeración en todo el documento.
- [ ] Todos los RF, RNF, RN, CU y PRU tienen ID y son consistentes con el glosario.
- [ ] Las figuras tienen número, título y fuente.
- [ ] Las tablas tienen encabezado y no se cortan entre páginas.
- [ ] Los estados se escriben exactamente: `Solicitada`, `En evaluación`, `Pendiente de aprobación`, `Confirmada`, `En ejecución`, `Finalizada`, `Rechazada`, `Vencida`, `Cancelada`.
- [ ] Los roles se escriben exactamente: Cliente, Prestador, Administrador, Soporte.
- [ ] La matriz de trazabilidad no tiene filas vacías ni códigos inventados.
- [ ] Los resultados de usabilidad son reales y tienen evidencia.
- [ ] Las conclusiones responden a los objetivos y a los resultados.
- [ ] Las fuentes están completas y citadas en el texto.
- [ ] La declaración de IA está incluida y es honesta.
- [ ] Exportar a PDF y revisar que los enlaces y el índice funcionen.

### 1.3 Qué debe entregar cada integrante

| Integrante | Sección | Archivo / evidencia |
|---|---|---|
| Naser | Arquitectura, interfaces, guía del prototipo, login/registro/admin. | Texto + capturas. |
| Integrante 2 | Inicio, investigación, factibilidad, entrevistas, necesidades, AS-IS. | Texto + transcripciones anonimizadas. |
| Integrante 3 | RF, RNF, reglas, casos de uso, trazabilidad. | Tablas + capturas. |
| Integrante 4 | Modelado, TO-BE, MER, diccionario, estados, secuencia, cotización/seguimiento. | Diagramas + capturas. |
| Mario | Pruebas, usabilidad, defectos, despliegue, operación, mantenimiento, retiro, indicadores, conclusiones, fuentes, IA, ensamblaje. | Este paquete + Word/PPT. |

> Si un integrante no entrega a tiempo, no se inventa su parte: se marca como pendiente y se explica en la defensa. Es mejor un documento honesto e incompleto que uno con datos falsos.

---

## 2. Esquema de diapositivas (14 diapositivas)

| # | Título | Contenido | Quién |
|---|---|---|---|
| 1 | OficioYa Jutiapa | Logo, curso, integrantes, fecha, frase: “Conectamos clientes con prestadores de oficios en Jutiapa cabecera”. | Naser |
| 2 | El problema | Dificultad para encontrar un prestador confiable, precios poco claros, coordinación por WhatsApp, falta de historial. Citar la necesidad real de las entrevistas. | Integrante 2 |
| 3 | Objetivos y alcance | Objetivo general, objetivos específicos, qué incluye y qué no (pagos/mapas simulados, monolito, prototipo). | Integrante 2 |
| 4 | Usuarios y roles | Cliente, Prestador, Administrador, Soporte; qué hace cada uno. | Integrante 2/3 |
| 5 | De la necesidad al requisito | Ejemplo de una necesidad de entrevista → RF → pantalla → prueba. Mostrar la cadena. | Integrante 3 |
| 6 | Proceso actual vs. propuesto | AS-IS (WhatsApp, acuerdos informales) → TO-BE (solicitud, cotización, aprobación, seguimiento, calificación). | Integrante 4 |
| 7 | Arquitectura monolítica | Un repositorio, tres módulos, `estado.js` como núcleo, `localStorage` como BD simulada. | Naser |
| 8 | Modelo de datos y estados | MER simplificado, entidades principales y línea de estados. | Integrante 4 |
| 9 | Pantallas clave | Capturas: inicio/búsqueda, perfil, solicitud, cotización, bandeja, seguimiento, calificación, admin. | Todos |
| 10 | Reglas de negocio | Doble aceptación, vencimiento, agenda, calificación única, permisos, privacidad. | Integrante 3 |
| 11 | Pruebas | Plan, 37 casos, 23 verificaciones de humo, 36 aprobados y 1 fallido, prueba con 5 personas pendiente. Mostrar **resultados reales** o “pendiente” si aún no se ejecutó. | Mario |
| 12 | Despliegue y operación | GitHub Pages, respaldo local, soporte, mantenimiento y retiro. | Mario |
| 13 | Indicadores | Fórmulas y ejemplo con datos ficticios; aclarar que no son métricas reales. | Mario |
| 14 | Conclusiones y cierre | Qué se aprendió, limitaciones, siguiente paso si el proyecto continuara, gracias y preguntas. | Mario/Naser |

**Consejo visual:** una idea por diapositiva, texto grande, capturas reales del prototipo, sin párrafos largos. Usar los mismos colores del prototipo (azul profundo y naranja).

---

## 3. Guion de Mario (3–4 minutos)

> Ajustar los tiempos según el total del equipo. Hablar pausado y señalar la pantalla cuando se mencione.

### 3.1 Pruebas

“Mi parte es la de pruebas, despliegue y entrega. Diseñé 37 casos de prueba, cada uno con requisito, precondiciones, pasos y resultado esperado; cubren acceso, búsqueda, solicitud, bandeja, cotización, seguimiento, historial, calificación, reclamos, permisos, excepciones y consistencia.

Antes de la sesión formal ejecuté una verificación técnica de humo sobre las seis pantallas y el núcleo: 23 comprobaciones, 23 correctas. Eso me permitió detectar y corregir, por ejemplo, que un botón de confirmación quedaba deshabilitado después de una acción y que el segundo paso de avance no se ejecutaba.

Después ejecuté los 37 casos en Edge real, sobre la versión integrada de `main`: 36 aprobados y 1 fallido. El fallo es PRU-35: las pantallas de error y sin conexión existen, pero la app no redirige a ellas; quedó registrado como DEF-01. También apareció un defecto menor de ortografía, DEF-02. La prueba de usabilidad con cinco personas sigue pendiente porque no hemos tenido participantes reales; no la inventamos.”

**Mostrar:** tabla de casos y, si ya existen, capturas de la sesión.

### 3.2 Bandeja y avance

“La bandeja del prestador usa las mismas reglas del núcleo. El prestador solo ve sus solicitudes. Si una solicitud está en `Solicitada`, puede aceptarla, rechazarla con motivo o dejarla vencer; el sistema la marca `Vencida` cuando se agota el plazo. Al aceptar, pasa a `En evaluación` y aparece el enlace para cotizar. Cuando el cliente aprueba, pasa a `Confirmada`; ahí recién se muestra la dirección exacta. Luego el prestador la inicia, la marca `En ejecución` y al terminar `Finalizada`. El cliente recién ahí puede calificar.”

**Cadena para explicar:** “La necesidad de responder rápido se convierte en RF07/RF09; el diseño es la bandeja y la tabla de transiciones; las pruebas son PRU-12, PRU-13, PRU-18 y PRU-30.”

### 3.3 Historial, calificación y reclamo

“El historial permite filtrar por activas, cerradas o por calificar. El botón de calificar solo aparece si el servicio está `Finalizada` y no tiene calificación. La pantalla de calificar usa radios con texto, no solo estrellas, para que sea accesible. El reclamo exige motivo y descripción, permite evidencia simulada y se ve en el panel de Soporte. Si la solicitud apenas está `Solicitada`, no se permite reclamar: se explica que primero se cancele.”

**Cadena:** “RF12 → calificar.html → `OY.puedeCalificar`/`OY.calificar` → PRU-22 y PRU-23.”

### 3.4 Despliegue y operación

“El despliegue es GitHub Pages desde `main`, con todos los activos en `vendor/`. Si falla el internet, la demo funciona en local con `python -m http.server`. Antes de publicar se reinician los datos, se prueba el humo y se revisa la consola. El rollback es volver al commit o a la etiqueta anterior. La operación incluye el flujo de Soporte, el reinicio de datos, el monitoreo manual y el respaldo local. El retiro incluye despublicar, borrar datos personales, archivar evidencias y revocar accesos.”

### 3.5 Indicadores

“El panel admin calcula cuatro indicadores con su fórmula: tasa de atención, cancelación, tiempo promedio de aceptación y reclamos por 100 servicios. Por ejemplo, con los datos ficticios iniciales, la tasa de atención es 2 finalizadas de 5 solicitudes, 40 %. Aclaro que es un ejemplo con datos ficticios, no un resultado real. Los demás indicadores están propuestos para una versión con backend.”

### 3.6 Cierre

“La conclusión es que el prototipo demuestra la cadena completa y que las reglas están centralizadas, pero no es un sistema de producción: usa `localStorage`, contraseñas sin cifrar y servicios simulados. El siguiente paso sería backend, autenticación segura, notificaciones y pruebas automatizadas. Gracias.”

---

## 4. Guion de la demo en vivo (5–7 minutos)

**Orden recomendado:**

1. **Cliente:** iniciar sesión (`cliente@demo.com`), buscar electricista, abrir perfil, crear solicitud.
2. **Prestador:** cambiar a `electricista@demo.com` (rol Prestador), abrir bandeja, aceptar, preparar cotización.
3. **Cliente:** volver, revisar y aprobar la cotización.
4. **Prestador:** iniciar y finalizar el servicio.
5. **Cliente:** historial, calificar con 4 o 5 estrellas.
6. **Cliente:** presentar un reclamo.
7. **Soporte:** `soporte@demo.com`, tomar el reclamo, resolverlo.
8. **Admin:** `admin@demo.com`, mostrar indicadores y verificación.
9. **Excepción:** abrir `estados/sin-conexion.html` o la pantalla de error.

**Reglas de la demo:**

- No escribir datos reales.
- No improvisar estados con la consola del navegador; usar la interfaz.
- Si algo falla, explicar la regla y usar el respaldo local.
- Tener las pestañas abiertas de antemano: cliente, prestador, soporte, admin, sin conexión.
- Reiniciar datos justo antes de empezar.

---

## 5. Preguntas probables y respuestas cortas

### ¿Por qué usaron `localStorage`?

Porque el prototipo debe demostrar el flujo sin backend ni costo de infraestructura. `estado.js` concentra las reglas y `localStorage` simula la base de datos. En producción se reemplaza por una base central y un backend, sin cambiar la responsabilidad de las pantallas.

### ¿Cómo evitan que se dupliquen solicitudes?

Cada formulario genera una `claveEnvio` al abrirse. Si el usuario reintenta, `crearSolicitud` devuelve la solicitud existente en lugar de crear otra. Además, se bloquea el botón mientras se procesa.

### ¿Cómo garantizan que un prestador no vea solicitudes ajenas?

`OY.solicitudesDelUsuario()` filtra por la cuenta o el prestador de la sesión. Las acciones vuelven a validar el permiso en `estado.js`; no basta con ocultar el botón.

### ¿Por qué la dirección se oculta hasta confirmar?

Es una regla de privacidad. El prestador ve la zona y la referencia general antes de aceptar; la dirección exacta se comparte cuando el cliente confirma la cotización. Así se reduce la exposición de datos.

### ¿Cómo prueban la calificación única?

`OY.puedeCalificar` exige que el servicio esté `Finalizada`, que el usuario sea el cliente dueño y que no exista una calificación previa. La pantalla muestra un mensaje distinto para cada caso y el núcleo vuelve a validar al guardar.

### ¿Qué pasa si se cae internet?

El prototipo es estático y los activos están en `vendor/`, así que puede seguir funcionando en local. La pantalla sin conexión explica qué se conserva y qué no. En producción, las acciones que cambian datos requerirían conexión con el servidor.

### ¿Cómo midieron la usabilidad?

Con 5 personas representativas, tareas guiadas, éxito por tarea, tiempo, errores, SEQ de 1 a 7 y comentarios. El plan está en el documento; los resultados se completan con la sesión real y su evidencia.

### ¿Qué defectos encontraron?

En la verificación de humo se corrigieron dos problemas de interacción en los modales de la bandeja. Los defectos formales se registran en `docs/05-registro-defectos.csv` después de la sesión. Las limitaciones conocidas (contraseñas sin cifrar, `localStorage`, simulaciones) están documentadas y aceptadas para el prototipo.

### ¿Qué indicadores son reales?

Los del panel admin se calculan con los datos que existan en ese momento. Para la defensa, los datos son ficticios; se presentan como ejemplo de fórmula, no como resultados de usuarios reales.

### ¿Qué harían si tuvieran más tiempo?

Backend con autenticación segura, base de datos, notificaciones reales, carga de evidencia, mapas, pruebas automatizadas y una prueba de usabilidad con más participantes.

---

## 6. Reparto de la defensa

| Tema | Quién | Tiempo sugerido |
|---|---|---|
| Problema, objetivos, alcance, entrevistas | Integrante 2 | 3 min |
| Requisitos, reglas y trazabilidad | Integrante 3 | 3 min |
| Modelado, MER, estados y TO-BE | Integrante 4 | 3 min |
| Arquitectura, login, admin y guía | Naser | 3 min |
| Pruebas, despliegue, operación e indicadores | Mario | 4 min |
| Demo en vivo | Todos, con Mario coordinando | 5–7 min |
| Cierre y preguntas | Naser + todos | 3 min |

---

## 7. Checklist final antes de la defensa

- [ ] Word exportado a PDF y revisado.
- [ ] Diapositivas en el equipo y en la nube.
- [ ] URL de GitHub Pages abierta y probada.
- [ ] Respaldo local probado.
- [ ] Datos de prueba reiniciados.
- [ ] Usuarios de prueba a mano.
- [ ] Orden de la demo impreso o en el celular.
- [ ] Resultados reales de usabilidad cargados (no inventados).
- [ ] Defectos conocidos y limitaciones listos para explicar.
- [ ] Todos los integrantes saben qué diapositiva les toca.
- [ ] Ensayo completo cronometrado.
