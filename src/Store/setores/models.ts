export type Cargo = {
  id: number;
  nome: string;
};

export type Setor = {
  id: number;
  nome: string;
  cargos: Cargo[];
};

export type PostSetorRequest = {
  nome: string;
  cargos: Cargo[];
};
export type PostSetorResponse = Setor;

export type DeleteSetorRequest = {
  id: number;
};
export type DeleteSetorResponse = {
  id: number;
};

export type PatchSetorRequest = {
  params: {
    id: number;
  };
  payload: Setor;
};
export type PatchSetorResponse = Setor;

export type GetSetoresRequest = void;
export type GetSetoresResponse = Setor[];
