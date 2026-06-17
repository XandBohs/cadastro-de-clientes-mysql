export type ClienteValidationError = {
  message: string;
  pattern: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEFONE_DIGITS_PATTERN = /^\d{10,11}$/;

export function getClienteValidationError(input: {
  email?: string | null;
  telefone?: string | null;
}): ClienteValidationError | null {
  const email = input.email?.trim() ?? "";
  const telefone = input.telefone?.trim() ?? "";
  const telefoneDigits = telefone.replace(/\D/g, "");

  if (!EMAIL_PATTERN.test(email)) {
    return {
      message: "Por favor, insira um e-mail válido",
      pattern: "Padrão: nome@dominio.com"
    };
  }

  if (!TELEFONE_DIGITS_PATTERN.test(telefoneDigits)) {
    return {
      message: "Por favor, insira um número válido",
      pattern: "Padrão: 10 ou 11 dígitos com DDD, por exemplo 11999999999"
    };
  }

  return null;
}

export function formatClienteValidationMessage(error: ClienteValidationError) {
  return `${error.message}. ${error.pattern}`;
}

export function mapClienteDatabaseError(message?: string | null): ClienteValidationError | null {
  if (!message) {
    return null;
  }

  const match = message.match(/dadoscliente_(email|telefone)_check/i);
  if (!match) {
    return null;
  }

  if (match[1].toLowerCase() === "email") {
    return {
      message: "Por favor, insira um e-mail válido",
      pattern: "Padrão: nome@dominio.com"
    };
  }

  return {
    message: "Por favor, insira um número válido",
    pattern: "Padrão: 10 ou 11 dígitos com DDD, por exemplo 11999999999"
  };
}
