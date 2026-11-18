import { Validador } from "../Validador";
import Torcedor from "../../model/domain/Torcedor";
import { ITorcedorRepository } from "../../repository/ITorcedorRepository";

export class ValidadorCpfExistente extends Validador<Torcedor> {
  constructor(private repository: ITorcedorRepository) {
    super();
  }

  protected executarRegra(torcedor: Torcedor): void {
    const torcedorExistente = this.repository.buscarPorCpf(torcedor.getCpf());
    if (torcedorExistente) {
      throw new Error("Já existe um torcedor cadastrado com este CPF.");
    }
  }
}
