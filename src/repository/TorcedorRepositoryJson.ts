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
    const arquivo = fs.readFileSync(this.caminhoArquivo, "utf-8");
    const dados = JSON.parse(arquivo);

    return dados;
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

    const json = JSON.stringify(dados, null, 2);
    fs.writeFileSync(this.caminhoArquivo, json, "utf-8");
  }

  public buscarPorCpf(cpf: string): Torcedor | null {
    const dados = this.lerDados();
    const torcedorEncontrado = dados.torcedores.find((t: any) => t.cpf === cpf);

    if (torcedorEncontrado) {
      const torcedor = new Torcedor(
        torcedorEncontrado.nome,
        torcedorEncontrado.cpf,
        torcedorEncontrado.senha,
      );
      torcedor.setDataNascimento(torcedorEncontrado.dataNascimento);
      torcedor.setAdimplente(torcedorEncontrado.adimplente);
      torcedor.setPlano(this.criarPlano(torcedorEncontrado.plano?.nome));
      return torcedor;
    }
    return null;
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
