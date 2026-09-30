"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlanoFiel_1 = __importDefault(require("./PlanoFiel"));
class PlanoFielInvasao extends PlanoFiel_1.default {
    constructor() {
        super("Plano Fiel Invasao", 45.0, [
            "50% de desconto na compra de ingressos",
            "20% de desconto na loja ShopTimão",
            "Frete reduzido na loja",
        ]);
    }
    calcularValorIngresso(precoBase) {
        return precoBase * 0.5;
    }
    calcularDescontoLoja(valorProduto) {
        return valorProduto * 0.8;
    }
}
exports.default = PlanoFielInvasao;
