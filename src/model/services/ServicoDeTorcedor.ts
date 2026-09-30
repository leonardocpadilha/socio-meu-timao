import Torcedor from "../domain/Torcedor";
import { ITorcedorRepository } from "../../interfaces/ITorcedorRepository";

export default class ServicoDeTorcedor {
  private repository: ITorcedorRepository;

  constructor(repository: ITorcedorRepository) {
    this.repository = repository;
  }

  public cadastrar(torcedor: Torcedor): void {
    this.repository.salvar(torcedor);
  }

  public buscarPorCpf(cpf: string): Torcedor | null {
    return this.repository.buscarPorCpf(cpf);
  }
}
