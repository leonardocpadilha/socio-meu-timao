"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Torcedor_1 = __importDefault(require("./model/domain/Torcedor"));
const Partida_1 = __importDefault(require("./model/domain/Partida"));
const PlanoFavela_1 = __importDefault(require("./model/plans/PlanoFavela"));
const PlanoLoucoDoBando_1 = __importDefault(require("./model/plans/PlanoLoucoDoBando"));
const PlanoDoutor_1 = __importDefault(require("./model/plans/PlanoDoutor"));
const ServicoDeBilheteria_1 = __importDefault(require("./model/services/ServicoDeBilheteria"));
const ServicoDeBeneficios_1 = __importDefault(require("./model/services/ServicoDeBeneficios"));
// 1. Instanciando os Planos
const planoFavela = new PlanoFavela_1.default();
const planoLouco = new PlanoLoucoDoBando_1.default();
const planoDoutor = new PlanoDoutor_1.default();
// 2. Instanciando os Torcedores
const torcedor1 = new Torcedor_1.default("Matheus", planoFavela, true);
const torcedor2 = new Torcedor_1.default("Beatriz", planoDoutor, true);
const torcedor3 = new Torcedor_1.default("Lucas", planoLouco, false); // Inadimplente
// 3. Instanciando a Partida (Adversário, Preço Base, Ingressos Disponíveis)
const partida = new Partida_1.default("Palmeiras", 100.00, 2);
// 4. Instanciando os Serviços
const bilheteria = new ServicoDeBilheteria_1.default();
const beneficios = new ServicoDeBeneficios_1.default();
console.log("=== SIMULAÇÃO SÓCIO MEU TIMÃO ===\n");
// --- TESTE 1: Compra de Ingresso com Polimorfismo ---
console.log("--- Testando Compra de Ingressos ---");
try {
    const ingresso1 = bilheteria.processarCompra(torcedor1, partida);
    console.log(`[SUCESSO] ${torcedor1.getNome()} (${torcedor1.getPlano().getNome()}) comprou ingresso por R$ ${ingresso1.getValorPago().toFixed(2)}`);
    const ingresso2 = bilheteria.processarCompra(torcedor2, partida);
    console.log(`[SUCESSO] ${torcedor2.getNome()} (${torcedor2.getPlano().getNome()}) comprou ingresso por R$ ${ingresso2.getValorPago().toFixed(2)}`);
}
catch (error) {
    console.log(`[ERRO]: ${error.message}`);
}
console.log(`\nIngressos restantes para a partida: ${partida.getIngressosDisponiveis()}\n`);
// --- TESTE 2: Regra de Negócio (Inadimplência) ---
console.log("--- Testando Torcedor Inadimplente ---");
try {
    bilheteria.processarCompra(torcedor3, partida);
}
catch (error) {
    console.log(`[BLOQUEADO CORRETAMENTE]: ${error.message}`);
}
// --- TESTE 3: Desconto na Loja Oficial (ServicoDeBeneficios) ---
console.log("\n--- Testando Desconto na Loja (Camisa R$ 300,00) ---");
const valorCamisa = 300.00;
const precoFavela = beneficios.aplicarDescontoLoja(torcedor1, valorCamisa);
console.log(`${torcedor1.getNome()} (${torcedor1.getPlano().getNome()}): R$ ${precoFavela.toFixed(2)}`);
const precoDoutor = beneficios.aplicarDescontoLoja(torcedor2, valorCamisa);
console.log(`${torcedor2.getNome()} (${torcedor2.getPlano().getNome()}): R$ ${precoDoutor.toFixed(2)}`);
