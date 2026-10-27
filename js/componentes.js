/* =========================================================
   OficioYa Jutiapa — componentes.js
   Piezas visuales compartidas. Requiere datos.js y estado.js.
   Cada página debe tener:
     <body data-base="../">   ← "" en la raíz, "../" en subcarpetas
     <div id="navbar"></div>
   y al final llamar:  const u = UI.iniciarPagina({ roles: ["cliente"] });
   ========================================================= */

const UI = (function () {

  const ESTILO_ESTADO = {
    "Solicitada":              { icono: "bi-send",            clase: "estado-solicitada" },
    "En evaluación":           { icono: "bi-search",          clase: "estado-evaluacion" },
    "Pendiente de aprobación": { icono: "bi-hourglass-split", clase: "estado-pendiente" },
    "Confirmada":              { icono: "bi-check2-circle",   clase: "estado-confirmada" },
    "En ejecución":            { icono: "bi-tools",           clase: "estado-ejecucion" },
    "Finalizada":              { icono: "bi-check-all",       clase: "estado-finalizada" },
    "Rechazada":               { icono: "bi-x-circle",        clase: "estado-rechazada" },
    "Vencida":                 { icono: "bi-clock-history",   clase: "estado-vencida" },
    "Cancelada":               { icono: "bi-slash-circle",    clase: "estado-cancelada" }
  };

  const ETIQUETA_ROL = { cliente: "Cliente", prestador: "Prestador", administrador: "Administrador", soporte: "Soporte" };

  /** Evita que texto escrito por usuarios se interprete como HTML. Úsenlo SIEMPRE. */
  function escapar(texto) {
    return String(texto === null || texto === undefined ? "" : texto)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function base() { return document.body.dataset.base || ""; }

  /** Badge de estado: ícono + texto (no depende solo del color). */
  function badgeEstado(estado) {
    const e = ESTILO_ESTADO[estado] || { icono: "bi-question-circle", clase: "estado-vencida" };
    return `<span class="badge-estado ${e.clase}"><i class="bi ${e.icono}" aria-hidden="true"></i> ${escapar(estado)}</span>`;
  }

  /** Etiqueta para todo lo que se simula (mapa, pago, notificación, correo). */
  function etiquetaSimulado(texto) {
    return `<span class="etiqueta-simulado" title="Función simulada en el prototipo"><i class="bi bi-cone-striped" aria-hidden="true"></i> Simulado${texto ? ": " + escapar(texto) : ""}</span>`;
  }

  function estrellas(valor) {
    let html = `<span class="estrellas" aria-label="${valor} de 5 estrellas">`;
    for (let i = 1; i <= 5; i++) {
      html += `<i class="bi ${valor >= i ? "bi-star-fill" : (valor >= i - 0.5 ? "bi-star-half" : "bi-star")}" aria-hidden="true"></i>`;
    }
    return html + "</span>";
  }

  /** Muestra un mensaje dentro de un contenedor. tipo: success|danger|warning|info */
  function alerta(contenedorId, tipo, mensaje) {
    const c = document.getElementById(contenedorId);
    if (!c) return;
    const iconos = { success: "bi-check-circle", danger: "bi-exclamation-triangle", warning: "bi-exclamation-circle", info: "bi-info-circle" };
    c.innerHTML = `<div class="alert alert-${tipo} d-flex gap-2 align-items-start" role="alert">
      <i class="bi ${iconos[tipo] || iconos.info}" aria-hidden="true"></i><div>${escapar(mensaje)}</div></div>`;
  }

  /** Bloquea un botón mientras se procesa (evita doble clic / duplicados). */
  function bloquearBoton(boton, texto) {
    boton.dataset.textoOriginal = boton.innerHTML;
    boton.disabled = true;
    boton.innerHTML = `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> ${escapar(texto || "Procesando…")}`;
  }
  function liberarBoton(boton) {
    boton.disabled = false;
    if (boton.dataset.textoOriginal) boton.innerHTML = boton.dataset.textoOriginal;
  }

  function enlacesPorRol(rol) {
    const b = base();
    const menus = {
      cliente: [
        { texto: "Inicio", icono: "bi-house", url: "index.html" },
        { texto: "Buscar", icono: "bi-search", url: "cliente/busqueda.html" },
        { texto: "Mis solicitudes", icono: "bi-clock-history", url: "cliente/historial.html" }
      ],
      prestador: [
        { texto: "Mi bandeja", icono: "bi-inbox", url: "prestador/bandeja.html" }
      ],
      administrador: [
        { texto: "Panel", icono: "bi-speedometer2", url: "admin/index.html" }
      ],
      soporte: [
        { texto: "Reclamos", icono: "bi-life-preserver", url: "admin/index.html#reclamos" }
      ]
    };
    return (menus[rol] || []).map(m => ({ texto: m.texto, icono: m.icono, url: b + m.url }));
  }

  function renderNavbar(u) {
    const cont = document.getElementById("navbar");
    if (!cont) return;
    const b = base();
    const actual = window.location.pathname;

    let enlaces = "";
    let derecha = "";

    if (u && u.rol) {
      enlaces = enlacesPorRol(u.rol).map(e => {
        const activo = actual.endsWith(e.url.replace(b, "").split("#")[0]);
        return `<li class="nav-item"><a class="nav-link${activo ? " active" : ""}" ${activo ? 'aria-current="page"' : ""} href="${e.url}"><i class="bi ${e.icono}" aria-hidden="true"></i> ${e.texto}</a></li>`;
      }).join("");

      const otrosRoles = u.cuenta.roles.filter(r => r !== u.rol)
        .map(r => `<li><button class="dropdown-item" data-cambiar-rol="${r}"><i class="bi bi-arrow-left-right" aria-hidden="true"></i> Entrar como ${ETIQUETA_ROL[r]}</button></li>`).join("");

      derecha = `
        <div class="dropdown">
          <button class="btn btn-sm btn-light dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="bi bi-person-circle" aria-hidden="true"></i> ${escapar(u.persona.nombres)}
            <span class="badge text-bg-secondary ms-1">${ETIQUETA_ROL[u.rol]}</span>
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            ${otrosRoles}
            ${otrosRoles ? '<li><hr class="dropdown-divider"></li>' : ""}
            <li><button class="dropdown-item" id="btnReiniciarDemo"><i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i> Reiniciar datos de prueba</button></li>
            <li><button class="dropdown-item text-danger" id="btnCerrarSesion"><i class="bi bi-box-arrow-right" aria-hidden="true"></i> Cerrar sesión</button></li>
          </ul>
        </div>`;
    } else {
      derecha = `
        <a class="btn btn-sm btn-light" href="${b}acceso/login.html">Ingresar</a>
        <a class="btn btn-sm btn-acento ms-1" href="${b}acceso/registro.html">Registrarse</a>`;
    }

    cont.innerHTML = `
      <nav class="navbar navbar-expand-md navbar-dark barra-principal">
        <div class="container">
          <a class="navbar-brand fw-bold" href="${b}${u && u.rol ? OY.inicioPorRol(u.rol) : "index.html"}">
            <i class="bi bi-tools" aria-hidden="true"></i> OficioYa <small class="fw-normal opacity-75">Jutiapa</small>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menuPrincipal" aria-controls="menuPrincipal" aria-expanded="false" aria-label="Abrir menú">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="menuPrincipal">
            <ul class="navbar-nav me-auto">${enlaces}</ul>
            <div class="d-flex align-items-center py-2 py-md-0">${derecha}</div>
          </div>
        </div>
      </nav>
      <div id="avisoConexion" class="aviso-conexion d-none" role="status">
        <i class="bi bi-wifi-off" aria-hidden="true"></i> Sin conexión. Tus cambios se guardan en este dispositivo; revisa tu internet antes de enviar.
      </div>`;

    const btnSalir = document.getElementById("btnCerrarSesion");
    if (btnSalir) btnSalir.addEventListener("click", () => { OY.cerrarSesion(); window.location.href = b + "acceso/login.html"; });

    const btnReiniciar = document.getElementById("btnReiniciarDemo");
    if (btnReiniciar) btnReiniciar.addEventListener("click", () => {
      if (confirm("¿Volver a los datos de prueba originales? Se cerrará la sesión.")) {
        OY.reiniciarDatos(); window.location.href = b + "acceso/login.html";
      }
    });

    cont.querySelectorAll("[data-cambiar-rol]").forEach(btn => btn.addEventListener("click", () => {
      const rol = btn.dataset.cambiarRol;
      const r = OY.elegirRol(rol);
      if (r.ok) window.location.href = b + OY.inicioPorRol(rol);
    }));
  }

  function vigilarConexion() {
    const actualizar = () => {
      const aviso = document.getElementById("avisoConexion");
      if (aviso) aviso.classList.toggle("d-none", navigator.onLine);
    };
    window.addEventListener("online", actualizar);
    window.addEventListener("offline", actualizar);
    actualizar();
  }

  /** Llamar una vez por página. opciones.roles: roles permitidos
      (omitir para páginas públicas). Devuelve el usuario o null. */
  function iniciarPagina(opciones) {
    const o = opciones || {};
    OY.revisarVencimientos();
    let u = OY.usuarioActual();
    if (o.roles) {
      u = OY.requerirRol(o.roles);
      if (!u) return null;
    }
    renderNavbar(u);
    vigilarConexion();
    return u;
  }

  return { escapar, badgeEstado, etiquetaSimulado, estrellas, alerta, bloquearBoton, liberarBoton, iniciarPagina, ETIQUETA_ROL };
})();
