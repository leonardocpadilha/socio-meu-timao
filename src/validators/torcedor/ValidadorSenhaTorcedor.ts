import { Validador } from "../Validador";
import Torcedor from "../../model/domain/Torcedor";

export class ValidadorSenhaTorcedor extends Validador<Torcedor> {
  protected executarRegra(torcedor: Torcedor): void {
    const senha = torcedor.getSenha();
    if (!senha || senha.trim().length < 4) {
      throw new Error("A senha deve ter no mínimo 4 caracteres.");
    }
  }
}
