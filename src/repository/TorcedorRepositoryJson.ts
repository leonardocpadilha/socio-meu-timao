import fs from "fs";
import { ITorcedorRepository } from "./ITorcedorRepository";
import Torcedor from "../model/domain/Torcedor";
import PlanoFiel from "../model/plans/PlanoFiel";
import PlanoFielDemocracia from "../model/plans/PlanoFielDemocracia";
import PlanoFielInvasao from "../model/plans/PlanoFielInvasao";
import PlanoFielMundial from "../model/plans/PlanoFielMundial";

export class TorcedorRepositoryJson implements ITorcedorRepository {
  private caminhoArquivo = "src/database/torcedores.json";

  private lerDados() {
    try {
      const arquivo = fs.readFileSync(this.caminhoArquivo, "utf-8");
      const dados = JSON.parse(arquivo);
      return dados;
    } catch (error) {
      throw new Error("Falha ao ler o banco de dados de torcedores.");
    }
  }

  public salvar(torcedor: Torcedor): void {
    const dados = this.lerDados();
    const plano = torcedor.getPlano();
    dados.torcedores.push({
      nome: torcedor.getNome(),
      cpf: torcedor.getCpf(),
      dataNascimento: torcedor.getDataNascimento(),
      senha: torcedor.getSenha(),
      adimplente: torcedor.getAdimplente(),
      plano: plano ? { nome: plano.getNome() } : null,
    });

    try {
      const json = JSON.stringify(dados, null, 2);
      fs.writeFileSync(this.caminhoArquivo, json, "utf-8");
    } catch (error) {
      throw new Error("Falha ao gravar no banco de dados de torcedores.");
    }
  }

  public buscarPorCpf(cpf: string): Torcedor | null {
    const dados = this.lerDados();
    const torcedorEncontrado = dados.torcedores.find((t: any) => t.cpf === cpf);

    return torcedorEncontrado ? this.instanciarTorcedor(torcedorEncontrado) : null;
  }

  public listarTodos(): Torcedor[] {
    const dados = this.lerDados();
    return dados.torcedores.map((t: any) => this.instanciarTorcedor(t));
  }

  public buscarPorNome(termo: string): Torcedor[] {
    const termoNormalizado = termo.trim().toLowerCase();
    return this.listarTodos().filter((t) =>
      t.getNome().toLowerCase().includes(termoNormalizado),
    );
  }

  public buscarPorPlano(nomePlano: string): Torcedor[] {
    const planoNormalizado = nomePlano.trim().toLowerCase();
    return this.listarTodos().filter((t) => {
      const plano = t.getPlano();
      return plano ? plano.getNome().toLowerCase() === planoNormalizado : false;
    });
  }

  public listarOrdenadosPorNome(): Torcedor[] {
    return this.listarTodos().sort((a, b) =>
      a.getNome().localeCompare(b.getNome(), "pt-BR", { sensitivity: "base" }),
    );
  }

  private instanciarTorcedor(dado: any): Torcedor {
    const torcedor = new Torcedor(dado.nome, dado.cpf, dado.senha);
    torcedor.setDataNascimento(dado.dataNascimento);
    torcedor.setAdimplente(dado.adimplente);
    torcedor.setPlano(this.criarPlano(dado.plano?.nome));
    return torcedor;
  }

  private criarPlano(nome: string | undefined): PlanoFiel | null {
    switch (nome) {
      case undefined:
        return null;
      case "Plano Fiel Democracia":
        return new PlanoFielDemocracia();
      case "Plano Fiel Invasao":
        return new PlanoFielInvasao();
      case "Plano Fiel Mundial":
        return new PlanoFielMundial();
      default:
        return null;
    }
  }
}
