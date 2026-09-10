"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlanoFiel_1 = __importDefault(require("./PlanoFiel"));
class PlanoDoutor extends PlanoFiel_1.default {
    constructor() {
        super("Plano Doutor", 45.00, ["50% de desconto na compra de ingressos", "20% de desconto na loja ShopTimão", "Frete reduzido na loja"]);
    }
    calcularValorIngresso(precoBase) {
        return precoBase * 0.50;
    }
    calcularDescontoLoja(valorProduto) {
        return valorProduto * 0.80;
    }
}
exports.default = PlanoDoutor;
