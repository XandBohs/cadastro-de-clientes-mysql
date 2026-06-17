export type Cliente = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  criado_em: string;
};

export type ClienteInput = {
  nome: string;
  email: string;
  telefone: string;
};
