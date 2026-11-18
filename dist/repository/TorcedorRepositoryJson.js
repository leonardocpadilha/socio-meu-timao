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
        try {
            const arquivo = fs_1.default.readFileSync(this.caminhoArquivo, "utf-8");
            const dados = JSON.parse(arquivo);
            return dados;
        }
        catch (error) {
            throw new Error("Falha ao ler o banco de dados de torcedores.");
        }
    }
    salvar(torcedor) {
        const dados = this.lerDados();
        const plano = torcedor.getPlano();
        dados.torcedores.push({
            nome: torcedor.getNome(),
            cpf: torcedor.getCpf(),
            dataNascimento: torcedor.getDataNascimento(),
            senha: torcedor.getSenha(),
            adimplente: torcedor.getAdimplente(),
            plano: plano ? { nome: plano.getNome() } : null,
        });
        try {
            const json = JSON.stringify(dados, null, 2);
            fs_1.default.writeFileSync(this.caminhoArquivo, json, "utf-8");
        }
        catch (error) {
            throw new Error("Falha ao gravar no banco de dados de torcedores.");
        }
    }
    buscarPorCpf(cpf) {
        const dados = this.lerDados();
        const torcedorEncontrado = dados.torcedores.find((t) => t.cpf === cpf);
        return torcedorEncontrado ? this.instanciarTorcedor(torcedorEncontrado) : null;
    }
    listarTodos() {
        const dados = this.lerDados();
        return dados.torcedores.map((t) => this.instanciarTorcedor(t));
    }
    buscarPorNome(termo) {
        const termoNormalizado = termo.trim().toLowerCase();
        return this.listarTodos().filter((t) => t.getNome().toLowerCase().includes(termoNormalizado));
    }
    buscarPorPlano(nomePlano) {
        const planoNormalizado = nomePlano.trim().toLowerCase();
        return this.listarTodos().filter((t) => {
            const plano = t.getPlano();
            return plano ? plano.getNome().toLowerCase() === planoNormalizado : false;
        });
    }
    listarOrdenadosPorNome() {
        return this.listarTodos().sort((a, b) => a.getNome().localeCompare(b.getNome(), "pt-BR", { sensitivity: "base" }));
    }
    instanciarTorcedor(dado) {
        const torcedor = new Torcedor_1.default(dado.nome, dado.cpf, dado.senha);
        torcedor.setDataNascimento(dado.dataNascimento);
        torcedor.setAdimplente(dado.adimplente);
        torcedor.setPlano(this.criarPlano(dado.plano?.nome));
        return torcedor;
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
                return null;
        }
    }
}
exports.TorcedorRepositoryJson = TorcedorRepositoryJson;
