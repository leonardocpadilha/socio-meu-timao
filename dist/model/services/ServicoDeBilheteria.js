"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Ingresso_1 = __importDefault(require("../domain/Ingresso"));
class ServicoDeBilheteria {
    processarCompra(torcedor, partida) {
        if (!torcedor.getAdimplente()) {
            throw new Error("Torcedor inadimplente. Regularize sua mensalidade.");
        }
        if (!partida.temVaga()) {
            throw new Error("Os ingressos para esta partida estão esgotados");
        }
        const valorFinal = torcedor.getPlano().calcularValorIngresso(partida.getPrecoBase());
        partida.reservarIngresso();
        return new Ingresso_1.default(torcedor, partida, valorFinal);
    }
}
exports.default = ServicoDeBilheteria;
