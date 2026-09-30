"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorcedorRepositoryJson = void 0;
const fs_1 = __importDefault(require("fs"));
const Torcedor_1 = __importDefault(require("../model/domain/Torcedor"));
class TorcedorRepositoryJson {
    caminhoArquivo = "src/database/torcedores.json";
    lerDados() {
        const arquivo = fs_1.default.readFileSync(this.caminhoArquivo, "utf-8");
        const dados = JSON.parse(arquivo);
        return dados;
    }
    salvar(torcedor) {
        const dados = this.lerDados();
        const torcedores = dados.torcedores;
        torcedores.push(torcedor);
        const json = JSON.stringify(dados);
        fs_1.default.writeFileSync(this.caminhoArquivo, json, "utf-8");
    }
    buscarPorCpf(cpf) {
        const dados = this.lerDados();
        const torcedores = dados.torcedores;
        const torcedorEncontrado = torcedores.find((torcedor) => torcedor.cpf === cpf);
        if (torcedorEncontrado) {
            const torcedor = new Torcedor_1.default(torcedorEncontrado.nome, torcedorEncontrado.cpf, torcedorEncontrado.senha);
            torcedor.setId(torcedorEncontrado.id);
            torcedor.setDataNascimento(torcedorEncontrado.data_nascimento);
            torcedor.setEmail(torcedorEncontrado.email);
            torcedor.setAdimplente(torcedorEncontrado.adimplente);
            torcedor.setPlano(torcedorEncontrado.plano);
            return torcedor;
        }
        return null;
    }
}
exports.TorcedorRepositoryJson = TorcedorRepositoryJson;
