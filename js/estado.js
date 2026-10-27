/* =========================================================
   OficioYa Jutiapa — estado.js  (núcleo del monolito)
   ---------------------------------------------------------
   Todas las pantallas usan ESTAS funciones (objeto global OY).
   No guarden datos por su cuenta ni reescriban reglas aquí
   definidas: si necesitan algo nuevo, se lo piden a Naser.

   Convención de respuesta de las funciones que modifican datos:
     { ok: true,  dato: ... }     → todo bien
     { ok: false, error: "..." }  → mostrar el error al usuario

   Los datos se guardan en localStorage (simula la base de datos).
   ========================================================= */

const OY = (function () {

  const CLAVE_DB = "oficioya_db";
  const CLAVE_SESION = "oficioya_sesion";
  let memoria = null; // respaldo si localStorage no está disponible

  /* ---------------- Estados y reglas de transición ---------------- */

  const ESTADOS = [
    "Solicitada", "En evaluación", "Pendiente de aprobación",
    "Confirmada", "En ejecución", "Finalizada",
    "Rechazada", "Vencida", "Cancelada"
  ];

  const ESTADOS_FINALES = ["Finalizada", "Rechazada", "Vencida", "Cancelada"];

  /* estadoActual → { estadoNuevo: [roles que pueden hacerlo] }
     "sistema" = lo hace la plataforma automáticamente (vencimientos). */
  const TRANSICIONES = {
    "Solicitada":              { "En evaluación": ["prestador"], "Rechazada": ["prestador"], "Cancelada": ["cliente"], "Vencida": ["sistema"] },
    "En evaluación":           { "Pendiente de aprobación": ["prestador"], "Rechazada": ["prestador"], "Cancelada": ["cliente"] },
    "Pendiente de aprobación": { "Confirmada": ["cliente"], "Rechazada": ["cliente"], "Cancelada": ["cliente"], "Vencida": ["sistema"] },
    "Confirmada":              { "En ejecución": ["prestador"], "Cancelada": ["cliente", "prestador"] },
    "En ejecución":            { "Finalizada": ["prestador"] },
    "Finalizada": {}, "Rechazada": {}, "Vencida": {}, "Cancelada": {}
  };

  /* Tiempo para que una solicitud venza si nadie la atiende */
  const MINUTOS_VENCIMIENTO = { "Inmediata": 30, "Programada": 24 * 60, "Diagnóstico": 24 * 60, "Por presupuesto": 24 * 60 };

  /* ---------------- Utilidades ---------------- */

  function ahoraISO(fecha) {
    const d = fecha || new Date();
    const p = n => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }

  function sumarMinutos(iso, minutos) {
    return ahoraISO(new Date(new Date(iso).getTime() + minutos * 60000));
  }

  function copiar(obj) { return JSON.parse(JSON.stringify(obj)); }

  function generarId(prefijo, coleccion, digitos) {
    const n = (digitos === undefined) ? 4 : digitos;
    let max = 0;
    coleccion.forEach(x => {
      const num = parseInt(String(x.id).replace(/\D/g, ""), 10);
      if (!isNaN(num) && num > max) max = num;
    });
    return prefijo + String(max + 1).padStart(n, "0");
  }

  function formatoQ(monto) {
    return "Q " + Number(monto || 0).toFixed(2);
  }

  function formatoFecha(iso, conHora) {
    if (!iso) return "—";
    const d = new Date(iso);
    const opciones = { day: "2-digit", month: "short", year: "numeric" };
    if (conHora !== false) { opciones.hour = "2-digit"; opciones.minute = "2-digit"; }
    return d.toLocaleString("es-GT", opciones);
  }

  /* ---------------- "Base de datos" ---------------- */

  function leerStorage(clave) {
    try { return localStorage.getItem(clave); } catch (e) { return null; }
  }
  function escribirStorage(clave, valor) {
    try { localStorage.setItem(clave, valor); return true; } catch (e) { return false; }
  }
  function borrarStorage(clave) {
    try { localStorage.removeItem(clave); } catch (e) { /* sin storage */ }
  }

  function prepararDatosIniciales() {
    const datos = copiar(DATOS_INICIALES);
    datos.recuperaciones = [];
    /* Las solicitudes activas de ejemplo reciben un plazo nuevo
       (48 h desde hoy) para que no venzan antes de la demostración. */
    const limite = sumarMinutos(ahoraISO(), 48 * 60);
    datos.solicitudes.forEach(s => {
      if (s.estado === "Solicitada" || s.estado === "Pendiente de aprobación") s.fechaLimite = limite;
    });
    return datos;
  }

  function db() {
    if (memoria) return memoria;
    const guardado = leerStorage(CLAVE_DB);
    if (guardado) {
      try { memoria = JSON.parse(guardado); return memoria; } catch (e) { /* datos dañados */ }
    }
    memoria = prepararDatosIniciales();
    guardarDB();
    return memoria;
  }

  function guardarDB() {
    escribirStorage(CLAVE_DB, JSON.stringify(memoria));
  }

  /** Vuelve a los datos ficticios originales (útil antes de la demo). */
  function reiniciarDatos() {
    borrarStorage(CLAVE_DB);
    borrarStorage(CLAVE_SESION);
    memoria = null;
    db();
  }

  /* ---------------- Consultas generales ---------------- */

  function obtener(coleccion, id) {
    return db()[coleccion].find(x => x.id === id) || null;
  }

  function listar(coleccion, filtro) {
    const lista = db()[coleccion] || [];
    return filtro ? lista.filter(filtro) : lista.slice();
  }

  function nombreOficio(id) { const o = obtener("oficios", id); return o ? o.nombre : "—"; }
  function nombreEspecialidad(id) { const e = obtener("especialidades", id); return e ? e.nombre : "—"; }
  function nombreZona(id) { const z = obtener("zonas", id); return z ? z.nombre : "—"; }

  function personaDeCuenta(cuentaId) {
    const c = obtener("cuentas", cuentaId);
    return c ? obtener("personas", c.personaId) : null;
  }

  function nombreCompleto(cuentaId) {
    const p = personaDeCuenta(cuentaId);
    return p ? `${p.nombres} ${p.apellidos}` : "—";
  }

  function prestadorDeCuenta(cuentaId) {
    return db().prestadores.find(p => p.cuentaId === cuentaId) || null;
  }

  function nombrePrestador(prestadorId) {
    const pr = obtener("prestadores", prestadorId);
    return pr ? nombreCompleto(pr.cuentaId) : "—";
  }

  function calificacionPromedio(prestadorId) {
    const cals = db().calificaciones.filter(c => c.prestadorId === prestadorId);
    if (cals.length === 0) return { promedio: 0, total: 0 };
    const suma = cals.reduce((a, c) => a + c.puntuacion, 0);
    return { promedio: Math.round((suma / cals.length) * 10) / 10, total: cals.length };
  }

  /* ---------------- Sesión y roles ---------------- */

  function leerSesion() {
    const s = leerStorage(CLAVE_SESION);
    if (!s) return null;
    try { return JSON.parse(s); } catch (e) { return null; }
  }

  /** Paso 1 del login. Si la cuenta tiene un solo rol, entra directo. */
  function iniciarSesion(correo, contrasena) {
    const c = db().cuentas.find(x => x.correo.toLowerCase() === String(correo).trim().toLowerCase());
    if (!c || c.contrasena !== contrasena) return { ok: false, error: "Correo o contraseña incorrectos." };
    if (c.estado === "Suspendida") return { ok: false, error: "Tu cuenta está suspendida. Comunícate con soporte." };
    if (c.roles.length === 1) {
      escribirStorage(CLAVE_SESION, JSON.stringify({ cuentaId: c.id, rol: c.roles[0] }));
      return { ok: true, dato: { cuentaId: c.id, roles: c.roles, rol: c.roles[0] } };
    }
    escribirStorage(CLAVE_SESION, JSON.stringify({ cuentaId: c.id, rol: null }));
    return { ok: true, dato: { cuentaId: c.id, roles: c.roles, rol: null } };
  }

  /** Paso 2 del login cuando la persona tiene varios roles. */
  function elegirRol(rol) {
    const s = leerSesion();
    if (!s) return { ok: false, error: "No hay sesión iniciada." };
    const c = obtener("cuentas", s.cuentaId);
    if (!c || !c.roles.includes(rol)) return { ok: false, error: "Esta cuenta no tiene ese rol." };
    escribirStorage(CLAVE_SESION, JSON.stringify({ cuentaId: c.id, rol: rol }));
    return { ok: true, dato: rol };
  }

  /** Devuelve { cuenta, persona, rol, prestador } o null si no hay sesión. */
  function usuarioActual() {
    const s = leerSesion();
    if (!s) return null;
    const cuenta = obtener("cuentas", s.cuentaId);
    if (!cuenta || cuenta.estado === "Suspendida") return null;
    return {
      cuenta: cuenta,
      persona: obtener("personas", cuenta.personaId),
      rol: s.rol,
      prestador: prestadorDeCuenta(cuenta.id)
    };
  }

  function cerrarSesion() { borrarStorage(CLAVE_SESION); }

  /** Página de inicio según el rol (rutas relativas a la raíz). */
  function inicioPorRol(rol) {
    return {
      cliente: "index.html",
      prestador: "prestador/bandeja.html",
      administrador: "admin/index.html",
      soporte: "admin/index.html"
    }[rol] || "index.html";
  }

  /** Úsenla al inicio de cada pantalla protegida.
      roles: ["cliente"] etc. Redirige al login si no cumple. */
  function requerirRol(roles) {
    const u = usuarioActual();
    const base = document.body.dataset.base || "";
    if (!u || !u.rol) { window.location.href = base + "acceso/login.html"; return null; }
    if (roles && !roles.includes(u.rol)) { window.location.href = base + inicioPorRol(u.rol); return null; }
    return u;
  }

  /* ---------------- Registro y recuperación (RF01, RF02) ---------------- */

  function registrarCuenta(d) {
    const datos = db();
    const faltan = [];
    if (!d.nombres) faltan.push("nombres");
    if (!d.apellidos) faltan.push("apellidos");
    if (!d.telefono) faltan.push("teléfono");
    if (!d.correo) faltan.push("correo");
    if (!d.contrasena) faltan.push("contraseña");
    if (!["cliente", "prestador"].includes(d.rol)) faltan.push("tipo de cuenta");
    if (d.rol === "prestador") {
      if (!d.oficioId) faltan.push("oficio");
      if (!d.zonas || d.zonas.length === 0) faltan.push("zonas de cobertura");
    }
    if (faltan.length) return { ok: false, error: "Faltan datos: " + faltan.join(", ") + "." };
    if (!/^\S+@\S+\.\S+$/.test(d.correo)) return { ok: false, error: "El correo no tiene un formato válido." };
    if (d.contrasena.length < 6) return { ok: false, error: "La contraseña debe tener al menos 6 caracteres." };
    if (datos.cuentas.some(c => c.correo.toLowerCase() === d.correo.toLowerCase()))
      return { ok: false, error: "Ya existe una cuenta con ese correo." };

    const persona = { id: generarId("P", datos.personas, 2), nombres: d.nombres.trim(), apellidos: d.apellidos.trim(), telefono: d.telefono.trim() };
    const cuenta = {
      id: generarId("C", datos.cuentas, 2), personaId: persona.id, correo: d.correo.trim(),
      contrasena: d.contrasena, roles: [d.rol], estado: "Activa", fechaRegistro: ahoraISO()
    };
    datos.personas.push(persona);
    datos.cuentas.push(cuenta);

    if (d.rol === "prestador") {
      datos.prestadores.push({
        id: generarId("PR", datos.prestadores, 2), cuentaId: cuenta.id,
        oficios: [d.oficioId], especialidades: [],
        experienciaAnios: Number(d.experienciaAnios) || 0, descripcion: d.descripcion || "",
        zonas: d.zonas,
        disponibilidad: { dias: ["Lun", "Mar", "Mié", "Jue", "Vie"], horaInicio: "08:00", horaFin: "17:00", atiendeInmediato: false },
        costoVisita: 0,
        verificacion: { estado: "Pendiente", revisado: [], fecha: null }
      });
    }
    guardarDB();
    return { ok: true, dato: cuenta };
  }

  /** SIMULADO: en un sistema real el código llegaría por correo o SMS. */
  function solicitarRecuperacion(correo) {
    const datos = db();
    const c = datos.cuentas.find(x => x.correo.toLowerCase() === String(correo).trim().toLowerCase());
    /* Por privacidad no se revela si el correo existe: se responde igual. */
    if (!c) return { ok: true, dato: { codigo: null } };
    const codigo = String(Math.floor(100000 + Math.random() * 900000));
    datos.recuperaciones = (datos.recuperaciones || []).filter(r => r.cuentaId !== c.id);
    datos.recuperaciones.push({ cuentaId: c.id, codigo: codigo, vence: sumarMinutos(ahoraISO(), 15) });
    guardarDB();
    return { ok: true, dato: { codigo: codigo } };
  }

  function restablecerContrasena(correo, codigo, nueva) {
    const datos = db();
    const c = datos.cuentas.find(x => x.correo.toLowerCase() === String(correo).trim().toLowerCase());
    const r = c && (datos.recuperaciones || []).find(x => x.cuentaId === c.id);
    if (!r || r.codigo !== String(codigo).trim()) return { ok: false, error: "El código no es válido." };
    if (new Date(r.vence) < new Date()) return { ok: false, error: "El código venció. Solicita uno nuevo." };
    if (!nueva || nueva.length < 6) return { ok: false, error: "La contraseña debe tener al menos 6 caracteres." };
    c.contrasena = nueva;
    datos.recuperaciones = datos.recuperaciones.filter(x => x.cuentaId !== c.id);
    guardarDB();
    return { ok: true, dato: true };
  }

  /* ---------------- Búsqueda (RF04, RF05) ---------------- */

  const DIAS = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  function estaDisponibleAhora(prestador) {
    const d = prestador.disponibilidad;
    const ahora = new Date();
    const hora = ahoraISO(ahora).substring(11, 16);
    return d.atiendeInmediato && d.dias.includes(DIAS[ahora.getDay()]) && hora >= d.horaInicio && hora <= d.horaFin;
  }

  /** filtros: { oficioId, zonaId, disponibleAhora, soloVerificados }
      Devuelve prestadores con datos listos para mostrar. */
  function buscarPrestadores(filtros) {
    const f = filtros || {};
    const datos = db();
    return datos.prestadores
      .filter(p => {
        const cuenta = obtener("cuentas", p.cuentaId);
        if (!cuenta || cuenta.estado !== "Activa") return false;
        if (p.verificacion.estado === "Rechazado") return false;
        if (!p.oficios.some(o => { const of = obtener("oficios", o); return of && of.activo; })) return false;
        if (f.oficioId && !p.oficios.includes(f.oficioId)) return false;
        if (f.zonaId && !p.zonas.includes(f.zonaId)) return false;
        if (f.disponibleAhora && !estaDisponibleAhora(p)) return false;
        if (f.soloVerificados && p.verificacion.estado !== "Verificado") return false;
        return true;
      })
      .map(p => Object.assign({}, p, {
        nombre: nombreCompleto(p.cuentaId),
        calificacion: calificacionPromedio(p.id),
        disponibleAhora: estaDisponibleAhora(p)
      }));
  }

  /* ---------------- Solicitudes (RF06, RF07, RF09) ---------------- */

  function registrarHistorial(solicitudId, anterior, nuevo, cuentaId, rol, motivo) {
    const datos = db();
    datos.historialEstados.push({
      id: generarId("H", datos.historialEstados, 3), solicitudId: solicitudId,
      estadoAnterior: anterior, estadoNuevo: nuevo, cuentaId: cuentaId, rol: rol,
      fecha: ahoraISO(), motivo: motivo || ""
    });
  }

  /** datos: { prestadorId, oficioId, especialidadId, descripcion, zonaId,
               direccionReferencia, horario: {tipo, fecha, franja}, fotos }
      claveEnvio: un valor único generado al ABRIR el formulario
      (ej. OY.nuevaClaveEnvio()). Si el usuario reintenta y llega la
      misma clave, no se duplica la solicitud. */
  function crearSolicitud(d, claveEnvio) {
    const u = usuarioActual();
    if (!u || u.rol !== "cliente") return { ok: false, error: "Debes iniciar sesión como cliente." };
    const datos = db();

    if (claveEnvio) {
      const existente = datos.solicitudes.find(s => s.clienteId === u.cuenta.id && s.claveEnvio === claveEnvio);
      if (existente) return { ok: true, dato: existente, duplicada: true };
    }

    const faltan = [];
    if (!d.prestadorId) faltan.push("prestador");
    if (!d.oficioId) faltan.push("oficio");
    if (!d.descripcion || d.descripcion.trim().length < 10) faltan.push("descripción (mínimo 10 caracteres)");
    if (!d.zonaId) faltan.push("zona");
    if (!d.horario || !d.horario.tipo) faltan.push("horario");
    if (d.horario && d.horario.tipo === "Programada" && (!d.horario.fecha || !d.horario.franja)) faltan.push("fecha y franja horaria");
    if (faltan.length) return { ok: false, error: "Faltan datos: " + faltan.join(", ") + "." };

    const pr = obtener("prestadores", d.prestadorId);
    if (!pr) return { ok: false, error: "El prestador no existe." };
    if (!pr.oficios.includes(d.oficioId)) return { ok: false, error: "Ese prestador no ofrece el oficio elegido." };
    if (!pr.zonas.includes(d.zonaId)) return { ok: false, error: "Ese prestador no atiende en tu zona." };
    if (pr.cuentaId === u.cuenta.id) return { ok: false, error: "No puedes contratarte a ti mismo." };

    const oficio = obtener("oficios", d.oficioId);
    const modalidad = (d.horario.tipo === "Inmediata") ? "Inmediata" : oficio.modalidad;
    const ahora = ahoraISO();

    const solicitud = {
      id: generarId("SOL-", datos.solicitudes),
      clienteId: u.cuenta.id, prestadorId: d.prestadorId,
      oficioId: d.oficioId, especialidadId: d.especialidadId || null, modalidad: modalidad,
      descripcion: d.descripcion.trim(), zonaId: d.zonaId,
      direccionReferencia: d.direccionReferencia || "",
      horario: d.horario, fotos: d.fotos || [],
      estado: "Solicitada", fechaCreacion: ahora,
      fechaLimite: sumarMinutos(ahora, MINUTOS_VENCIMIENTO[modalidad] || 1440),
      claveEnvio: claveEnvio || null
    };
    datos.solicitudes.push(solicitud);
    registrarHistorial(solicitud.id, null, "Solicitada", u.cuenta.id, "cliente", "");
    guardarDB();
    return { ok: true, dato: solicitud };
  }

  function nuevaClaveEnvio() {
    return "k" + Date.now() + Math.random().toString(36).slice(2, 8);
  }

  /** ¿La persona en sesión participa en esta solicitud con ese rol? */
  function participa(solicitud, u) {
    if (u.rol === "cliente") return solicitud.clienteId === u.cuenta.id;
    if (u.rol === "prestador") return u.prestador && solicitud.prestadorId === u.prestador.id;
    return false;
  }

  /** Transiciones permitidas para la persona en sesión. Útil para
      mostrar solo los botones que corresponden. */
  function accionesPermitidas(solicitudId) {
    const u = usuarioActual();
    const s = obtener("solicitudes", solicitudId);
    if (!u || !s || !participa(s, u)) return [];
    const opciones = TRANSICIONES[s.estado] || {};
    return Object.keys(opciones).filter(e => opciones[e].includes(u.rol));
  }

  /** Cambia el estado validando reglas, permisos y agenda. */
  function cambiarEstado(solicitudId, nuevoEstado, motivo, esSistema) {
    const datos = db();
    const s = obtener("solicitudes", solicitudId);
    if (!s) return { ok: false, error: "La solicitud no existe." };

    let rol = "sistema", cuentaId = null;
    if (!esSistema) {
      const u = usuarioActual();
      if (!u) return { ok: false, error: "Debes iniciar sesión." };
      if (!participa(s, u)) return { ok: false, error: "No tienes permiso sobre esta solicitud." };
      rol = u.rol; cuentaId = u.cuenta.id;
    }

    const permitidos = (TRANSICIONES[s.estado] || {})[nuevoEstado];
    if (!permitidos) return { ok: false, error: `No se puede pasar de "${s.estado}" a "${nuevoEstado}".` };
    if (!permitidos.includes(rol)) return { ok: false, error: `El rol ${rol} no puede cambiar a "${nuevoEstado}".` };
    if ((nuevoEstado === "Cancelada" || nuevoEstado === "Rechazada") && !esSistema && !motivo)
      return { ok: false, error: "Indica el motivo." };

    /* Regla de agenda: un prestador no puede tener dos servicios
       confirmados en la misma fecha y franja. */
    if (nuevoEstado === "Confirmada" && s.horario.tipo === "Programada") {
      const choque = datos.solicitudes.find(o =>
        o.id !== s.id && o.prestadorId === s.prestadorId &&
        ["Confirmada", "En ejecución"].includes(o.estado) &&
        o.horario.fecha === s.horario.fecha && o.horario.franja === s.horario.franja);
      if (choque) return { ok: false, error: "El prestador ya tiene un servicio confirmado en esa fecha y franja." };
    }

    const anterior = s.estado;
    s.estado = nuevoEstado;
    registrarHistorial(s.id, anterior, nuevoEstado, cuentaId, rol, motivo);
    guardarDB();
    return { ok: true, dato: s };
  }

  /** Marca como "Vencida" lo que pasó su fecha límite.
      Se llama sola al cargar cada página (ver componentes.js). */
  function revisarVencimientos() {
    const ahora = new Date();
    db().solicitudes
      .filter(s => (s.estado === "Solicitada" || s.estado === "Pendiente de aprobación") && s.fechaLimite && new Date(s.fechaLimite) < ahora)
      .forEach(s => {
        if (s.estado === "Pendiente de aprobación") {
          const cot = cotizacionDeSolicitud(s.id);
          if (cot && cot.estado === "Enviada") cot.estado = "Vencida";
        }
        cambiarEstado(s.id, "Vencida", "Plazo de respuesta agotado", true);
      });
  }

  function historialDe(solicitudId) {
    return db().historialEstados.filter(h => h.solicitudId === solicitudId)
      .sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  function solicitudesDelUsuario() {
    const u = usuarioActual();
    if (!u) return [];
    return db().solicitudes.filter(s => participa(s, u))
      .sort((a, b) => b.fechaCreacion.localeCompare(a.fechaCreacion));
  }

  /* ---------------- Cotizaciones (RF08) ---------------- */

  function cotizacionDeSolicitud(solicitudId) {
    const lista = db().cotizaciones.filter(c => c.solicitudId === solicitudId);
    return lista.length ? lista[lista.length - 1] : null; // la más reciente
  }

  function totalesCotizacion(cot) {
    const suma = tipo => cot.detalles.filter(d => d.tipo === tipo)
      .reduce((a, d) => a + Number(d.cantidad) * Number(d.precioUnitario), 0);
    const manoObra = suma("Mano de obra"), materiales = suma("Material"), cargos = suma("Cargo");
    const visita = Number(cot.costoVisita) || 0;
    return { manoObra, materiales, cargos, visita, total: manoObra + materiales + cargos + visita };
  }

  /** cot: { detalles:[{tipo, descripcion, cantidad, precioUnitario}],
             costoVisita, tipoPrecio: "Estimado"|"Definitivo", vigenciaHoras } */
  function guardarCotizacion(solicitudId, cot) {
    const u = usuarioActual();
    const s = obtener("solicitudes", solicitudId);
    if (!u || u.rol !== "prestador") return { ok: false, error: "Solo el prestador puede cotizar." };
    if (!s || !participa(s, u)) return { ok: false, error: "No tienes permiso sobre esta solicitud." };
    if (s.estado !== "En evaluación") return { ok: false, error: "Solo se cotiza una solicitud en evaluación." };
    if (!cot.detalles || cot.detalles.length === 0) return { ok: false, error: "Agrega al menos un rubro." };
    const malo = cot.detalles.find(d => !d.descripcion || !(Number(d.cantidad) > 0) || !(Number(d.precioUnitario) >= 0) ||
      !["Mano de obra", "Material", "Cargo"].includes(d.tipo));
    if (malo) return { ok: false, error: "Revisa los rubros: cada uno necesita tipo, descripción, cantidad y precio." };

    const datos = db();
    const nueva = {
      id: generarId("COT-", datos.cotizaciones), solicitudId: s.id, prestadorId: s.prestadorId,
      tipoPrecio: cot.tipoPrecio || "Estimado", costoVisita: Number(cot.costoVisita) || 0,
      vigenciaHoras: Number(cot.vigenciaHoras) || 48,
      detalles: cot.detalles.map(d => ({ tipo: d.tipo, descripcion: d.descripcion, cantidad: Number(d.cantidad), precioUnitario: Number(d.precioUnitario) })),
      estado: "Enviada", fecha: ahoraISO()
    };
    datos.cotizaciones.push(nueva);
    const r = cambiarEstado(s.id, "Pendiente de aprobación", "Cotización enviada");
    if (!r.ok) { datos.cotizaciones.pop(); return r; }
    s.fechaLimite = sumarMinutos(ahoraISO(), nueva.vigenciaHoras * 60);
    guardarDB();
    return { ok: true, dato: nueva };
  }

  function aprobarCotizacion(solicitudId) {
    const cot = cotizacionDeSolicitud(solicitudId);
    if (!cot || cot.estado !== "Enviada") return { ok: false, error: "No hay una cotización pendiente." };
    const r = cambiarEstado(solicitudId, "Confirmada", "Cotización aprobada");
    if (!r.ok) return r;
    cot.estado = "Aprobada"; guardarDB();
    return { ok: true, dato: cot };
  }

  function rechazarCotizacion(solicitudId, motivo) {
    const cot = cotizacionDeSolicitud(solicitudId);
    if (!cot || cot.estado !== "Enviada") return { ok: false, error: "No hay una cotización pendiente." };
    const r = cambiarEstado(solicitudId, "Rechazada", motivo || "");
    if (!r.ok) return r;
    cot.estado = "Rechazada"; guardarDB();
    return { ok: true, dato: cot };
  }

  /* ---------------- Calificaciones y reclamos (RF11, RF12) ---------------- */

  function puedeCalificar(solicitudId) {
    const u = usuarioActual();
    const s = obtener("solicitudes", solicitudId);
    if (!u || u.rol !== "cliente" || !s || s.clienteId !== u.cuenta.id) return false;
    if (s.estado !== "Finalizada") return false;
    return !db().calificaciones.some(c => c.solicitudId === solicitudId);
  }

  function calificar(solicitudId, puntuacion, comentario) {
    const s = obtener("solicitudes", solicitudId);
    if (!puedeCalificar(solicitudId))
      return { ok: false, error: "Solo puedes calificar servicios finalizados, una vez." };
    const p = Number(puntuacion);
    if (!(p >= 1 && p <= 5)) return { ok: false, error: "Elige de 1 a 5 estrellas." };
    const datos = db();
    const cal = {
      id: generarId("CAL-", datos.calificaciones), solicitudId: s.id, clienteId: s.clienteId,
      prestadorId: s.prestadorId, puntuacion: p, comentario: (comentario || "").trim(), fecha: ahoraISO()
    };
    datos.calificaciones.push(cal); guardarDB();
    return { ok: true, dato: cal };
  }

  function crearReclamo(solicitudId, motivo, descripcion, evidencia) {
    const u = usuarioActual();
    const s = obtener("solicitudes", solicitudId);
    if (!u || !s || !participa(s, u)) return { ok: false, error: "No tienes permiso sobre esta solicitud." };
    if (s.estado === "Solicitada") return { ok: false, error: "Aún no hay servicio sobre el cual reclamar; puedes cancelar la solicitud." };
    if (!motivo || !descripcion || descripcion.trim().length < 10) return { ok: false, error: "Indica el motivo y describe el problema (mínimo 10 caracteres)." };
    const datos = db();
    const rec = {
      id: generarId("REC-", datos.reclamos), solicitudId: s.id, cuentaId: u.cuenta.id,
      motivo: motivo, descripcion: descripcion.trim(), evidencia: evidencia || [],
      estado: "Abierto", fecha: ahoraISO(), resolucion: ""
    };
    datos.reclamos.push(rec); guardarDB();
    return { ok: true, dato: rec };
  }

  /* ---------------- Mensajes (RF10) ---------------- */

  function enviarMensaje(solicitudId, texto) {
    const u = usuarioActual();
    const s = obtener("solicitudes", solicitudId);
    if (!u || !s || !participa(s, u)) return { ok: false, error: "No tienes permiso sobre esta solicitud." };
    if (!texto || !texto.trim()) return { ok: false, error: "Escribe un mensaje." };
    const datos = db();
    const m = { id: generarId("MSG-", datos.mensajes), solicitudId: s.id, cuentaId: u.cuenta.id, texto: texto.trim(), fecha: ahoraISO() };
    datos.mensajes.push(m); guardarDB();
    return { ok: true, dato: m };
  }

  function mensajesDe(solicitudId) {
    return db().mensajes.filter(m => m.solicitudId === solicitudId).sort((a, b) => a.fecha.localeCompare(b.fecha));
  }

  /* ---------------- Administración (RF03, RF14) ---------------- */

  function esAdmin() { const u = usuarioActual(); return u && u.rol === "administrador"; }
  const SIN_PERMISO = { ok: false, error: "Solo el administrador puede hacer esto." };

  function crearOficio(nombre, modalidad, icono) {
    if (!esAdmin()) return SIN_PERMISO;
    const datos = db();
    if (!nombre || !nombre.trim()) return { ok: false, error: "Escribe el nombre del oficio." };
    if (!datos.modalidades.includes(modalidad)) return { ok: false, error: "Elige una modalidad válida." };
    if (datos.oficios.some(o => o.nombre.toLowerCase() === nombre.trim().toLowerCase())) return { ok: false, error: "Ese oficio ya existe." };
    const o = { id: generarId("OF", datos.oficios, 2), nombre: nombre.trim(), modalidad: modalidad, icono: icono || "bi-tools", activo: true };
    datos.oficios.push(o); guardarDB();
    return { ok: true, dato: o };
  }

  function crearEspecialidad(oficioId, nombre) {
    if (!esAdmin()) return SIN_PERMISO;
    const datos = db();
    if (!obtener("oficios", oficioId)) return { ok: false, error: "Elige un oficio." };
    if (!nombre || !nombre.trim()) return { ok: false, error: "Escribe el nombre de la especialidad." };
    const e = { id: generarId("ES", datos.especialidades, 2), oficioId: oficioId, nombre: nombre.trim(), activo: true };
    datos.especialidades.push(e); guardarDB();
    return { ok: true, dato: e };
  }

  /** coleccion: "oficios" | "especialidades" */
  function alternarActivo(coleccion, id) {
    if (!esAdmin()) return SIN_PERMISO;
    const x = obtener(coleccion, id);
    if (!x) return { ok: false, error: "No existe." };
    x.activo = !x.activo; guardarDB();
    return { ok: true, dato: x };
  }

  function cambiarEstadoCuenta(cuentaId, estado) {
    if (!esAdmin()) return SIN_PERMISO;
    const c = obtener("cuentas", cuentaId);
    if (!c) return { ok: false, error: "La cuenta no existe." };
    if (c.id === usuarioActual().cuenta.id) return { ok: false, error: "No puedes suspender tu propia cuenta." };
    if (!["Activa", "Suspendida"].includes(estado)) return { ok: false, error: "Estado no válido." };
    c.estado = estado; guardarDB();
    return { ok: true, dato: c };
  }

  /** estado: "Verificado" | "Rechazado" | "Pendiente"
      revisado: lista de lo que se comprobó (obligatoria si es Verificado). */
  function verificarPrestador(prestadorId, estado, revisado) {
    if (!esAdmin()) return SIN_PERMISO;
    const p = obtener("prestadores", prestadorId);
    if (!p) return { ok: false, error: "El prestador no existe." };
    if (estado === "Verificado" && (!revisado || revisado.length === 0))
      return { ok: false, error: "Indica qué se revisó para poder marcarlo como verificado." };
    p.verificacion = { estado: estado, revisado: estado === "Verificado" ? revisado : [], fecha: ahoraISO().substring(0, 10) };
    guardarDB();
    return { ok: true, dato: p };
  }

  /** Soporte o administrador atienden reclamos.
      estado: "En revisión" | "Resuelto" (resolución obligatoria al resolver). */
  function atenderReclamo(reclamoId, estado, resolucion) {
    const u = usuarioActual();
    if (!u || !["soporte", "administrador"].includes(u.rol)) return { ok: false, error: "Solo soporte o administración atienden reclamos." };
    const r = obtener("reclamos", reclamoId);
    if (!r) return { ok: false, error: "El reclamo no existe." };
    if (!["En revisión", "Resuelto"].includes(estado)) return { ok: false, error: "Estado no válido." };
    if (estado === "Resuelto" && (!resolucion || !resolucion.trim())) return { ok: false, error: "Describe cómo se resolvió." };
    r.estado = estado;
    if (resolucion) r.resolucion = resolucion.trim();
    r.atendidoPor = u.cuenta.id;
    guardarDB();
    return { ok: true, dato: r };
  }

  /** Indicadores de la sección 12 del enunciado (con su fórmula). */
  function indicadores() {
    const datos = db();
    const sols = datos.solicitudes;
    const total = sols.length;
    const cuenta = e => sols.filter(s => s.estado === e).length;
    const porEstado = {};
    ESTADOS.forEach(e => { porEstado[e] = cuenta(e); });

    const tiempos = [];
    sols.forEach(s => {
      const h = datos.historialEstados.filter(x => x.solicitudId === s.id);
      const ini = h.find(x => x.estadoNuevo === "Solicitada");
      const acep = h.find(x => x.estadoNuevo === "En evaluación");
      if (ini && acep) tiempos.push((new Date(acep.fecha) - new Date(ini.fecha)) / 60000);
    });

    const pct = (a, b) => b ? Math.round((a / b) * 1000) / 10 : 0;
    const finalizadas = porEstado["Finalizada"];
    return {
      total: total,
      porEstado: porEstado,
      tasaAtencion: pct(finalizadas, total),                  // Finalizadas / Total × 100
      tasaCancelacion: pct(porEstado["Cancelada"], total),    // Canceladas / Total × 100
      tiempoPromedioAceptacionMin: tiempos.length ? Math.round(tiempos.reduce((a, b) => a + b, 0) / tiempos.length) : 0,
      reclamos: datos.reclamos.length,
      reclamosAbiertos: datos.reclamos.filter(r => r.estado !== "Resuelto").length,
      reclamosPor100: pct(datos.reclamos.length, finalizadas) // Reclamos / Finalizadas × 100
    };
  }

  /* ---------------- API pública ---------------- */
  return {
    ESTADOS, ESTADOS_FINALES, TRANSICIONES,
    // utilidades
    ahoraISO, formatoQ, formatoFecha, reiniciarDatos,
    obtener, listar, nombreOficio, nombreEspecialidad, nombreZona,
    nombreCompleto, nombrePrestador, personaDeCuenta, prestadorDeCuenta, calificacionPromedio,
    // sesión
    iniciarSesion, elegirRol, usuarioActual, cerrarSesion, requerirRol, inicioPorRol,
    registrarCuenta, solicitarRecuperacion, restablecerContrasena,
    // búsqueda y solicitudes
    buscarPrestadores, estaDisponibleAhora,
    crearSolicitud, nuevaClaveEnvio, cambiarEstado, accionesPermitidas,
    revisarVencimientos, historialDe, solicitudesDelUsuario,
    // cotizaciones
    cotizacionDeSolicitud, totalesCotizacion, guardarCotizacion, aprobarCotizacion, rechazarCotizacion,
    // cierre
    puedeCalificar, calificar, crearReclamo, enviarMensaje, mensajesDe,
    // admin
    crearOficio, crearEspecialidad, alternarActivo, cambiarEstadoCuenta, verificarPrestador, atenderReclamo, indicadores
  };
})();
