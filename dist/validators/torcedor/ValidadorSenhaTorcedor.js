"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidadorSenhaTorcedor = void 0;
const Validador_1 = require("../Validador");
class ValidadorSenhaTorcedor extends Validador_1.Validador {
    executarRegra(torcedor) {
        const senha = torcedor.getSenha();
        if (!senha || senha.trim().length < 4) {
            throw new Error("A senha deve ter no mínimo 4 caracteres.");
        }
    }
}
exports.ValidadorSenhaTorcedor = ValidadorSenhaTorcedor;
