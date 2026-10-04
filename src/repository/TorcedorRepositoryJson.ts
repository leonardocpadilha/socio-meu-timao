import fs from "fs";
import { ITorcedorRepository } from "./ITorcedorRepository";
import Torcedor from "../model/domain/Torcedor";

export class TorcedorRepositoryJson implements ITorcedorRepository {
  private caminhoArquivo = "src/database/torcedores.json";

  private lerDados() {
    const arquivo = fs.readFileSync(this.caminhoArquivo, "utf-8");
    const dados = JSON.parse(arquivo);

    return dados;
  }

  public salvar(torcedor: Torcedor): void {
    const dados = this.lerDados();
    const torcedores = dados.torcedores;
    torcedores.push(torcedor);

    const json = JSON.stringify(dados);
    fs.writeFileSync(this.caminhoArquivo, json, "utf-8");
  }

  public buscarPorCpf(cpf: string): Torcedor | null {
    const dados = this.lerDados();
    const torcedores = dados.torcedores;
    const torcedorEncontrado = torcedores.find((torcedor: any) => torcedor.cpf === cpf);
    if (torcedorEncontrado) {
      const torcedor = new Torcedor(
        torcedorEncontrado.nome,
        torcedorEncontrado.cpf,
        torcedorEncontrado.senha,
      );
      torcedor.setId(torcedorEncontrado.id);
      torcedor.setDataNascimento(torcedorEncontrado.data_nascimento);
      torcedor.setEmail(torcedorEncontrado.email);
      torcedor.setAdimplente(torcedorEncontrado.adimplente);
      torcedor.setPlano(torcedorEncontrado.plano);
      return torcedor;
    }
    return null;
  }
}
