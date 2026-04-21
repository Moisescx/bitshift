import { Historial } from "./utils.js";

export const CesarCoder = {
  alfabeto: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",

  cifrar(texto, desplazamiento) {
    const d = parseInt(desplazamiento) % 27;
    return texto
      .toUpperCase()
      .split("")
      .map((char) => {
        const index = this.alfabeto.indexOf(char);
        if (index === -1) return char;
        const nuevoIndex = (index + d) % 27;
        return this.alfabeto[nuevoIndex];
      })
      .join("");
  },

  descifrar(texto, desplazamiento) {
    const d = parseInt(desplazamiento) % 27;
    return texto
      .toUpperCase()
      .split("")
      .map((char) => {
        const index = this.alfabeto.indexOf(char);
        if (index === -1) return char;
        const nuevoIndex = (index - d + 27) % 27;
        return this.alfabeto[nuevoIndex];
      })
      .join("");
  },
};

window.procesar = (modo) => {
  const input = document.getElementById("inputUser").value;
  const shift = document.getElementById("shiftValue").value || 3;

  if (!input) return;

  const res = modo
    ? CesarCoder.cifrar(input, shift)
    : CesarCoder.descifrar(input, shift);
  document.getElementById("resultado").innerText = res;

  Historial.guardar("César", input, res);
};

window.copiarAlPortapapeles = async () => {
  const texto = document.getElementById("resultado").innerText;
  if (texto === "-") return;
  try {
    await navigator.clipboard.writeText(texto);
    const feedback = document.getElementById("feedback");
    feedback.classList.remove("opacity-0");
    setTimeout(() => feedback.classList.add("opacity-0"), 2000);
  } catch (err) {
    console.error("Error al copiar: ", err);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  Historial.renderizar();
});
