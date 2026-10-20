"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Partida_1 = __importDefault(require("../domain/Partida"));
const Ingresso_1 = __importDefault(require("../domain/Ingresso"));
class ServicoDeBilheteria {
    partidas = [
        new Partida_1.default("Palmeiras", 100.0, 50),
        new Partida_1.default("São Paulo", 80.0, 40),
        new Partida_1.default("Santos", 60.0, 30),
    ];
    getPartidas() {
        return this.partidas;
    }
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
