"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorcedorRepositoryJson = void 0;
const fs_1 = __importDefault(require("fs"));
const Torcedor_1 = __importDefault(require("../model/domain/Torcedor"));
const PlanoFielDemocracia_1 = __importDefault(require("../model/plans/PlanoFielDemocracia"));
const PlanoFielInvasao_1 = __importDefault(require("../model/plans/PlanoFielInvasao"));
const PlanoFielMundial_1 = __importDefault(require("../model/plans/PlanoFielMundial"));
class TorcedorRepositoryJson {
    caminhoArquivo = "src/database/torcedores.json";
    lerDados() {
        const arquivo = fs_1.default.readFileSync(this.caminhoArquivo, "utf-8");
        const dados = JSON.parse(arquivo);
        return dados;
    }
    salvar(torcedor) {
        const dados = this.lerDados();
        dados.torcedores.push(torcedor);
        const json = JSON.stringify(dados, null, 2);
        fs_1.default.writeFileSync(this.caminhoArquivo, json, "utf-8");
    }
    buscarPorCpf(cpf) {
        const dados = this.lerDados();
        const torcedorEncontrado = dados.torcedores.find((t) => t.cpf === cpf);
        if (torcedorEncontrado) {
            const torcedor = new Torcedor_1.default(torcedorEncontrado.nome, torcedorEncontrado.cpf, torcedorEncontrado.senha);
            torcedor.setDataNascimento(torcedorEncontrado.dataNascimento);
            torcedor.setAdimplente(torcedorEncontrado.adimplente);
            torcedor.setPlano(this.criarPlano(torcedorEncontrado.plano?.nome));
            return torcedor;
        }
        return null;
    }
    criarPlano(nome) {
        switch (nome) {
            case undefined:
                return null;
            case "Plano Fiel Democracia":
                return new PlanoFielDemocracia_1.default();
            case "Plano Fiel Invasao":
                return new PlanoFielInvasao_1.default();
            case "Plano Fiel Mundial":
                return new PlanoFielMundial_1.default();
            default:
                throw new Error(`Plano salvo desconhecido: ${nome}`);
        }
    }
}
exports.TorcedorRepositoryJson = TorcedorRepositoryJson;
