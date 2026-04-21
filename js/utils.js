export const Historial = {
  guardar(tipo, original, resultado) {
    let datos = JSON.parse(localStorage.getItem("bitshift")) || [];

    const nuevo = {
      id: Date.now(),
      tipo: tipo,
      original: original.substring(0, 20) + (original.length > 20 ? "..." : ""),
      resultado:
        resultado.substring(0, 20) + (resultado.length > 20 ? "..." : ""),
      fecha: new Date().toLocaleTimeString(),
    };

    datos.unshift(nuevo);
    datos = datos.slice(0, 5);

    localStorage.setItem("bitshift", JSON.stringify(datos));
    this.renderizar();
  },

  renderizar() {
    const contenedor = document.getElementById("historialLista");
    if (!contenedor) return;

    const datos = JSON.parse(localStorage.getItem("bitshift")) || [];

    if (datos.length === 0) {
      contenedor.innerHTML =
        '<p class="text-slate-600 text-xs italic text-center">No hay actividad reciente</p>';
      return;
    }

    contenedor.innerHTML = datos
      .map(
        (item) => `
      <div class="bg-slate-900/50 p-3 rounded-lg border border-slate-700 mb-2 text-[10px]">
        <div class="flex justify-between text-slate-500 mb-1">
          <span class="font-bold uppercase text-blue-400">${item.tipo}</span>
          <span>${item.fecha}</span>
        </div>
        <div class="text-slate-300 truncate"><span class="text-slate-500">In:</span> ${item.original}</div>
        <div class="text-emerald-400 truncate"><span class="text-slate-500">Out:</span> ${item.resultado}</div>
      </div>
    `,
      )
      .join("");
  },
};
