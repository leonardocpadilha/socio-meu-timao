"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingresso_1 = __importDefault(require("../domain/Ingresso"));
class ServicoDeBilheteria {
    processarCompra(torcedor, partida) {
        if (!torcedor.getAdimplente()) {
            return null;
        }
        if (!partida.temVaga()) {
            return null;
        }
        const plano = torcedor.getPlano();
        if (!plano) {
            return null;
        }
        const valorFinal = plano.calcularValorIngresso(partida.getPrecoBase());
        partida.reservarIngresso();
        return new Ingresso_1.default(torcedor, partida, valorFinal);
    }
}
exports.default = ServicoDeBilheteria;
