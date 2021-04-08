const botonIngresos = document.querySelector(".ingresos");
const botonGastos = document.querySelector(".gastos");
const botonTodas = document.querySelector(".todas");
const botonFactura = document.querySelector(".factura");
const inputIdFactura = document.querySelector(".id-factura");
const selectOrden = document.querySelector(".orden");
const selectAbonadas = document.querySelector(".abonadas");
const selectVencidas = document.querySelector(".vencidas");
const inputElemPagina = document.querySelector(".elementos-pagina");
const inputPagina = document.querySelector(".n-pagina");
const formNuevaFactura = document.querySelector("form.nueva-factura");
const formBorrarFactura = document.querySelector("form.borrar-factura");
const formModificarFactura = document.querySelector("form.modificar-factura");
const navegacion = document.querySelector(".navegacion");
const links = navegacion.querySelectorAll("a");
const radioTipo = document.querySelectorAll(".tipo");
const secciones = document.querySelectorAll(".pagina");
const consola = document.querySelector(".datos");
const puerto = 5000;

const urlAPI = `http://localhost:${puerto}/facturas/`;

const getURLListado = (tipo, queryString = true) => {
  let urlBase = urlAPI;
  urlBase = `${urlBase}${tipo}`;
  if (queryString) {
    urlBase += getQuery();
  }
  return urlBase;
};
const consultaDatos = async url => {
  const resp = await fetch(url);
  const datos = await resp.json();
  consola.textContent = JSON.stringify(datos, null, 2);
};

const borrarConsola = () => {
  consola.textContent = "";
};

let query = {
  ordenPor: null,
  orden: null,
  abonadas: null,
  vencidas: null,
  elementosPorPagina: null,
  pagina: null
};
const resetQuery = () => {
  query = {
    ordenPor: null,
    orden: null,
    abonadas: null,
    vencidas: null,
    elementosPorPagina: null,
    pagina: null
  };
};
const getQuery = () => {
  let queryString = "?";
  const queryParams = [];
  if (query.ordenPor) {
    queryParams.push(`ordenPor=${query.ordenPor}`);
    queryParams.push(`orden=${query.orden ? query.orden : "asc"}`);
  }
  if (query.abonadas !== null) {
    queryParams.push(`abonadas=${query.abonadas ? "true" : "false"}`);
  }
  if (query.vencidas !== null) {
    queryParams.push(`vencidas=${query.vencidas ? "true" : "false"}`);
  }
  if (query.elementosPorPagina !== null) {
    queryParams.push(`nPorPagina=${query.elementosPorPagina}`);
  }
  if (query.pagina !== null) {
    queryParams.push(`pagina=${query.pagina}`);
  }
  queryString += queryParams.join("&");
  if (queryString === "?") {
    queryString = "";
  }
  return queryString;
};
selectOrden.addEventListener("change", () => {
  switch (selectOrden.value) {
    case "":
    default:
      query.ordenPor = null;
      query.orden = null;
      break;
    case "fecha-asc":
      query.ordenPor = "fecha";
      query.orden = "asc";
      break;
    case "fecha-desc":
      query.ordenPor = "fecha";
      query.orden = "desc";
      break;
    case "base-asc":
      query.ordenPor = "base";
      query.orden = "asc";
      break;
    case "base-desc":
      query.ordenPor = "base";
      query.orden = "desc";
      break;
  }
});
selectAbonadas.addEventListener("change", () => {
  switch (selectAbonadas.value) {
    case "":
    default:
      query.abonadas = null;
      break;
    case "si":
      query.abonadas = true;
      break;
    case "no":
      query.abonadas = false;
      break;
  }
});
selectVencidas.addEventListener("change", () => {
  switch (selectVencidas.value) {
    case "":
    default:
      query.vencidas = null;
      break;
    case "si":
      query.vencidas = true;
      break;
    case "no":
      query.vencidas = false;
      break;
  }
});
inputElemPagina.addEventListener("change", () => {
  query.elementosPorPagina = inputElemPagina.value !== "" ? inputElemPagina.value.trim() : null;
});
inputPagina.addEventListener("change", () => {
  query.pagina = inputPagina.value !== "" ? inputPagina.value.trim() : null;
});

botonIngresos.addEventListener("click", () => consultaDatos(getURLListado("ingresos")));

botonGastos.addEventListener("click", () => consultaDatos(getURLListado("gastos")));

botonTodas.addEventListener("click", () => consultaDatos(getURLListado("")));

botonFactura.addEventListener("click", () => consultaDatos(getURLListado(`factura/${inputIdFactura.value.trim()}`, false)));

const navegar = path => {
  borrarConsola();
  for (const link of links) {
    link.classList.remove("activo");
  }
  for (const seccion of secciones) {
    if (seccion.dataset.path === path) {
      seccion.hidden = false;
      const linkActivo = navegacion.querySelector(`[data-href=${path}]`);
      linkActivo.classList.add("activo");
    } else {
      seccion.hidden = true;
    }
  }
};

for (const link of links) {
  link.addEventListener("click", e => {
    e.preventDefault();
    navegar(e.target.dataset.href);
  });
}

const getURLNueva = () => {
  const urlBase = `${urlAPI}/factura/`;
  return urlBase;
};

formNuevaFactura.addEventListener("submit", async e => {
  e.preventDefault();
  const nuevaFactura = {};
  if (formNuevaFactura.querySelector(".numero").value.trim() !== "") {
    nuevaFactura.numero = formNuevaFactura.querySelector(".numero").value;
  }
  if (formNuevaFactura.querySelector(".fecha").value.trim() !== "") {
    nuevaFactura.fecha = `${new Date(formNuevaFactura.querySelector(".fecha").value.trim()).getTime()}`;
  }
  if (formNuevaFactura.querySelector(".vencimiento").value.trim() !== "") {
    nuevaFactura.vencimiento = `${new Date(formNuevaFactura.querySelector(".vencimiento").value.trim()).getTime()}`;
  }
  if (formNuevaFactura.querySelector(".concepto").value.trim() !== "") {
    nuevaFactura.concepto = formNuevaFactura.querySelector(".concepto").value;
  }
  if (formNuevaFactura.querySelector(".base").value.trim() !== "") {
    nuevaFactura.base = formNuevaFactura.querySelector(".base").value;
  }
  if (formNuevaFactura.querySelector(".tipo-iva").value.trim() !== "") {
    nuevaFactura.numero = formNuevaFactura.querySelector(".tipo-iva").value;
  }
  if (formNuevaFactura.querySelector(".tipo").value.trim() !== "") {
    nuevaFactura.tipo = formNuevaFactura.querySelector(".tipo").value;
  }
  if (formNuevaFactura.querySelector(".abonada").value.trim() !== "") {
    if (formNuevaFactura.querySelector(".abonada").value === "true") {
      nuevaFactura.abonada = true;
    } else if (formNuevaFactura.querySelector(".abonada").value === "false") {
      nuevaFactura.abonada = false;
    }
  }
  const resp = await fetch(`${urlAPI}factura/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(nuevaFactura)
  });
  const datos = await resp.json();
  consola.textContent = JSON.stringify(datos, null, 2);
});

formBorrarFactura.addEventListener("submit", async e => {
  e.preventDefault();
  const resp = await fetch(`${urlAPI}factura/${formBorrarFactura.querySelector(".id-factura-borrar").value.trim()}`, {
    method: "DELETE"
  });
  const datos = await resp.json();
  consola.textContent = JSON.stringify(datos, null, 2);
});

formModificarFactura.addEventListener("submit", async e => {
  e.preventDefault();
  const facturaModificada = {};
  if (formNuevaFactura.querySelector(".numero").value.trim() !== "") {
    facturaModificada.numero = formNuevaFactura.querySelector(".numero").value;
  }
  if (formNuevaFactura.querySelector(".fecha").value.trim() !== "") {
    facturaModificada.fecha = `${new Date(formNuevaFactura.querySelector(".fecha").value.trim()).getTime()}`;
  }
  if (formNuevaFactura.querySelector(".vencimiento").value.trim() !== "") {
    facturaModificada.vencimiento = `${new Date(formNuevaFactura.querySelector(".vencimiento").value.trim()).getTime()}`;
  }
  if (formNuevaFactura.querySelector(".concepto").value.trim() !== "") {
    facturaModificada.concepto = formNuevaFactura.querySelector(".concepto").value;
  }
  if (formNuevaFactura.querySelector(".base").value.trim() !== "") {
    facturaModificada.base = formNuevaFactura.querySelector(".base").value;
  }
  if (formNuevaFactura.querySelector(".tipo-iva").value.trim() !== "") {
    facturaModificada.numero = formNuevaFactura.querySelector(".tipo-iva").value;
  }
  if (formNuevaFactura.querySelector(".tipo").value.trim() !== "") {
    facturaModificada.tipo = formNuevaFactura.querySelector(".tipo").value;
  }
  if (formNuevaFactura.querySelector(".abonada").value.trim() !== "") {
    if (formNuevaFactura.querySelector(".abonada").value === "true") {
      facturaModificada.abonada = true;
    } else if (formNuevaFactura.querySelector(".abonada").value === "false") {
      facturaModificada.abonada = false;
    }
  }
  const resp = await fetch(`${urlAPI}factura/${formModificarFactura.querySelector(".id-factura-modificar").value.trim()}`, {
    method: formModificarFactura.querySelector("[name=metodo]:checked").value,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(facturaModificada)
  });
  const datos = await resp.json();
  consola.textContent = JSON.stringify(datos, null, 2);
});
navegar("listados");
