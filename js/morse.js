import { Historial } from "./utils.js";

export const MorseCoder = {
  map: {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
    1: ".----",
    2: "..---",
    3: "...--",
    4: "....-",
    5: ".....",
    6: "-....",
    7: "--...",
    8: "---..",
    9: "----.",
    0: "-----",
    ".": ".-.-.-",
    ",": "--..--",
    "?": "..--..",
    "!": "-.-.--",
  },

  cifrar(texto) {
    return texto
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char === " ") return "/";
        return this.map[char] || "";
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  },

  descifrar(codigo) {
    const inverse = Object.fromEntries(
      Object.entries(this.map).map(([k, v]) => [v, k]),
    );

    return codigo
      .trim()
      .split(" ")
      .map((signal) => {
        if (signal === "/") return " ";
        return inverse[signal] || "";
      })
      .join("");
  },
};

window.procesar = (modo) => {
  const input = document.getElementById("inputUser").value;
  if (!input) return;

  const res = modo ? MorseCoder.cifrar(input) : MorseCoder.descifrar(input);
  document.getElementById("resultado").innerText = res;

  Historial.guardar("Morse", input, res);
};

window.copiarAlPortapapeles = async () => {
  const texto = document.getElementById("resultado").innerText;
  if (texto === "-" || !texto) return;

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
