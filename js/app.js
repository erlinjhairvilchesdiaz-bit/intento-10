/************************
 * ELEMENTOS
 ************************/
const listaCategorias = document.getElementById("listaCategorias");
const gridProductos = document.getElementById("gridProductos");

const pantallaProductos = document.getElementById("pantalla-productos");
const pantallaPersonalizar = document.getElementById("pantalla-personalizar");

const extrasDiv = document.getElementById("extras");
const mesaSelect = document.getElementById("mesa");
const cantidadSelect = document.getElementById("cantidad");


const iconosInventario = {
  fresas: "🍓",
  cafe: "☕",
  harina: "🌾",
  leche: "🥛",
  chocolate: "🍫",
  azucar: "🧂",
  mantequilla: "🧈",
  vainilla: "🌼",
  default: "📦"
};

let inventario = {
  cafe: { actual: 500, max: 1000,unidad:"g" },
  leche: { actual: 2000, max: 3000,unidad:"ml" },
  harina: { actual: 3000, max: 5000,unidad:"g" },
  chocolate: { actual: 1000, max: 2000,unidad:"g" },
  fresas: { actual: 600, max: 1000,unidad:"c/u" }

};


const guardado = localStorage.getItem("inventario");
if (guardado) inventario = JSON.parse(guardado);



/************************
 * ESTADO
 ************************/

let categoriaActiva = categorias[0];
let productoActual = null;

let ventasPorProducto = {};

let pedidosPendientes = [];
let pedidosCompletados = [];

/************************
 * INIT
 ************************/
init();

function init() {
  
  cargarVentas();
  recalcularVentasPorProducto();
  renderCategorias();
  renderProductos();
  cargarInventario();
}

/************************
 * CATEGORÍAS
 ************************/
function renderCategorias() {
  listaCategorias.innerHTML = "";

  categorias.forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat;
    if (cat === categoriaActiva) li.classList.add("active");

    li.onclick = () => {
      categoriaActiva = cat;
      renderCategorias();
      renderProductos();
    };

    listaCategorias.appendChild(li);
  });
}

/************************
 * PRODUCTOS
 ************************/
function renderProductos() {
  gridProductos.innerHTML = "";

  productos
    .filter(p => p.categoria === categoriaActiva)
    .forEach(p => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="img/productos/${p.imagen}">
        <div class="info">
          <h4>
            ${p.nombre}
            ${esTopProducto(p.nombre, p.categoria) ? "⭐" : ""}
          </h4>
          <p class="price">S/. ${p.precio.toFixed(2)}</p>
          <small>${p.descripcion}</small>
        </div>
      `;

      card.onclick = () => abrirPersonalizar(p);
      gridProductos.appendChild(card);
    });
}


/************************
 * PERSONALIZAR
 ************************/
function abrirPersonalizar(producto) {
  productoActual = producto;

  pantallaProductos.style.display = "none";
  pantallaPersonalizar.style.display = "flex";

  document.getElementById("pNombre").innerText = producto.nombre;
  document.getElementById("pPrecio").innerText = "S/ " + producto.precio.toFixed(2);
  document.getElementById("pImagen").src = "img/productos/" + producto.imagen;

  renderExtras(producto);
}

/************************
 * EXTRAS DINÁMICOS
 ************************/
function renderExtras(producto) {
  extrasDiv.innerHTML = "";

  if (!producto.extras) return;

  for (const tipo in producto.extras) {
    const label = document.createElement("label");
    label.innerText = tipo;

    const select = document.createElement("select");
    select.dataset.extra = tipo;

    producto.extras[tipo].forEach(op => {
      const option = document.createElement("option");
      option.value = op;
      option.innerText = op;
      select.appendChild(option);
    });

    extrasDiv.appendChild(label);
    extrasDiv.appendChild(select);
  }
}

/************************
 * AGREGAR PEDIDO
 ************************/
function agregar() {
  const extrasSeleccionados = {};

  document.querySelectorAll("#extras select").forEach(sel => {
    extrasSeleccionados[sel.dataset.extra] = sel.value;
  });

  const pedido = {
    id: Date.now(),
    mesa: mesaSelect.value,
    producto: productoActual.nombre,
    cantidad: Number(cantidadSelect.value),
    precio: productoActual.precio,
    extras: extrasSeleccionados,
    estado: "pendiente"
  };

  pedidosPendientes.push(pedido);

  mostrarNotificacion("✅ Pedido agregado");
  volver();
}

/************************
 * VOLVER
 ************************/
function volver() {
  pantallaPersonalizar.style.display = "none";
  pantallaProductos.style.display = "flex";
}

/************************
 * NOTIFICACIÓN
 ************************/
function mostrarNotificacion(texto) {
  const notif = document.createElement("div");
  notif.className = "notificacion";
  notif.innerText = texto;

  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2500);
}

/************************
 * MENÚ ☰
 ************************/
function toggleMenu() {
  document.getElementById("menuLateral").classList.toggle("oculto");
}

function mostrarVista(vista) {
  toggleMenu();

  if (vista === "inventario") {
    renderInventario();
  } else if (vista === "pedidos") {
    renderPedidosActivos();
  } else {
    mostrarEstadisticas();
  }
}




function completarPedido(index) {
  pedidosCompletados.push(pedidosPendientes[index]);
  pedidosPendientes.splice(index, 1);
  mostrarNotificacion("✔ Pedido completado");
}

/************************
 * INVENTARIO VISUAL
 ************************/
function renderInventario() {
  let html = "<h2>📦 Inventario</h2>";

  for (const item in inventario) {
    const actual = inventario[item].actual;
    const max = inventario[item].max;
    const porcentaje = (actual / max) * 100;

    const color =
      porcentaje < 30 ? "rojo" :
      porcentaje < 60 ? "amarillo" :
      "verde";

const icono = iconosInventario[item] || iconosInventario.default;

html += `
  <div class="inv-card">
    <div class="inv-header">
      <strong>${icono} ${item}</strong>
      <div class="inv-controls">
        <button onclick="modificarInventario('${item}', -10)">−</button>
        <button onclick="modificarInventario('${item}', 10)">+</button>
      </div>
    </div>

    <div class="barra ${color}">
      <div style="width:${porcentaje}%"></div>
    </div>

    <small>${actual} / ${max} ${inventario[item].unidad}</small>

  </div>
`;
alertaStockBajo(item, porcentaje);

  }

  mostrarOverlay(html);
}

function modificarInventario(producto, cambio) {
  if (!inventario[producto]) return;

  inventario[producto].actual += cambio;

  if (inventario[producto].actual < 0)
    inventario[producto].actual = 0;

  if (inventario[producto].actual > inventario[producto].max)
    inventario[producto].actual = inventario[producto].max;

  guardarInventario();
  renderInventario();
}


function guardarInventario() {
  localStorage.setItem("inventario", JSON.stringify(inventario));
}

function cargarInventario() {
  const data = localStorage.getItem("inventario");
  if (data) inventario = JSON.parse(data);
}

/************************
 * OVERLAY GENÉRICO (FIX X)
 ************************/
function mostrarOverlay(contenido) {
  let overlay = document.getElementById("overlay-app");

  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "overlay-app";
    overlay.className = "overlay";

    overlay.innerHTML = `
      <div class="overlay-content">
        <button class="cerrar-overlay" onclick="cerrarOverlay()">✖</button>
        <div id="overlay-body" class="overlay-body"></div>
      </div>
    `;

    document.body.appendChild(overlay);
  }

  document.getElementById("overlay-body").innerHTML = contenido;
}

function cerrarOverlay() {
  const overlay = document.getElementById("overlay-app");
  if (overlay) overlay.remove();
}




/************************
 * pedidos activos diseño
 ************************/

function renderPedidosActivos() {
  let html = "<h2>🔔 Pedidos activos</h2>";

  const mesas = {};

  pedidosPendientes.forEach(p => {
    if (!mesas[p.mesa]) mesas[p.mesa] = [];
    mesas[p.mesa].push(p);
  });

  for (const mesa in mesas) {
    let totalMesa = 0;

    mesas[mesa].forEach(p => {
      const prod = productos.find(x => x.nombre === p.producto);
      totalMesa += prod.precio * p.cantidad;
    });

    html += `
      <div class="mesa-card">
        <div class="mesa-header">
          <h3>🪑 Mesa ${mesa}</h3>
          <strong>S/. ${totalMesa.toFixed(2)}</strong>
        </div>
    `;

    mesas[mesa].forEach(p => {
      html += `
        <div class="pedido-item">
          <label>
            <input type="checkbox" onchange="completarProducto(${p.id})">
            ${p.producto} x${p.cantidad}
          </label>
        </div>
      `;
    });


    html += `
        <div class="mesa-actions">
          <button class="pagar" onclick="pagarMesa('${mesa}')">💰 Pagar mesa</button>
          <button class="cancelar" onclick="cancelarMesa('${mesa}')">❌ Cancelar</button>
        </div>
      </div>
    `;
  }

  mostrarOverlay(html);
}

/************************
 * LOGICA DE ACCIONES + descuento de inventario
 ************************/

function pagarMesa(mesa) {
  pedidosPendientes = pedidosPendientes.filter(p => {
    if (p.mesa === mesa) {
      p.fecha = new Date().toISOString().split("T")[0];
      pedidosCompletados.push(p);

      // ⭐ contar ventas
      ventasPorProducto[p.producto] =
        (ventasPorProducto[p.producto] || 0) + p.cantidad;

      // 📦 DESCONTAR INVENTARIO
      const prod = productos.find(x => x.nombre === p.producto);
      if (prod && prod.insumos) {
        for (const insumo in prod.insumos) {
          if (inventario[insumo]) {
            inventario[insumo].actual -= prod.insumos[insumo] * p.cantidad;

            if (inventario[insumo].actual < 0)
              inventario[insumo].actual = 0;
          }
        }
      }

      return false;
    }
    return true;
  });

  guardarInventario();
  guardarVentas();
  mostrarNotificacion("💰 Mesa pagada");
  renderPedidosActivos();
}



/************************
 * Producto Destacado
 ************************/
ventasPorProducto[pedido.producto] =
  (ventasPorProducto[pedido.producto] || 0) + pedido.cantidad;

function esTopProducto(nombre, categoria) {
  const productosCat = productos.filter(p => p.categoria === categoria);

  let top = null;
  let max = 0;

  productosCat.forEach(p => {
    const v = ventasPorProducto[p.nombre] || 0;
    if (v > max) {
      max = v;
      top = p.nombre;
    }
  });

  return top === nombre && max > 0;
}



/***********************
 * ESTADÍSTICAS
 ***********************/
function mostrarEstadisticas() {
  const hoy = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const mesActual = hoy.slice(0, 7); // YYYY-MM

  let totalDia = 0;
  let totalMes = 0;
  let ventasPorCategoria = {};

  pedidosCompletados.forEach(p => {
    const prod = productos.find(x => x.nombre === p.producto);
    if (!prod) return;

    const subtotal = prod.precio * p.cantidad;

    // TOTAL DÍA
    if (p.fecha === hoy) {
      totalDia += subtotal;

      if (!ventasPorCategoria[prod.categoria]) {
        ventasPorCategoria[prod.categoria] = 0;
      }
      ventasPorCategoria[prod.categoria] += subtotal;
    }

    // TOTAL MES
    if (p.fecha.startsWith(mesActual)) {
      totalMes += subtotal;
    }
  });

  // HTML por categoría (solo día)
  let categoriasHTML = "";
  for (const cat in ventasPorCategoria) {
    categoriasHTML += `
      <p>📂 ${cat}: <strong>S/. ${ventasPorCategoria[cat].toFixed(2)}</strong></p>
    `;
  }

  mostrarOverlay(`
    <h2>📊 Ventas</h2>

    <p><strong>Hoy:</strong> S/. ${totalDia.toFixed(2)}</p>
    <p><strong>Este mes:</strong> S/. ${totalMes.toFixed(2)}</p>

    <hr>
    <h3>📂 Ventas por categoría (hoy)</h3>
    ${categoriasHTML || "<p>Sin ventas hoy</p>"}

<div class="acciones-descarga">
  <button class="btn-descarga btn-hoy" onclick="exportarExcel('dia')">
    ⬇ Descargar HOY
  </button>

  <button class="btn-descarga btn-mes" onclick="exportarExcel('mes')">
    ⬇ Descargar MES
  </button>
</div>
  `);
}


function exportarExcel(tipo) {
  const hoy = new Date().toISOString().split("T")[0];
  const mes = hoy.slice(0, 7);

  let filas = [
    ["Fecha", "Mesa", "Producto", "Cantidad", "Categoría", "Total"]
  ];

  pedidosCompletados.forEach(p => {
    if (
      (tipo === "dia" && p.fecha !== hoy) ||
      (tipo === "mes" && !p.fecha.startsWith(mes))
    ) return;

    const prod = productos.find(x => x.nombre === p.producto);
    if (!prod) return;

    filas.push([
      p.fecha,
      p.mesa,
      p.producto,
      p.cantidad,
      prod.categoria,
      (prod.precio * p.cantidad).toFixed(2)
    ]);
  });

  const csv = filas.map(f => f.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `ventas_${tipo}_${hoy}.csv`;
  a.click();

  URL.revokeObjectURL(url);
}



/*===========localStorange================= */

function guardarVentas() {
  localStorage.setItem("ventas", JSON.stringify(pedidosCompletados));
}

function cargarVentas() {
  const data = localStorage.getItem("ventas");
  if (data) pedidosCompletados = JSON.parse(data);
}

/************************
 * COMPLETAR PRODUCTO (checkbox)
 ************************/
function completarProducto(id) {
  const index = pedidosPendientes.findIndex(p => p.id === id);
  if (index === -1) return;

  const pedido = pedidosPendientes.splice(index, 1)[0];

  // Fecha obligatoria para estadísticas
  pedido.fecha = new Date().toISOString().split("T")[0];

  pedidosCompletados.push(pedido);


  guardarVentas();
  renderPedidosActivos();
}

function recalcularVentasPorProducto() {
  ventasPorProducto = {};

  pedidosCompletados.forEach(p => {
    ventasPorProducto[p.producto] =
      (ventasPorProducto[p.producto] || 0) + p.cantidad;
  });
}

function alertaStockBajo(item, porcentaje) {
  const key = `alerta_${item}`;
  if (porcentaje < 20 && !localStorage.getItem(key)) {
    mostrarNotificacion(`⚠️ Stock bajo: ${item.toUpperCase()} (${Math.round(porcentaje)}%)`);
    localStorage.setItem(key, "mostrada");
  }

  if (porcentaje >= 20) {
    localStorage.removeItem(key);
  }
}

