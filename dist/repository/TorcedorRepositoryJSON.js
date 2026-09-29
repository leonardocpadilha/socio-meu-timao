"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TorcedorRepositoryJSON = void 0;
const fs_1 = __importDefault(require("fs"));
class TorcedorRepositoryJSON {
    filePath = 'src/database/torcedores.json';
    salvar(torcedor) {
        const arquivo = fs_1.default.readFileSync(this.filePath, 'utf-8');
        const dados = JSON.parse(arquivo);
        dados.torcedores.push(torcedor);
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(dados, null, 2));
    }
    buscarPorCpf(cpf) {
        const arquivo = fs_1.default.readFileSync(this.filePath, 'utf-8');
        const dados = JSON.parse(arquivo);
        const torcedorEncontrado = dados.torcedores.find((torcedor) => torcedor.cpf === cpf);
        return torcedorEncontrado || null;
    }
}
exports.TorcedorRepositoryJSON = TorcedorRepositoryJSON;
