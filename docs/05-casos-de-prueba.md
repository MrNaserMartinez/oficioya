# OficioYa Jutiapa — Ejecución de los casos de prueba (PRU)

**Responsable:** Mario (Integrante 5)  
**Fecha de ejecución:** 26/10/2026  
**Versión probada:** `main` integrada, commit `c766d73`  
**Complemento de:** `docs/05-pruebas-despliegue.md` y del Word «Prueba_OficioYa(5).docx».

## Cómo leer este registro

- El **diseño** de los 37 casos (precondiciones, pasos, datos y resultado esperado) está en la Tabla 3 del Word; aquí se registra la **ejecución real** con el mismo ID.
- Cada caso se ejecutó en un contexto de navegador nuevo, con los datos de prueba reiniciados, en Microsoft Edge (headless) controlado con Playwright 1.64.1.
- Servidor local: `http://127.0.0.1:8000` (raíz del proyecto), porque es el respaldo local oficial del prototipo.
- Las capturas están en `evidencias/` con el nombre indicado en cada fila.
- Resultado: **Aprobado**, **Fallido**, **Bloqueado** o **Pendiente**. Un caso con observación menor puede quedar Aprobado y generar un defecto de severidad baja.

## Resumen

| Ejecutados | Aprobados | Fallidos | Pendientes |
|---|---|---|---|
| 37 | 36 | 1 | 0 |

El único caso fallido es **PRU-35**. Los defectos abiertos son **DEF-01** (PRU-35) y **DEF-02** (PRU-22, observación de ortografía).

## Resultados por caso

| ID | Tipo | RF / regla | Resultado obtenido | Evidencia | Estado |
|---|---|---|---|---|---|
| PRU-01 | Funcional | RF01 | La cuenta prueba1@demo.com se creó, inició sesión automáticamente y volvió a ingresar tras cerrar sesión. | `evidencias/PRU-01.png`, `evidencias/PRU-01_formulario.png` | **Aprobado** |
| PRU-02 | Funcional | RF01 | Ingresó a la portada con el menú de cliente (Inicio, Buscar, Mis solicitudes) y su nombre en la barra. | `evidencias/PRU-02.png` | **Aprobado** |
| PRU-03 | Funcional | RF01 | Con contraseña incorrecta mostró «Correo o contraseña incorrectos.» y no se creó sesión. | `evidencias/PRU-03.png` | **Aprobado** |
| PRU-04 | Funcional | RF01 | El código simulado se mostró con la etiqueta «Simulado»; el cambio de contraseña y el acceso con la nueva clave funcionaron. | `evidencias/PRU-04.png`, `evidencias/PRU-04_codigo.png` | **Aprobado** |
| PRU-05 | Funcional | RF02 | El perfil mostró 8 años de experiencia, oficio, zonas (Centro, Norte y Oriente), horario y verificación. Con sesión de prestador, el botón Solicitar quedó bloqueado. | `evidencias/PRU-05.png` | **Aprobado** |
| PRU-06 | Funcional | RF03 | Se agregó «Fontanería» y apareció en el selector de la portada; Pinchazos, Electricista y Herrero siguieron disponibles. | `evidencias/PRU-06.png`, `evidencias/PRU-06_admin.png` | **Aprobado** |
| PRU-07 | Funcional | RF04 | Pinchazos + Sector Centro + «Disponible ahora» mostró solo a Rosa Ortiz y el aviso de atención inmediata. Se ejecutó a las 23:18, fuera del horario 06:00–20:00, así que se amplió el horario de la prestadora en los datos de prueba. El prototipo usa sectores Z01–Z05, no «Jutiapa cabecera». | `evidencias/PRU-07.png` | **Aprobado** |
| PRU-08 | Funcional | RF04 | Con «Solo verificados» en Electricista apareció únicamente Carlos Méndez (Verificado). | `evidencias/PRU-08.png` | **Aprobado** |
| PRU-09 | Funcional | RF05 | El perfil abierto desde los resultados mostró oficio, experiencia, zonas, horario, verificación con lo revisado y la calificación existente (5.0 con 1 calificación). | `evidencias/PRU-09.png` | **Aprobado** |
| PRU-10 | Funcional | RF06 | Se creó SOL-0006 en estado Solicitada con historial inicial, zona, horario y el nombre de la foto (la foto se simula: solo se guarda el nombre). | `evidencias/PRU-10.png`, `evidencias/PRU-10_formulario.png` | **Aprobado** |
| PRU-11 | Funcional / Excepción | RF06 | Sin descripción no se creó la solicitud: se indicó el campo faltante y se conservaron la zona, la referencia y la fecha ya escritas. | `evidencias/PRU-11.png` | **Aprobado** |
| PRU-12 | Funcional | RF07 | SOL-0005 pasó a En evaluación y el historial registró el cambio con la cuenta y el rol de prestador. | `evidencias/PRU-12.png` | **Aprobado** |
| PRU-13 | Funcional / Excepción | RF07 | SOL-0005 quedó Rechazada con el motivo «Fuera de mi horario»; el cliente vio el estado y el motivo en el seguimiento. | `evidencias/PRU-13.png` | **Aprobado** |
| PRU-14 | Funcional / Excepción | RF07 | Con la fecha límite ajustada al pasado, la solicitud inmediata se marcó Vencida al cargar la bandeja y ya no ofreció aceptarse. | `evidencias/PRU-14.png` | **Aprobado** |
| PRU-15 | Funcional | RF08 | COT-0004 separó mano de obra Q 200.00, materiales Q 100.00, cargos Q 50.00 y visita Q 75.00; total Q 425.00. La solicitud pasó a Pendiente de aprobación. | `evidencias/PRU-15.png` | **Aprobado** |
| PRU-16 | Funcional | RF08 | cliente2 aprobó COT-0003 (Q 350.00): la cotización quedó Aprobada y SOL-0004 pasó a Confirmada. | `evidencias/PRU-16.png` | **Aprobado** |
| PRU-17 | Funcional / Excepción | RF08 | El cliente rechazó la cotización con «Precio alto»: SOL-0004 pasó a Rechazada, el motivo quedó en el historial y el prestador lo vio. | `evidencias/PRU-17.png` | **Aprobado** |
| PRU-18 | Funcional | RF09 | En ejecución y luego Finalizada. El seguimiento mostró la línea de estados en orden, con fecha, nombre y rol (Cliente/Prestador) de cada cambio. | `evidencias/PRU-18.png` | **Aprobado** |
| PRU-19 | Funcional | RF10 | «¿A qué hora llegan?» y «Llego a las 8:00.» quedaron visibles para ambos participantes. Otro cliente recibió el aviso de que solo puede ver sus propias solicitudes. | `evidencias/PRU-19.png`, `evidencias/PRU-19_ajeno.png` | **Aprobado** |
| PRU-20 | Funcional / Excepción | RF11 | SOL-0005 quedó Cancelada con el motivo «Ya no lo necesito» en el historial y la pantalla ya no ofreció acciones. | `evidencias/PRU-20.png` | **Aprobado** |
| PRU-21 | Funcional | RF11 | REC-0002 quedó Abierto con la evidencia «evidencia-reclamo.pdf» y visible para Soporte. El catálogo no tenía «Trabajo incompleto»: se usó «Calidad del trabajo» y esa frase en la descripción. | `evidencias/PRU-21.png`, `evidencias/PRU-21_cliente.png` | **Aprobado** |
| PRU-22 | Funcional | RF12 | La calificación de 5 estrellas quedó guardada y el perfil mostró el comentario y 2 calificaciones. Se observó el texto «2 calificaciónes» (DEF-02). | `evidencias/PRU-22.png`, `evidencias/PRU-22_perfil.png` | **Aprobado** |
| PRU-23 | Negocio / Excepción | RF12 | Bloqueó ambos intentos: «Todavía no puedes calificar» para SOL-0005 (Solicitada) y «Este servicio ya fue calificado» para SOL-0001, sin mostrar el formulario. | `evidencias/PRU-23.png`, `evidencias/PRU-23_1.png` | **Aprobado** |
| PRU-24 | Funcional | RF13 | El historial mostró SOL-0001, SOL-0002 y SOL-0005, y no mostró SOL-0003 ni SOL-0004, que pertenecen a otra clienta. | `evidencias/PRU-24.png` | **Aprobado** |
| PRU-25 | Funcional | RF14 | La cuenta C04 quedó Suspendida y la tabla lo reflejó; el resumen mostró sus 4 indicadores y la tabla con los 9 estados y el total. | `evidencias/PRU-25.png` | **Aprobado** |
| PRU-26 | Negocio | RN: Doble aceptación | La bandeja de pinchazos no mostró SOL-0005 y al abrir su cotización el sistema respondió «Solicitud no encontrada», sin revelar datos ni abrir el formulario. | `evidencias/PRU-26.png` | **Aprobado** |
| PRU-27 | Negocio | RN: Agenda | Con SOL-0004 ya confirmada, la aprobación de otra solicitud del mismo prestador en la misma fecha y franja se rechazó con «El prestador ya tiene un servicio confirmado en esa fecha y franja»; el estado no cambió. | `evidencias/PRU-27.png` | **Aprobado** |
| PRU-28 | Negocio | RN: Cobertura | El formulario solo ofreció Z01, Z02 y Z04; al forzar Z03, la regla respondió «Ese prestador no atiende en tu zona.» | `evidencias/PRU-28.png` | **Aprobado** |
| PRU-29 | Negocio | RNF: Conectividad / RN: Duplicados | Al enviar dos veces el mismo formulario, el botón quedó deshabilitado y se creó una sola solicitud (SOL-0006) con un solo registro inicial en el historial. | `evidencias/PRU-29.png` | **Aprobado** |
| PRU-30 | Negocio | RN: Transiciones | La interfaz no ofreció el paso y OY.cambiarEstado devolvió «No se puede pasar de \"Solicitada\" a \"En ejecución\".»; el estado no cambió. | `evidencias/PRU-30.png` | **Aprobado** |
| PRU-31 | Permisos | RNF: Seguridad | Con sesión de cliente, admin/index.html redirigió a la portada del cliente y no mostró el panel ni sus datos. | `evidencias/PRU-31.png` | **Aprobado** |
| PRU-32 | Permisos | RF14 / Soporte | Soporte entró como «Atención de reclamos»: solo vio Reclamos, sin Oficios, Cuentas ni acciones para suspender o verificar cuentas. | `evidencias/PRU-32.png` | **Aprobado** |
| PRU-33 | Permisos | RF01 / RF14 | El ingreso mostró «Tu cuenta está suspendida. Comunícate con soporte.», no se creó sesión y el prestador dejó de aparecer en las búsquedas. | `evidencias/PRU-33.png` | **Aprobado** |
| PRU-34 | Excepción | RF04 | Mostró «Sin prestadores disponibles» con la explicación de los filtros, alternativas y el botón para volver a buscar. | `evidencias/PRU-34.png` | **Aprobado** |
| PRU-35 | Excepción | RNF: Conectividad | Fallido: las pantallas de excepción existen y funcionan al abrirlas directamente, pero sin conexión solo aparece la franja de aviso y al navegar se ve el error del navegador; una ruta inexistente devuelve el 404 del servidor. Se registra DEF-01. | `evidencias/PRU-35_banner.png`, `evidencias/PRU-35_error.png`, `evidencias/PRU-35_ruta.png` | **Fallido** |
| PRU-36 | Consistencia | Glosario / RNF: Accesibilidad | Los 9 estados de OY.ESTADOS coinciden con el glosario del README y los badges revisados usan nombre, ícono y texto, no solo color. | `evidencias/PRU-36.png` | **Aprobado** |
| PRU-37 | Consistencia | Alcance (simulaciones) | Mapa (búsqueda y solicitud), fotos, notificación, pago, evidencia y correo de recuperación muestran la etiqueta visible «Simulado». | `evidencias/PRU-37.png`, `evidencias/PRU-37_busqueda.png`, `evidencias/PRU-37_recuperar.png` | **Aprobado** |

## Observaciones de ejecución

- **PRU-07:** se ejecutó a las 23:18, fuera del horario 06:00–20:00 de la prestadora. Para observar el filtro «Disponible ahora» se amplió su horario en los datos de prueba. El prototipo usa sectores (Z01–Z05), no «Jutiapa cabecera».
- **PRU-14:** el vencimiento se probó moviendo `fechaLimite` al pasado en `localStorage`, como permite el propio caso; al recargar, la solicitud pasó a Vencida y dejó de ofrecer aceptación.
- **PRU-21:** el catálogo de motivos no incluye «Trabajo incompleto». Se usó el motivo «Calidad del trabajo» y la frase «Trabajo incompleto» en la descripción; el reclamo quedó registrado y visible para Soporte.
- **PRU-22:** la calificación se guardó correctamente, pero el perfil muestra «2 calificaciónes» en lugar de «2 calificaciones» (DEF-02).
- **PRU-35:** es el único caso fallido. `estados/sin-conexion.html` y `estados/error.html?codigo=404&ref=...` funcionan al abrirlas directamente, pero la aplicación no redirige a ellas: sin conexión solo aparece la franja de aviso y al navegar se ve el error del navegador; una ruta inexistente devuelve el 404 del servidor. Se registra DEF-01.
- **PRU-29** y **PRU-10** reutilizan el mismo escenario de solicitud; cada caso se ejecutó en un contexto limpio, por lo que los IDs generados coinciden (SOL-0006) sin compartir estado.

## Prueba de usabilidad

**Pendiente.** No se ejecutó la sesión con cinco participantes reales. Las Tablas 5 y 6 del Word quedan marcadas como pendientes y no contienen datos inventados. Para completarlas hacen falta: consentimiento, observación de la tarea «Busque un electricista y complete una solicitud sin ayuda», registro de tiempo y dificultades, y al menos cuatro de cinco participantes que la completen sin ayuda.

## Defectos

| ID | Caso | Severidad | Estado | Descripción |
|---|---|---|---|---|
| DEF-01 | PRU-35 | Media | Abierto | Sin conexión solo se muestra la franja de aviso y al navegar aparece el error del navegador; una ruta inexistente devuelve el 404 del servidor. Las pantallas de excepción existen y funcionan al abrirlas directamente. |
| DEF-02 | PRU-22 | Baja | Abierto | Plural incorrecto «calificaciónes» en `cliente/perfil-prestador.html` y `cliente/busqueda.html`. |

El detalle y la corrección pendiente están en `docs/05-registro-defectos.csv`.
