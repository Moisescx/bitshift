export const Polibio6x6 = {
  chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",

  getGrid() {
    const grid = {};
    for (let i = 0; i < this.chars.length; i++) {
      const fila = Math.floor(i / 6) + 1;
      const col = (i % 6) + 1;
      grid[this.chars[i]] = `${fila}${col}`;
    }
    return grid;
  },

  cifrar(texto) {
    const grid = this.getGrid();
    return texto
      .toUpperCase()
      .split("")
      .map((char) => {
        if (char === " ") return " ";
        return grid[char] || "";
      })
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
  },

  descifrar(codigo) {
    const grid = this.getGrid();
    const inverse = Object.fromEntries(
      Object.entries(grid).map(([k, v]) => [v, k]),
    );

    return codigo
      .trim()
      .split(" ")
      .map((par) => {
        if (par === "") return " ";
        return inverse[par] || "?";
      })
      .join("");
  },
};

window.procesar = (modo) => {
  const input = document.getElementById("inputUser").value;
  const res = modo ? Polibio6x6.cifrar(input) : Polibio6x6.descifrar(input);
  document.getElementById("resultado").innerText = res;
}

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
}