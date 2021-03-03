const botonIngresos = document.querySelector(".ingresos");
const botonGastos = document.querySelector(".gastos");
const botonTodas = document.querySelector(".todas");
const botonFactura = document.querySelector(".factura");
const inputIdFactura = document.querySelector(".id-factura");
const consola = document.querySelector(".datos");
const puerto = 5000;
const query = "";
const getURL = tipo => {
  let urlBase = `http://localhost:${puerto}/facturas/`;
  urlBase = `${urlBase}${tipo}`;
  return urlBase;
};
botonIngresos.addEventListener("click", () => consultaDatos(getURL("ingresos")));

botonGastos.addEventListener("click", () => consultaDatos(getURL("gastos")));

botonTodas.addEventListener("click", () => consultaDatos(getURL("")));

botonFactura.addEventListener("click", () => consultaDatos(getURL(`factura/${inputIdFactura.value}`)));

const consultaDatos = async url => {
  const resp = await fetch(url);
  const datos = await resp.json();
  consola.textContent = JSON.stringify(datos, null, 2);
};
