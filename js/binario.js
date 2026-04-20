export const BinaryCoder = {
  cifrar(texto) {
    return texto
      .split("")
      .map((char) => {
        const decimal = char.charCodeAt(0);
        return decimal.toString(2).padStart(8, "0");
      })
      .join(" ");
  },

  descifrar(codigo) {
    return codigo
      .trim()
      .split(/\s+/)
      .map((bin) => {
        const decimal = parseInt(bin, 2);
        return String.fromCharCode(decimal);
      })
      .join("");
  },
};

window.procesar = (modo) => {
  const input = document.getElementById("inputUser").value;
  const res = modo ? BinaryCoder.cifrar(input) : BinaryCoder.descifrar(input);
  document.getElementById("resultado").innerText = res;
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
