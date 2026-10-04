import Torcedor from "../model/domain/Torcedor";

export interface ITorcedorRepository {
  salvar(torcedor: Torcedor): void;
  buscarPorCpf(cpf: string): Torcedor | null;
}