import Torcedor from "../domain/Torcedor";
import { ITorcedorRepository } from "../../repository/ITorcedorRepository";

export default class ServicoDeTorcedor {
  private repository: ITorcedorRepository;

  constructor(repository: ITorcedorRepository) {
    this.repository = repository;
  }

  public cadastrar(torcedor: Torcedor): void {
    const torcedorExistente = this.repository.buscarPorCpf(torcedor.getCpf());
    if (torcedorExistente) {
      throw new Error("Já existe um torcedor cadastrado com este CPF.");
    }
    this.repository.salvar(torcedor);
  }

  public buscarPorCpf(cpf: string): Torcedor | null {
    return this.repository.buscarPorCpf(cpf);
  }
}
