# OficioYa Jutiapa — Casos de prueba (PRU)

**Responsable:** Mario (Integrante 5)  
**Versión:** 0.1 (26/10/2026)  
**Complemento de:** `docs/05-pruebas-despliegue.md`

## Cómo usar este documento

- Ejecutar los casos en orden, con los datos de prueba reiniciados.
- Registrar en la columna **Resultado formal**: `Aprobado`, `Falló`, `Bloqueado` o `No aplica`.
- Adjuntar evidencia (captura o video corto) con el nombre `PRU-XX-evidencia.png`.
- La columna **Humo 26/10** indica lo que ya se verificó técnicamente con datos ficticios; **no sustituye** la ejecución formal en navegador.
- Si un caso falla, abrir un registro en `docs/05-registro-defectos.csv` y no marcarlo como aprobado hasta corregirlo y repetirlo.

---

## A. Acceso y preparación

### PRU-01 · Inicio de sesión de cliente

- **Requisito:** RF01
- **Prioridad:** Alta
- **Precondiciones:** Datos de prueba reiniciados.
- **Datos:** `cliente@demo.com` / `demo123`
- **Pasos:**
  1. Abrir `acceso/login.html`.
  2. Escribir el correo y la contraseña.
  3. Pulsar **Ingresar**.
  4. Recargar la página.
  5. Abrir el menú del usuario y pulsar **Cerrar sesión**.
- **Resultado esperado:** Entra a `index.html`; la barra muestra el nombre y el rol Cliente; la sesión se conserva al recargar; al cerrar sesión vuelve al login y una página protegida redirige al login.
- **Tipo:** Funcional / seguridad.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** No ejecutado.

### PRU-02 · Inicio de sesión de prestador y cambio de rol

- **Requisito:** RF01
- **Prioridad:** Alta
- **Precondiciones:** Datos de prueba reiniciados.
- **Datos:** `electricista@demo.com` / `demo123`
- **Pasos:**
  1. Iniciar sesión.
  2. En el paso “¿Cómo quieres entrar?”, elegir **Prestador**.
  3. Verificar que abre `prestador/bandeja.html`.
  4. En el menú, elegir **Entrar como Cliente**.
  5. Volver a entrar como Prestador.
- **Resultado esperado:** El rol cambia sin cerrar la cuenta; la bandeja solo muestra solicitudes del prestador; el inicio del cliente no muestra la bandeja.
- **Tipo:** Funcional / permisos.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** No ejecutado (el núcleo se probó cambiando rol por código).

### PRU-03 · Reiniciar datos de prueba

- **Requisito:** RNF de operación / demo
- **Prioridad:** Media
- **Precondiciones:** Haber creado o modificado una solicitud.
- **Pasos:**
  1. Abrir el menú del usuario.
  2. Pulsar **Reiniciar datos de prueba**.
  3. Confirmar.
  4. Iniciar sesión de nuevo con `herrero@demo.com`.
  5. Abrir la bandeja.
- **Resultado esperado:** Se cierra la sesión, los datos vuelven a los ficticios y `SOL-0005` aparece en estado `Solicitada`.
- **Tipo:** Funcional / operación.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** No ejecutado.

---

## B. Bandeja del prestador

### PRU-04 · La bandeja muestra solo las solicitudes propias

- **Requisito:** RF07
- **Prioridad:** Alta
- **Precondiciones:** Datos reiniciados; sesión de `herrero@demo.com` con rol Prestador.
- **Pasos:**
  1. Abrir `prestador/bandeja.html`.
  2. Revisar las tarjetas y los contadores.
  3. Comparar con las solicitudes de otro prestador (`electricista@demo.com`).
- **Resultado esperado:** Se ve `SOL-0005` y no las solicitudes de otros prestadores; el contador “Nuevas por responder” es 1; la dirección exacta no se muestra antes de confirmar; no aparecen correos ni teléfonos.
- **Tipo:** Funcional / privacidad.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado.

### PRU-05 · Aceptar una solicitud

- **Requisito:** RF07, RF09
- **Prioridad:** Alta
- **Precondiciones:** `SOL-0005` en estado `Solicitada`; sesión de `herrero@demo.com`.
- **Pasos:**
  1. Abrir la bandeja.
  2. En `SOL-0005`, pulsar **Aceptar**.
  3. Leer la confirmación y pulsar **Aceptar solicitud**.
  4. Revisar el estado, el contador y el historial.
- **Resultado esperado:** El estado pasa a `En evaluación`; desaparece de “Nuevas” y aparece en “En curso”; se muestra el botón **Preparar cotización**; el historial registra el cambio con el rol prestador; el cliente puede ver el nuevo estado.
- **Tipo:** Funcional.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado.

### PRU-06 · Rechazar una solicitud con motivo obligatorio

- **Requisito:** RF07, RN de cancelación/rechazo
- **Prioridad:** Alta
- **Precondiciones:** `SOL-0005` en `Solicitada`.
- **Pasos:**
  1. Pulsar **Rechazar**.
  2. Intentar confirmar sin escribir motivo.
  3. Escribir “No tengo disponibilidad esta semana”.
  4. Confirmar.
  5. Abrir el historial de la solicitud y el historial del cliente.
- **Resultado esperado:** Sin motivo, el sistema no cambia el estado y marca el campo; con motivo, pasa a `Rechazada`; el motivo queda en el historial y es visible para el cliente; la solicitud se mueve a “Cerradas”.
- **Tipo:** Funcional / límite.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado.
- **Variante:** aceptar primero la solicitud y, ya en `En evaluación`, pulsar **Rechazar**. También debe exigir motivo y dejar el registro en el historial.

### PRU-07 · Dejar vencer una solicitud

- **Requisito:** RF07, RN de vencimiento
- **Prioridad:** Alta
- **Precondiciones:** Una copia de los datos con una solicitud en `Solicitada` y `fechaLimite` anterior a la fecha actual (no modificar la base de la demo principal). Para una solicitud inmediata, el plazo normal es 30 minutos.
- **Pasos:**
  1. Abrir la bandeja del prestador correspondiente.
  2. Comprobar el texto “Vence en…” o “Plazo agotado”.
  3. Recargar o esperar a que se ejecute `OY.revisarVencimientos()`.
  4. Revisar la solicitud y su historial.
  5. Entrar como el cliente y abrir el historial.
- **Resultado esperado:** La solicitud pasa a `Vencida`; el historial registra “Plazo de respuesta agotado”; ya no se ofrecen Aceptar/Rechazar; el cliente ve `Vencida` y puede volver a solicitar.
- **Tipo:** Funcional / tiempo.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** No ejecutado (requiere preparar una fecha vencida o esperar el plazo).

### PRU-08 · La dirección exacta se muestra solo al confirmar

- **Requisito:** RF07, privacidad
- **Prioridad:** Alta
- **Precondiciones:** `SOL-0004` en `Pendiente de aprobación` y luego `Confirmada` (o preparar una solicitud confirmada en una copia).
- **Pasos:**
  1. Abrir la bandeja con la solicitud antes de confirmar.
  2. Revisar el campo Dirección.
  3. Aprobar la cotización como cliente.
  4. Volver a abrir la bandeja del prestador.
  5. Revisar de nuevo la dirección.
- **Resultado esperado:** Antes de confirmar se muestra “Se comparte al confirmar el servicio”; después de confirmar se ve la referencia exacta; en `Finalizada` se conserva.
- **Tipo:** Privacidad / funcional.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado con datos preparados.

### PRU-09 · Marcar avance: iniciar y finalizar

- **Requisito:** RF09
- **Prioridad:** Alta
- **Precondiciones:** Solicitud en `Confirmada`.
- **Pasos:**
  1. Pulsar **Iniciar servicio** y confirmar.
  2. Verificar el estado.
  3. Pulsar **Marcar como finalizada** y confirmar.
  4. Entrar como cliente y revisar el historial.
- **Resultado esperado:** `Confirmada → En ejecución → Finalizada`; el historial guarda ambos cambios con fecha y rol; el cliente ve el estado y el botón **Calificar servicio**; el prestador ve el aviso de que falta la calificación.
- **Tipo:** Funcional.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado con datos preparados.

### PRU-10 · Cancelar un servicio confirmado con motivo

- **Requisito:** RF09, RF11
- **Prioridad:** Alta
- **Precondiciones:** Solicitud en `Confirmada`.
- **Pasos:**
  1. Pulsar **Cancelar**.
  2. Intentar confirmar sin motivo.
  3. Escribir un motivo y confirmar.
  4. Revisar el historial del prestador y del cliente.
- **Resultado esperado:** Sin motivo no cambia; con motivo pasa a `Cancelada`; el motivo queda registrado; el cliente ve la cancelación y el motivo.
- **Tipo:** Funcional / límite.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** No ejecutado.

---

## C. Historial del cliente

### PRU-11 · Listado e información del historial

- **Requisito:** RF13
- **Prioridad:** Alta
- **Precondiciones:** Sesión de `cliente@demo.com`.
- **Pasos:**
  1. Abrir `cliente/historial.html`.
  2. Revisar cada tarjeta.
  3. Comprobar el resumen superior.
- **Resultado esperado:** Se ven las solicitudes del cliente (`SOL-0001`, `SOL-0002`, `SOL-0005`); cada una muestra oficio, prestador, zona, fecha, estado con ícono y texto, cotización si existe y calificación si ya se registró; el resumen indica total, activas y finalizadas.
- **Tipo:** Funcional.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado.

### PRU-12 · Filtros y búsqueda

- **Requisito:** RF13
- **Prioridad:** Media
- **Pasos:**
  1. Probar **Todas**, **Activas**, **Cerradas** y **Por calificar**.
  2. Escribir el oficio, el nombre del prestador o el número de solicitud en el buscador.
  3. Combinar un filtro con una búsqueda.
  4. Pulsar **Limpiar filtros** en el estado vacío.
- **Resultado esperado:** Cada filtro muestra solo las solicitudes que corresponden; la búsqueda no distingue mayúsculas/minúsculas; si no hay coincidencias se muestra un estado vacío con opción de limpiar; el botón limpia filtros y búsqueda.
- **Tipo:** Funcional / usabilidad.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Parcial (se verificó el filtro Por calificar).

### PRU-13 · Enlaces desde el historial

- **Requisito:** RF13, RF08, RF12, RF11
- **Prioridad:** Media
- **Pasos:**
  1. En una solicitud activa, pulsar **Ver seguimiento**.
  2. En una `Pendiente de aprobación`, pulsar **Revisar cotización**.
  3. En una `Finalizada` sin calificar, pulsar **Calificar servicio**.
  4. En una solicitud con servicio, pulsar **Presentar reclamo**.
  5. En una cerrada, pulsar **Volver a solicitar**.
- **Resultado esperado:** Cada enlace abre la pantalla correcta con el identificador de la solicitud; no hay enlaces rotos ni solicitudes cruzadas.
- **Tipo:** Integración / navegación.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Parcial (se verificó el enlace de calificar).

### PRU-14 · Estado vacío del historial

- **Requisito:** RF13
- **Prioridad:** Media
- **Precondiciones:** Una cuenta de cliente nueva, sin solicitudes.
- **Pasos:**
  1. Registrarse o iniciar sesión con esa cuenta.
  2. Abrir `cliente/historial.html`.
  3. Revisar el mensaje y el botón.
- **Resultado esperado:** Se muestra un estado vacío claro, con un botón para buscar un prestador; no hay errores ni tablas vacías.
- **Tipo:** Excepción / usabilidad.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** No ejecutado con una cuenta nueva (sí se probó el vacío de un filtro).

---

## D. Calificación

### PRU-15 · No se puede calificar un servicio no finalizado

- **Requisito:** RF12, RN de calificaciones
- **Prioridad:** Alta
- **Precondiciones:** `SOL-0005` en `Solicitada` y sesión de `cliente@demo.com`.
- **Pasos:**
  1. Abrir `cliente/calificar.html?solicitud=SOL-0005`.
  2. Revisar el mensaje y los botones.
  3. Intentar forzar el envío del formulario desde la consola (si existe).
- **Resultado esperado:** No hay formulario; se explica que solo se califica un servicio `Finalizada`; se ofrece ver el seguimiento y volver al historial; el núcleo rechaza cualquier intento.
- **Tipo:** Regla de negocio / excepción.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado.

### PRU-16 · No se puede calificar dos veces

- **Requisito:** RF12, RN de calificaciones
- **Prioridad:** Alta
- **Precondiciones:** `SOL-0001` ya calificada; sesión de `cliente@demo.com`.
- **Pasos:**
  1. Abrir `cliente/calificar.html?solicitud=SOL-0001`.
  2. Revisar el mensaje, las estrellas y el comentario existente.
  3. Comprobar que no hay formulario.
- **Resultado esperado:** Se muestra “Este servicio ya fue calificado”, la puntuación y el comentario; no se ofrece otro formulario; el núcleo devuelve error si se intenta de nuevo.
- **Tipo:** Regla de negocio / límite.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado.

### PRU-17 · Guardar una calificación válida

- **Requisito:** RF12
- **Prioridad:** Alta
- **Precondiciones:** Un servicio propio en `Finalizada` sin calificación (completar el flujo o preparar una copia con `SOL-0005` finalizada).
- **Pasos:**
  1. Abrir la pantalla de calificar.
  2. Elegir 5 estrellas.
  3. Escribir un comentario.
  4. Pulsar **Enviar calificación**.
  5. Volver al historial y al perfil del prestador.
- **Resultado esperado:** La calificación se guarda con 5 estrellas y comentario; se muestra confirmación; el historial muestra la calificación; el promedio del prestador se actualiza; ya no se ofrece calificar de nuevo.
- **Tipo:** Funcional.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado con datos preparados.

### PRU-18 · Selector de estrellas accesible

- **Requisito:** RNF de accesibilidad / RF12
- **Prioridad:** Alta
- **Pasos:**
  1. Recorrer el formulario solo con `Tab` y `Shift+Tab`.
  2. Elegir una estrella con `Espacio` o `Enter`.
  3. Comprobar el foco visible.
  4. Revisar con un lector de pantalla o la herramienta de accesibilidad del navegador.
  5. Enviar sin elegir estrellas.
- **Resultado esperado:** Cada opción tiene etiqueta textual (“1 estrella”, “2 estrellas”…), no solo un ícono; el foco es visible; se puede seleccionar con teclado; el mensaje de error se anuncia y lleva el foco al grupo; el botón de envío es accesible.
- **Tipo:** Accesibilidad / usabilidad.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Parcial (estructura de radios y etiquetas revisada en código).

### PRU-19 · Permisos: un cliente no califica el servicio de otro

- **Requisito:** RF12, RNF de seguridad
- **Prioridad:** Alta
- **Precondiciones:** Sesión de `cliente2@demo.com`; `SOL-0002` pertenece a `cliente@demo.com`.
- **Pasos:**
  1. Abrir `cliente/calificar.html?solicitud=SOL-0002`.
  2. Revisar el mensaje.
  3. Intentar abrir una solicitud inexistente (`?solicitud=SOL-9999`).
- **Resultado esperado:** No se muestran datos de la solicitud ajena; se muestra “Solicitud no encontrada” o “No tienes permiso”; no hay formulario; no se filtra información del otro cliente.
- **Tipo:** Seguridad / permisos.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** No ejecutado (sí se probó el permiso equivalente en reclamo).

---

## E. Reclamos

### PRU-20 · Registrar un reclamo válido

- **Requisito:** RF11
- **Prioridad:** Alta
- **Precondiciones:** Sesión de `cliente@demo.com`; `SOL-0002` en `Finalizada` (o un servicio con atención).
- **Pasos:**
  1. Abrir `cliente/reclamo.html?solicitud=SOL-0002`.
  2. Elegir motivo **Calidad**.
  3. Escribir una descripción de al menos 10 caracteres.
  4. Adjuntar opcionalmente un archivo.
  5. Pulsar **Enviar reclamo**.
- **Resultado esperado:** Se crea un reclamo con ID `REC-xxxx`, estado `Abierto`, fecha y autor; aparece en la lista de reclamos de la solicitud; el mensaje de confirmación es claro; el formulario se limpia.
- **Tipo:** Funcional.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado (sin archivo).

### PRU-21 · Validación de motivo y descripción

- **Requisito:** RF11
- **Prioridad:** Alta
- **Pasos:**
  1. Abrir el formulario de reclamo de un servicio válido.
  2. Intentar enviar sin motivo y con descripción corta.
  3. Corregir solo el motivo.
  4. Corregir la descripción.
- **Resultado esperado:** Sin motivo o con menos de 10 caracteres no se guarda; los campos se marcan; el mensaje explica qué falta; con ambos datos válidos se guarda.
- **Tipo:** Límite / validación.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado.

### PRU-22 · No se puede reclamar sobre una solicitud apenas creada

- **Requisito:** RF11, RN de reclamos
- **Prioridad:** Alta
- **Precondiciones:** `SOL-0005` en `Solicitada`.
- **Pasos:**
  1. Abrir `cliente/reclamo.html?solicitud=SOL-0005`.
  2. Revisar el mensaje.
  3. Comprobar que no hay formulario.
  4. Seguir el enlace para cancelar la solicitud.
- **Resultado esperado:** Se explica que aún no hay servicio contratado; se sugiere cancelar; no se puede crear el reclamo.
- **Tipo:** Regla de negocio / excepción.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Aprobado.

### PRU-23 · Evidencia simulada y atención por Soporte

- **Requisito:** RF11, RF14
- **Prioridad:** Alta
- **Precondiciones:** Un reclamo abierto.
- **Pasos:**
  1. Adjuntar una imagen y un PDF en el formulario.
  2. Enviar y revisar la lista: deben verse solo los nombres.
  3. Iniciar sesión como `soporte@demo.com`.
  4. Abrir **Reclamos**, tomar el caso **En revisión** y luego **Resolver** con una explicación.
  5. Volver al cliente y revisar la resolución.
- **Resultado esperado:** El archivo no se sube, solo se guarda el nombre y se marca como simulado; Soporte ve el reclamo; los estados cambian a `En revisión` y `Resuelto`; la resolución es visible para el cliente; el panel de indicadores actualiza los reclamos abiertos.
- **Tipo:** Integración / funcional.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Parcial (solo registro; no se probó la carga de archivos ni el panel de Soporte en navegador).

---

## F. Pantallas de excepción

### PRU-24 · Pantalla de error

- **Requisito:** RNF de usabilidad / excepciones
- **Prioridad:** Media
- **Pasos:**
  1. Abrir `estados/error.html?codigo=404&ref=ERR-ABC123`.
  2. Leer el mensaje y el código.
  3. Pulsar **Reintentar**.
  4. Volver a abrir y pulsar **Volver al inicio**.
  5. Repetir con una sesión de cliente.
- **Resultado esperado:** El mensaje es claro y sin tecnicismos; se muestra la referencia; **Reintentar** vuelve a la página anterior o al inicio; **Volver al inicio** lleva al inicio del rol; el cliente ve además **Mis solicitudes**; se aclara que no se reenvía nada.
- **Tipo:** Excepción / usabilidad.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Parcial (mensaje, referencia y enlaces; no se probó el historial del navegador).

### PRU-25 · Pantalla sin conexión

- **Requisito:** RNF de disponibilidad / excepciones
- **Prioridad:** Alta
- **Pasos:**
  1. Abrir la demo.
  2. En Chrome, F12 → Network → Offline.
  3. Abrir `estados/sin-conexion.html` o provocar el aviso.
  4. Pulsar **Reintentar** sin conexión.
  5. Volver a Online y pulsar **Reintentar**.
  6. Revisar la barra gris de “Sin conexión” en las demás páginas.
- **Resultado esperado:** La pantalla explica qué se conserva y qué no; el aviso de conexión se actualiza; sin internet, Reintentar muestra una advertencia; con internet, vuelve a la página anterior o al inicio; la barra gris desaparece al recuperar la conexión.
- **Tipo:** Excepción / conectividad.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Parcial (evento `online` y contenido; no se probó DevTools/Offline).

### PRU-26 · Navegación y permisos por rol

- **Requisito:** RF01, RNF de seguridad
- **Prioridad:** Alta
- **Pasos:**
  1. Sin sesión, comprobar que la barra ofrece Ingresar y Registrarse.
  2. Entrar como cliente, prestador, administrador y soporte.
  3. Intentar abrir una pantalla de otro rol escribiendo la URL.
  4. Revisar el menú de Soporte.
- **Resultado esperado:** Cada rol ve su menú; una URL no permitida redirige al login o al inicio del rol; Soporte solo ve reclamos; no se puede actuar sobre datos ajenos.
- **Tipo:** Seguridad / permisos.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Parcial (permisos de calificar y reclamar; no se probaron los cuatro roles en navegador).

---

## G. Transversales

### PRU-27 · Diseño adaptable

- **Requisito:** RNF de usabilidad
- **Prioridad:** Media
- **Pasos:**
  1. Probar 360 × 640, 768 × 1024 y 1366 × 768.
  2. Abrir bandeja, historial, calificar y reclamo.
  3. Abrir los modales de aceptar, rechazar y cancelar.
  4. Revisar que no haya desplazamiento horizontal.
- **Resultado esperado:** Las tarjetas se apilan, los botones se ajustan, los textos no se cortan y los modales caben en la pantalla; el foco y los mensajes siguen visibles.
- **Tipo:** Usabilidad / responsive.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** No ejecutado (solo estructura Bootstrap revisada).

### PRU-28 · Flujo completo de punta a punta

- **Requisito:** RF06–RF13
- **Prioridad:** Crítica
- **Precondiciones:** Todos los módulos integrados y datos reiniciados.
- **Pasos:**
  1. Cliente busca un electricista en su zona y crea la solicitud.
  2. Prestador la ve en la bandeja, la acepta y envía una cotización.
  3. Cliente revisa y aprueba la cotización.
  4. Prestador inicia y finaliza el servicio.
  5. Cliente ve el historial y califica.
  6. Cliente presenta un reclamo.
  7. Soporte atiende y resuelve el reclamo.
  8. Administrador revisa los indicadores.
- **Resultado esperado:** Toda la cadena conserva los estados del glosario; no se duplican solicitudes; el historial muestra cada paso; la calificación solo aparece al final; el reclamo y la resolución son visibles; los indicadores cambian de forma coherente.
- **Tipo:** Integración / regresión.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Núcleo aprobado (solicitar → aceptar → cotizar → aprobar → ejecutar → finalizar → calificar); la interfaz completa queda pendiente de la integración con las pantallas del Integrante 4.

### PRU-29 · Regresión y consola limpia

- **Requisito:** RNF de mantenibilidad
- **Prioridad:** Alta
- **Precondiciones:** Después de unir los Pull Requests.
- **Pasos:**
  1. Abrir cada pantalla usada en la demo.
  2. Revisar la consola: no debe haber errores rojos ni recursos 404.
  3. Repetir los casos de prioridad alta.
  4. Comprobar que ninguna pantalla usada muestra “En construcción”.
  5. Revisar que todos los enlaces relativos funcionan en GitHub Pages.
- **Resultado esperado:** Sin errores de consola, sin enlaces rotos, sin tarjetas de construcción en las pantallas de la demo y con los casos críticos aprobados.
- **Tipo:** Regresión / despliegue.
- **Resultado formal:** Pendiente.
- **Humo 26/10:** Parcial (sintaxis JavaScript validada; no se probó en navegador real ni en Pages).

---

## Resumen de ejecución

| Prioridad | Casos | Aprobados formalmente | Pendientes |
|---|---|---|---|
| Crítica | PRU-28 | 0 | 1 |
| Alta | PRU-01, 02, 04–11, 15–23, 25, 26, 29 | 0 | 22 |
| Media | PRU-03, 12–14, 24, 27 | 0 | 6 |

> Actualizar esta tabla al terminar la sesión del 29/10. No marcar un caso como aprobado sin evidencia.

## Evidencias

Guardar las capturas en una carpeta `evidencias/` fuera del repositorio público si contienen datos personales. Para el informe, usar solo capturas con datos ficticios. Nombrar los archivos `PRU-XX-descripcion.png`.
