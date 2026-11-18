import { Validador } from "../Validador";
import Torcedor from "../../model/domain/Torcedor";

export class ValidadorCpfTorcedor extends Validador<Torcedor> {
  protected executarRegra(torcedor: Torcedor): void {
    const cpf = torcedor.getCpf();
    if (!cpf) {
      throw new Error("O CPF é obrigatório.");
    }

    const apenasDigitos = cpf.replace(/\D/g, "");
    if (apenasDigitos.length !== 11) {
      throw new Error("O CPF informado é inválido. Deve conter 11 dígitos numéricos.");
    }
  }
}
