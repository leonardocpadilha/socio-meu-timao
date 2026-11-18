"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidadorCpfTorcedor = void 0;
const Validador_1 = require("../Validador");
class ValidadorCpfTorcedor extends Validador_1.Validador {
    executarRegra(torcedor) {
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
exports.ValidadorCpfTorcedor = ValidadorCpfTorcedor;
