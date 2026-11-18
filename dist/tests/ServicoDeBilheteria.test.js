"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Torcedor_1 = __importDefault(require("../model/domain/Torcedor"));
const Partida_1 = __importDefault(require("../model/domain/Partida"));
const PlanoFielDemocracia_1 = __importDefault(require("../model/plans/PlanoFielDemocracia"));
const ServicoDeBilheteria_1 = __importDefault(require("../model/services/ServicoDeBilheteria"));
describe("Teste do Serviço de Bilheteria para compra de ingresso", () => {
    test("Deve realizar a compra do ingresso com desconto e reduzir as vagas", () => {
        let torcedor = new Torcedor_1.default("Ana", "109.514.468-10", "senha123");
        torcedor.setPlano(new PlanoFielDemocracia_1.default());
        let partida = new Partida_1.default("São Paulo", 100, 10);
        let servico = new ServicoDeBilheteria_1.default();
        let ingresso = servico.processarCompra(torcedor, partida);
        expect(ingresso?.getValorPago()).toBe(75);
        expect(partida.getIngressosDisponiveis()).toBe(9);
    });
    test("Não deve realizar a compra do ingresso quando o torcedor está inadimplente", () => {
        let torcedor = new Torcedor_1.default("Ana", "123", "senha");
        torcedor.setPlano(new PlanoFielDemocracia_1.default());
        torcedor.setAdimplente(false);
        let partida = new Partida_1.default("Palmeiras", 100, 10);
        let servico = new ServicoDeBilheteria_1.default();
        let ingresso = servico.processarCompra(torcedor, partida);
        expect(ingresso).toBeNull();
        expect(partida.getIngressosDisponiveis()).toBe(10);
    });
    test("Não deve realizar a compra do ingresso quando a partida não possui ingressos disponíveis", () => {
        let torcedor = new Torcedor_1.default("Jose", "695.845.362-39", "senhaFraca");
        torcedor.setPlano(new PlanoFielDemocracia_1.default());
        let partida = new Partida_1.default("Palmeiras", 100, 0);
        let servico = new ServicoDeBilheteria_1.default();
        let ingresso = servico.processarCompra(torcedor, partida);
        expect(ingresso).toBeNull();
        expect(partida.getIngressosDisponiveis()).toBe(0);
    });
    test("Não deve realizar a comprar do ingresso quando o torcedor não tem plano", () => {
        let torcedor = new Torcedor_1.default("Fabio", "110.321.964-17", "senhaForte");
        let partida = new Partida_1.default("Santos", 100, 10);
        let servico = new ServicoDeBilheteria_1.default();
        let ingresso = servico.processarCompra(torcedor, partida);
        expect(ingresso).toBeNull();
        expect(partida.getIngressosDisponiveis()).toBe(10);
    });
});
