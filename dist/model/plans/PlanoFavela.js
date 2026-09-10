"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlanoFiel_1 = __importDefault(require("./PlanoFiel"));
class PlanoFavela extends PlanoFiel_1.default {
    constructor() {
        super("Plano Favela", 20.00, ["25% de desconto na compra de ingressos", "10% de desconto na loja ShopTimão"]);
    }
    calcularValorIngresso(precoBase) {
        return precoBase * 0.70;
    }
    calcularDescontoLoja(valorProduto) {
        return valorProduto * 0.90;
    }
}
exports.default = PlanoFavela;
