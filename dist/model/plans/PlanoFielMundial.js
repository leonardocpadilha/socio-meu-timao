"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PlanoFiel_1 = __importDefault(require("./PlanoFiel"));
class PlanoFielMundial extends PlanoFiel_1.default {
    constructor() {
        super("Plano Fiel Mundial", 110.00, ["75% de desconto na compra de ingressos", "25% de desconto na loja ShopTimão", "1 tour grátis por ano na Casa do Povo"]);
    }
    calcularValorIngresso(precoBase) {
        return precoBase * 0.25;
    }
    calcularDescontoLoja(valorProduto) {
        return valorProduto * 0.75;
    }
}
exports.default = PlanoFielMundial;
