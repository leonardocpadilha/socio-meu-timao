import fs from "fs";
import { ITorcedorRepository } from "./ITorcedorRepository";
import Torcedor from "../model/domain/Torcedor";

export class TorcedorRepositoryJSON implements ITorcedorRepository {
  private filePath = "src/database/torcedores.json";

  public salvar(torcedor: Torcedor): void {
    const arquivo = fs.readFileSync(this.filePath, "utf-8");
    const dados = JSON.parse(arquivo);
    dados.torcedores.push(torcedor);
    fs.writeFileSync(this.filePath, JSON.stringify(dados, null, 2));
  }

  public buscarPorCpf(cpf: string): Torcedor | null {
    const arquivo = fs.readFileSync(this.filePath, "utf-8");
    const dados = JSON.parse(arquivo);
    const torcedorEncontrado = dados.torcedores.find((torcedor: any) => torcedor.cpf === cpf);
    return torcedorEncontrado || null;
  }
}
