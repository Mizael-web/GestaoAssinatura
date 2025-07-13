

function validarCamposObrigatorios(campos, body) {
  for (const campo of campos) {
    if (!body[campo]) {
      return `O campo '${campo}' é obrigatório.`;
    }
  }
  return null;
}

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarSenha(senha, min = 6) {
  return typeof senha === "string" && senha.length >= min;
}

function validarData(data) {
  return !isNaN(Date.parse(data));
}

function validarSomenteLetras(texto) {
  return /^[A-Za-zÀ-ÿ\s]+$/.test(texto);
}

module.exports = {
  validarCamposObrigatorios,
  validarEmail,
  validarSenha,
  validarData,
  validarSomenteLetras
};
