"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidadorNomeTorcedor = void 0;
const Validador_1 = require("../Validador");
class ValidadorNomeTorcedor extends Validador_1.Validador {
    executarRegra(torcedor) {
        const nome = torcedor.getNome();
        if (!nome || nome.trim().length < 3) {
            throw new Error("O nome do torcedor deve ter no mínimo 3 caracteres.");
        }
    }
}
exports.ValidadorNomeTorcedor = ValidadorNomeTorcedor;
