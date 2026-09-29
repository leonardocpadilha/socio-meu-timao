"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServicoDeBeneficios {
    aplicarDescontoLoja(torcedor, valorProduto) {
        if (!torcedor.getAdimplente()) {
            return valorProduto;
        }
        const plano = torcedor.getPlano();
        if (!plano) {
            return valorProduto;
        }
        return plano.calcularDescontoLoja(valorProduto);
    }
}
exports.default = ServicoDeBeneficios;
