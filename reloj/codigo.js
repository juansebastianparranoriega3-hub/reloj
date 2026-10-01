const formulario = document.getElementById("tiempoForm");
const campos = [
  "horaInicial",
  "minutoInicial",
  "segundoInicial",
  "horaFinal",
  "minutoFinal",
  "segundoFinal"
];

function validarCampo(campo, valor) {
  const numero = Number(valor);

  if (!Number.isInteger(numero) || numero < 0) {
    return "Los valores deben ser números enteros positivos";
  }

  if (campo.includes("hora") && numero > 23) {
    return "Hora inválida";
  }

  if ((campo.includes("minuto") || campo.includes("segundo")) && numero > 59) {
    return "Minutos o segundos inválidos";
  }

  return "";
}

function obtenerMaximo(campo) {
  return campo.includes("hora") ? 23 : 59;
}

function corregirExceso(campo, id) {
  const numero = Number(campo.value);
  const maximo = obtenerMaximo(id);

  if (Number.isFinite(numero) && numero > maximo) {
    campo.value = maximo;
    alert(id.includes("hora") ? "Hora inválida. Se estableció el valor máximo: 23" : "Valor inválido. Se estableció el valor máximo: 59");
    return true;
  }

  return false;
}

campos.forEach((id) => {
  const campo = document.getElementById(id);

  campo.addEventListener("blur", () => {
    const valor = campo.value.trim();

    if (valor === "") {
      return;
    }

    if (corregirExceso(campo, id)) {
      return;
    }

    const mensaje = validarCampo(id, valor);
    if (mensaje !== "") {
      alert(mensaje);
    }
  });
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const entradas = campos.map((id) => document.getElementById(id).value.trim());
  const valores = entradas.map(Number);

  if (entradas.some((entrada) => entrada === "")) {
    alert("Debes completar todos los campos");
    return;
  }

  for (let indice = 0; indice < campos.length; indice += 1) {
    const campo = document.getElementById(campos[indice]);
    if (corregirExceso(campo, campos[indice])) {
      return;
    }

    const mensaje = validarCampo(campos[indice], entradas[indice]);
    if (mensaje !== "") {
      alert(mensaje);
      return;
    }
  }

  const [horaInicial, minutoInicial, segundoInicial, horaFinal, minutoFinal, segundoFinal] = valores;
  const totalInicial = horaInicial * 3600 + minutoInicial * 60 + segundoInicial;
  const totalFinal = horaFinal * 3600 + minutoFinal * 60 + segundoFinal;
  let diferencia = totalFinal - totalInicial;

  if (diferencia < 0) {
    diferencia += 24 * 3600;
  }

  document.getElementById("resultadoHoras").value = Math.floor(diferencia / 3600);
  diferencia %= 3600;
  document.getElementById("resultadoMinutos").value = Math.floor(diferencia / 60);
  document.getElementById("resultadoSegundos").value = diferencia % 60;
});