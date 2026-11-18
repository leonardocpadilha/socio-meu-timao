import { Validador } from "../Validador";
import Torcedor from "../../model/domain/Torcedor";

export class ValidadorNomeTorcedor extends Validador<Torcedor> {
  protected executarRegra(torcedor: Torcedor): void {
    const nome = torcedor.getNome();
    if (!nome || nome.trim().length < 3) {
      throw new Error("O nome do torcedor deve ter no mínimo 3 caracteres.");
    }
  }
}
