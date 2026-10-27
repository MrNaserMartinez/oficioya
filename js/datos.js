/* =========================================================
   OficioYa Jutiapa — DATOS FICTICIOS INICIALES
   ---------------------------------------------------------
   Todos los nombres, teléfonos y correos son INVENTADOS.
   Estas colecciones corresponden a las entidades del
   modelo entidad-relación (mismos nombres de campos).
   Si cambian algo aquí, avisen al integrante de modelado.
   ========================================================= */

const DATOS_INICIALES = {

  /* ---------- Catálogos ---------- */
  roles: ["cliente", "prestador", "administrador", "soporte"],

  modalidades: ["Inmediata", "Programada", "Diagnóstico", "Por presupuesto"],

  zonas: [
    { id: "Z01", nombre: "Sector Centro" },
    { id: "Z02", nombre: "Sector Norte" },
    { id: "Z03", nombre: "Sector Sur" },
    { id: "Z04", nombre: "Sector Oriente" },
    { id: "Z05", nombre: "Sector Poniente" }
  ],

  oficios: [
    { id: "OF01", nombre: "Pinchazos",    modalidad: "Inmediata",       icono: "bi-bicycle",          activo: true },
    { id: "OF02", nombre: "Electricista", modalidad: "Diagnóstico",     icono: "bi-lightning-charge", activo: true },
    { id: "OF03", nombre: "Herrero",      modalidad: "Por presupuesto", icono: "bi-hammer",           activo: true }
  ],

  especialidades: [
    { id: "ES01", oficioId: "OF01", nombre: "Pinchazo de moto",        activo: true },
    { id: "ES02", oficioId: "OF01", nombre: "Pinchazo de carro",       activo: true },
    { id: "ES03", oficioId: "OF02", nombre: "Instalación residencial", activo: true },
    { id: "ES04", oficioId: "OF02", nombre: "Cortocircuitos y fallas", activo: true },
    { id: "ES05", oficioId: "OF03", nombre: "Portones y balcones",     activo: true },
    { id: "ES06", oficioId: "OF03", nombre: "Soldadura y reparación",  activo: true }
  ],

  /* ---------- Persona / Cuenta / Rol (se distinguen) ---------- */
  personas: [
    { id: "P01", nombres: "Ana Lucía",  apellidos: "Pérez Gómez",   telefono: "5000-0001" },
    { id: "P02", nombres: "Carlos",     apellidos: "Méndez Ruiz",   telefono: "5000-0002" },
    { id: "P03", nombres: "Rosa",       apellidos: "Ortiz Lemus",   telefono: "5000-0003" },
    { id: "P04", nombres: "José",       apellidos: "Ramírez Cano",  telefono: "5000-0004" },
    { id: "P05", nombres: "Luis",       apellidos: "Castillo Paz",  telefono: "5000-0005" },
    { id: "P06", nombres: "Marta",      apellidos: "Herrera Sol",   telefono: "5000-0006" },
    { id: "P07", nombres: "Admin",      apellidos: "OficioYa",      telefono: "5000-0007" },
    { id: "P08", nombres: "Soporte",    apellidos: "OficioYa",      telefono: "5000-0008" }
  ],

  /* Contraseñas en texto plano SOLO porque es un prototipo (SIMULADO). */
  cuentas: [
    { id: "C01", personaId: "P01", correo: "cliente@demo.com",     contrasena: "demo123", roles: ["cliente"],              estado: "Activa", fechaRegistro: "2026-10-01T10:00:00" },
    { id: "C02", personaId: "P02", correo: "electricista@demo.com", contrasena: "demo123", roles: ["prestador", "cliente"], estado: "Activa", fechaRegistro: "2026-10-02T10:00:00" },
    { id: "C03", personaId: "P03", correo: "pinchazos@demo.com",    contrasena: "demo123", roles: ["prestador"],            estado: "Activa", fechaRegistro: "2026-10-03T10:00:00" },
    { id: "C04", personaId: "P04", correo: "herrero@demo.com",      contrasena: "demo123", roles: ["prestador"],            estado: "Activa", fechaRegistro: "2026-10-04T10:00:00" },
    { id: "C05", personaId: "P05", correo: "electricista2@demo.com",contrasena: "demo123", roles: ["prestador"],            estado: "Activa", fechaRegistro: "2026-10-05T10:00:00" },
    { id: "C06", personaId: "P06", correo: "cliente2@demo.com",     contrasena: "demo123", roles: ["cliente"],              estado: "Activa", fechaRegistro: "2026-10-06T10:00:00" },
    { id: "C07", personaId: "P07", correo: "admin@demo.com",        contrasena: "admin123",roles: ["administrador"],        estado: "Activa", fechaRegistro: "2026-10-01T08:00:00" },
    { id: "C08", personaId: "P08", correo: "soporte@demo.com",      contrasena: "demo123", roles: ["soporte"],              estado: "Activa", fechaRegistro: "2026-10-01T08:00:00" }
  ],

  /* ---------- Perfil del prestador ---------- */
  /* verificacion.estado: "Pendiente" | "Verificado" | "Rechazado"
     verificacion.revisado: QUÉ se revisó (no es garantía de calidad). */
  prestadores: [
    {
      id: "PR01", cuentaId: "C02", oficios: ["OF02"], especialidades: ["ES03", "ES04"],
      experienciaAnios: 8, descripcion: "Electricista residencial. Reviso fallas y doy cotización después de la visita.",
      zonas: ["Z01", "Z02", "Z04"],
      disponibilidad: { dias: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"], horaInicio: "07:00", horaFin: "18:00", atiendeInmediato: false },
      costoVisita: 75,
      verificacion: { estado: "Verificado", revisado: ["Identidad (DPI) confirmada", "Teléfono confirmado"], fecha: "2026-10-03" }
    },
    {
      id: "PR02", cuentaId: "C03", oficios: ["OF01"], especialidades: ["ES01", "ES02"],
      experienciaAnios: 5, descripcion: "Reparo pinchazos a domicilio, motos y carros.",
      zonas: ["Z01", "Z03", "Z05"],
      disponibilidad: { dias: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"], horaInicio: "06:00", horaFin: "20:00", atiendeInmediato: true },
      costoVisita: 0,
      verificacion: { estado: "Verificado", revisado: ["Identidad (DPI) confirmada"], fecha: "2026-10-04" }
    },
    {
      id: "PR03", cuentaId: "C04", oficios: ["OF03"], especialidades: ["ES05", "ES06"],
      experienciaAnios: 12, descripcion: "Portones, balcones y estructuras. Trabajo por presupuesto.",
      zonas: ["Z01", "Z02", "Z03", "Z04", "Z05"],
      disponibilidad: { dias: ["Lun", "Mar", "Mié", "Jue", "Vie"], horaInicio: "08:00", horaFin: "17:00", atiendeInmediato: false },
      costoVisita: 0,
      verificacion: { estado: "Pendiente", revisado: [], fecha: null }
    },
    {
      id: "PR04", cuentaId: "C05", oficios: ["OF02"], especialidades: ["ES04"],
      experienciaAnios: 3, descripcion: "Atiendo cortocircuitos y revisiones de tablero.",
      zonas: ["Z03", "Z05"],
      disponibilidad: { dias: ["Sáb", "Dom"], horaInicio: "08:00", horaFin: "16:00", atiendeInmediato: false },
      costoVisita: 60,
      verificacion: { estado: "Pendiente", revisado: [], fecha: null }
    }
  ],

  /* ---------- Solicitudes ---------- */
  /* estado: ver OY.ESTADOS en estado.js */
  solicitudes: [
    {
      id: "SOL-0001", clienteId: "C01", prestadorId: "PR01", oficioId: "OF02", especialidadId: "ES04", modalidad: "Diagnóstico",
      descripcion: "Se va la luz al conectar la plancha.", zonaId: "Z01", direccionReferencia: "Frente al parque (dirección exacta oculta hasta confirmar)",
      horario: { tipo: "Programada", fecha: "2026-10-10", franja: "08:00-12:00" }, fotos: [],
      estado: "Finalizada", fechaCreacion: "2026-10-09T09:00:00", fechaLimite: "2026-10-09T21:00:00", claveEnvio: "seed-1"
    },
    {
      id: "SOL-0002", clienteId: "C01", prestadorId: "PR02", oficioId: "OF01", especialidadId: "ES01", modalidad: "Inmediata",
      descripcion: "Llanta trasera de moto ponchada.", zonaId: "Z03", direccionReferencia: "Cerca de la gasolinera",
      horario: { tipo: "Inmediata", fecha: "2026-10-15", franja: "Ahora" }, fotos: [],
      estado: "Finalizada", fechaCreacion: "2026-10-15T07:30:00", fechaLimite: "2026-10-15T08:00:00", claveEnvio: "seed-2"
    },
    {
      id: "SOL-0003", clienteId: "C06", prestadorId: "PR03", oficioId: "OF03", especialidadId: "ES05", modalidad: "Por presupuesto",
      descripcion: "Portón de 3 metros para cochera.", zonaId: "Z02", direccionReferencia: "Colonia del sector norte",
      horario: { tipo: "Programada", fecha: "2026-10-20", franja: "13:00-17:00" }, fotos: [],
      estado: "Cancelada", fechaCreacion: "2026-10-18T10:00:00", fechaLimite: "2026-10-19T10:00:00", claveEnvio: "seed-3"
    },
    {
      id: "SOL-0004", clienteId: "C06", prestadorId: "PR01", oficioId: "OF02", especialidadId: "ES03", modalidad: "Diagnóstico",
      descripcion: "Instalar tomacorrientes en cocina.", zonaId: "Z04", direccionReferencia: "Barrio del sector oriente",
      horario: { tipo: "Programada", fecha: "2026-10-28", franja: "08:00-12:00" }, fotos: [],
      estado: "Pendiente de aprobación", fechaCreacion: "2026-10-25T15:00:00", fechaLimite: "2026-10-29T15:00:00", claveEnvio: "seed-4"
    },
    {
      id: "SOL-0005", clienteId: "C01", prestadorId: "PR03", oficioId: "OF03", especialidadId: "ES06", modalidad: "Por presupuesto",
      descripcion: "Soldar reja de ventana.", zonaId: "Z01", direccionReferencia: "Centro",
      horario: { tipo: "Programada", fecha: "2026-10-30", franja: "08:00-12:00" }, fotos: [],
      estado: "Solicitada", fechaCreacion: "2026-10-26T08:00:00", fechaLimite: "2026-10-27T08:00:00", claveEnvio: "seed-5"
    }
  ],

  /* ---------- Cotizaciones (con detalle separado) ---------- */
  cotizaciones: [
    {
      id: "COT-0001", solicitudId: "SOL-0001", prestadorId: "PR01", tipoPrecio: "Definitivo", costoVisita: 75, vigenciaHoras: 48,
      detalles: [
        { tipo: "Mano de obra", descripcion: "Cambio de flipón y revisión de circuito", cantidad: 1, precioUnitario: 150 },
        { tipo: "Material",     descripcion: "Flipón 20A",                               cantidad: 1, precioUnitario: 65 }
      ],
      estado: "Aprobada", fecha: "2026-10-10T10:30:00"
    },
    {
      id: "COT-0002", solicitudId: "SOL-0002", prestadorId: "PR02", tipoPrecio: "Definitivo", costoVisita: 0, vigenciaHoras: 1,
      detalles: [ { tipo: "Mano de obra", descripcion: "Reparación de pinchazo a domicilio", cantidad: 1, precioUnitario: 40 } ],
      estado: "Aprobada", fecha: "2026-10-15T07:40:00"
    },
    {
      id: "COT-0003", solicitudId: "SOL-0004", prestadorId: "PR01", tipoPrecio: "Estimado", costoVisita: 75, vigenciaHoras: 72,
      detalles: [
        { tipo: "Mano de obra", descripcion: "Instalación de 3 tomacorrientes", cantidad: 3, precioUnitario: 60 },
        { tipo: "Material",     descripcion: "Tomacorriente doble",             cantidad: 3, precioUnitario: 25 },
        { tipo: "Cargo",        descripcion: "Traslado",                        cantidad: 1, precioUnitario: 20 }
      ],
      estado: "Enviada", fecha: "2026-10-26T09:00:00"
    }
  ],

  /* ---------- Historial de estados (auditoría) ---------- */
  historialEstados: [
    { id: "H001", solicitudId: "SOL-0001", estadoAnterior: null, estadoNuevo: "Solicitada", cuentaId: "C01", rol: "cliente", fecha: "2026-10-09T09:00:00", motivo: "" },
    { id: "H002", solicitudId: "SOL-0001", estadoAnterior: "Solicitada", estadoNuevo: "En evaluación", cuentaId: "C02", rol: "prestador", fecha: "2026-10-09T09:40:00", motivo: "" },
    { id: "H003", solicitudId: "SOL-0001", estadoAnterior: "En evaluación", estadoNuevo: "Pendiente de aprobación", cuentaId: "C02", rol: "prestador", fecha: "2026-10-10T10:30:00", motivo: "Cotización enviada" },
    { id: "H004", solicitudId: "SOL-0001", estadoAnterior: "Pendiente de aprobación", estadoNuevo: "Confirmada", cuentaId: "C01", rol: "cliente", fecha: "2026-10-10T11:00:00", motivo: "" },
    { id: "H005", solicitudId: "SOL-0001", estadoAnterior: "Confirmada", estadoNuevo: "En ejecución", cuentaId: "C02", rol: "prestador", fecha: "2026-10-10T11:15:00", motivo: "" },
    { id: "H006", solicitudId: "SOL-0001", estadoAnterior: "En ejecución", estadoNuevo: "Finalizada", cuentaId: "C02", rol: "prestador", fecha: "2026-10-10T12:30:00", motivo: "" },

    { id: "H007", solicitudId: "SOL-0002", estadoAnterior: null, estadoNuevo: "Solicitada", cuentaId: "C01", rol: "cliente", fecha: "2026-10-15T07:30:00", motivo: "" },
    { id: "H008", solicitudId: "SOL-0002", estadoAnterior: "Solicitada", estadoNuevo: "En evaluación", cuentaId: "C03", rol: "prestador", fecha: "2026-10-15T07:35:00", motivo: "" },
    { id: "H009", solicitudId: "SOL-0002", estadoAnterior: "En evaluación", estadoNuevo: "Pendiente de aprobación", cuentaId: "C03", rol: "prestador", fecha: "2026-10-15T07:40:00", motivo: "Cotización enviada" },
    { id: "H010", solicitudId: "SOL-0002", estadoAnterior: "Pendiente de aprobación", estadoNuevo: "Confirmada", cuentaId: "C01", rol: "cliente", fecha: "2026-10-15T07:42:00", motivo: "" },
    { id: "H011", solicitudId: "SOL-0002", estadoAnterior: "Confirmada", estadoNuevo: "En ejecución", cuentaId: "C03", rol: "prestador", fecha: "2026-10-15T08:00:00", motivo: "" },
    { id: "H012", solicitudId: "SOL-0002", estadoAnterior: "En ejecución", estadoNuevo: "Finalizada", cuentaId: "C03", rol: "prestador", fecha: "2026-10-15T08:20:00", motivo: "" },

    { id: "H013", solicitudId: "SOL-0003", estadoAnterior: null, estadoNuevo: "Solicitada", cuentaId: "C06", rol: "cliente", fecha: "2026-10-18T10:00:00", motivo: "" },
    { id: "H014", solicitudId: "SOL-0003", estadoAnterior: "Solicitada", estadoNuevo: "Cancelada", cuentaId: "C06", rol: "cliente", fecha: "2026-10-18T18:00:00", motivo: "Ya no lo necesito" },

    { id: "H015", solicitudId: "SOL-0004", estadoAnterior: null, estadoNuevo: "Solicitada", cuentaId: "C06", rol: "cliente", fecha: "2026-10-25T15:00:00", motivo: "" },
    { id: "H016", solicitudId: "SOL-0004", estadoAnterior: "Solicitada", estadoNuevo: "En evaluación", cuentaId: "C02", rol: "prestador", fecha: "2026-10-25T16:30:00", motivo: "" },
    { id: "H017", solicitudId: "SOL-0004", estadoAnterior: "En evaluación", estadoNuevo: "Pendiente de aprobación", cuentaId: "C02", rol: "prestador", fecha: "2026-10-26T09:00:00", motivo: "Cotización enviada" },

    { id: "H018", solicitudId: "SOL-0005", estadoAnterior: null, estadoNuevo: "Solicitada", cuentaId: "C01", rol: "cliente", fecha: "2026-10-26T08:00:00", motivo: "" }
  ],

  calificaciones: [
    { id: "CAL-0001", solicitudId: "SOL-0001", clienteId: "C01", prestadorId: "PR01", puntuacion: 5, comentario: "Puntual y explicó todo.", fecha: "2026-10-10T13:00:00" },
    { id: "CAL-0002", solicitudId: "SOL-0002", clienteId: "C01", prestadorId: "PR02", puntuacion: 4, comentario: "Llegó rápido.",           fecha: "2026-10-15T08:30:00" }
  ],

  reclamos: [
    { id: "REC-0001", solicitudId: "SOL-0002", cuentaId: "C01", motivo: "Cobro", descripcion: "Me cobraron Q5 más de lo cotizado.", evidencia: [], estado: "Resuelto", fecha: "2026-10-15T09:00:00", resolucion: "Se devolvió la diferencia." }
  ],

  /* RF10: comunicación vinculada a la solicitud */
  mensajes: [
    { id: "MSG-0001", solicitudId: "SOL-0004", cuentaId: "C02", texto: "Buenas, ¿los tomacorrientes son para la cocina?", fecha: "2026-10-25T16:35:00" },
    { id: "MSG-0002", solicitudId: "SOL-0004", cuentaId: "C06", texto: "Sí, tres a la par del lavatrastos.",              fecha: "2026-10-25T16:50:00" }
  ]
};
