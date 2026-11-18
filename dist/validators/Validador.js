"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validador = void 0;
class Validador {
    proximo = null;
    /**
     * Conecta o próximo validador na cadeia.
     * Retorna o próprio próximo validador para permitir encadeamento fluente:
     * v1.conectar(v2).conectar(v3)
     */
    conectar(proximo) {
        this.proximo = proximo;
        return proximo;
    }
    /**
     * Método orquestrador (Template Method).
     * Executa a regra do elo atual e propaga para o próximo, se existir.
     * Lança exceção caso a regra falhe (estratégia fail-fast).
     */
    validar(item) {
        this.executarRegra(item);
        if (this.proximo) {
            this.proximo.validar(item);
        }
    }
}
exports.Validador = Validador;
