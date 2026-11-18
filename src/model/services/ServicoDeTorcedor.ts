import Torcedor from "../domain/Torcedor";
import { ITorcedorRepository } from "../../repository/ITorcedorRepository";
import { Validador } from "../../validators/Validador";
import { ValidadorNomeTorcedor } from "../../validators/torcedor/ValidadorNomeTorcedor";
import { ValidadorCpfTorcedor } from "../../validators/torcedor/ValidadorCpfTorcedor";
import { ValidadorSenhaTorcedor } from "../../validators/torcedor/ValidadorSenhaTorcedor";
import { ValidadorCpfExistente } from "../../validators/torcedor/ValidadorCpfExistente";

export default class ServicoDeTorcedor {
  private repository: ITorcedorRepository;
  private validador: Validador<Torcedor>;

  constructor(repository: ITorcedorRepository, validador?: Validador<Torcedor>) {
    this.repository = repository;

    if (validador) {
      this.validador = validador;
    } else {
      const vNome = new ValidadorNomeTorcedor();
      const vCpf = new ValidadorCpfTorcedor();
      const vSenha = new ValidadorSenhaTorcedor();
      const vCpfExistente = new ValidadorCpfExistente(repository);

      vNome.conectar(vCpf).conectar(vSenha).conectar(vCpfExistente);
      this.validador = vNome;
    }
  }

  public cadastrar(torcedor: Torcedor): void {
    this.validador.validar(torcedor);
    this.repository.salvar(torcedor);
  }

  public buscarPorCpf(cpf: string): Torcedor | null {
    return this.repository.buscarPorCpf(cpf);
  }

  public listarTodos(): Torcedor[] {
    return this.repository.listarTodos();
  }

  public buscarPorNome(termo: string): Torcedor[] {
    return this.repository.buscarPorNome(termo);
  }

  public buscarPorPlano(nomePlano: string): Torcedor[] {
    return this.repository.buscarPorPlano(nomePlano);
  }

  public listarOrdenadosPorNome(): Torcedor[] {
    return this.repository.listarOrdenadosPorNome();
  }
}
