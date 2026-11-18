"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlanoFielDemocracia_1 = __importDefault(require("../model/plans/PlanoFielDemocracia"));
const PlanoFielInvasao_1 = __importDefault(require("../model/plans/PlanoFielInvasao"));
const PlanoFielMundial_1 = __importDefault(require("../model/plans/PlanoFielMundial"));
describe("Testes de cálculo de desconto dos planos", () => {
    test("Deve calcular o valor do ingresso com 25% de desconto para o Plano Fiel Democracia", () => {
        let plano = new PlanoFielDemocracia_1.default();
        let valorComDesconto = plano.calcularValorIngresso(100);
        expect(valorComDesconto).toBe(75);
    });
    test("Deve calcular o valor do ingresso com 50% de desconto para o Plano Fiel Invasão", () => {
        let plano = new PlanoFielInvasao_1.default();
        let valorComDesconto = plano.calcularValorIngresso(100);
        expect(valorComDesconto).toBe(50);
    });
    test("Deve calcular o valor do ingresso com 75% de desconto para o Plano Fiel Mundial", () => {
        let plano = new PlanoFielMundial_1.default();
        let valorComDesconto = plano.calcularValorIngresso(100);
        expect(valorComDesconto).toBe(25);
    });
});
