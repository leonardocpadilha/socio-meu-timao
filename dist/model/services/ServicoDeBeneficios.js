"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServicoDeBeneficios {
    aplicarDescontoLoja(torcedor, valorProduto) {
        if (!torcedor.getAdimplente()) {
            throw new Error("Torcedor inadimplente.");
        }
        return torcedor.getPlano().calcularDescontoLoja(valorProduto);
    }
}
exports.default = ServicoDeBeneficios;
