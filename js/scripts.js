const botonIngresos = document.querySelector(".ingresos");
const botonGastos = document.querySelector(".gastos");
const botonTodas = document.querySelector(".todas");
const botonFactura = document.querySelector(".factura");
const inputIdFactura = document.querySelector(".id-factura");
const selectOrden = document.querySelector(".orden");
const selectAbonadas = document.querySelector(".abonadas");
const selectVencidas = document.querySelector(".vencidas");
const consola = document.querySelector(".datos");
const puerto = 5000;

const getURL = (tipo, queryString = true) => {
  let urlBase = `http://localhost:${puerto}/facturas/`;
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

let query = {
  ordenPor: null,
  orden: null,
  abonadas: null,
  vencidas: null
};
const resetQuery = () => {
  query = {
    ordenPor: null,
    orden: null,
    abonadas: null,
    vencidas: null
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

botonIngresos.addEventListener("click", () => consultaDatos(getURL("ingresos")));

botonGastos.addEventListener("click", () => consultaDatos(getURL("gastos")));

botonTodas.addEventListener("click", () => consultaDatos(getURL("")));

botonFactura.addEventListener("click", () => consultaDatos(getURL(`factura/${inputIdFactura.value}`, false)));
