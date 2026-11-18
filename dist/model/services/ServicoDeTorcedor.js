"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidadorNomeTorcedor_1 = require("../../validators/torcedor/ValidadorNomeTorcedor");
const ValidadorCpfTorcedor_1 = require("../../validators/torcedor/ValidadorCpfTorcedor");
const ValidadorSenhaTorcedor_1 = require("../../validators/torcedor/ValidadorSenhaTorcedor");
const ValidadorCpfExistente_1 = require("../../validators/torcedor/ValidadorCpfExistente");
class ServicoDeTorcedor {
    repository;
    validador;
    constructor(repository, validador) {
        this.repository = repository;
        if (validador) {
            this.validador = validador;
        }
        else {
            const vNome = new ValidadorNomeTorcedor_1.ValidadorNomeTorcedor();
            const vCpf = new ValidadorCpfTorcedor_1.ValidadorCpfTorcedor();
            const vSenha = new ValidadorSenhaTorcedor_1.ValidadorSenhaTorcedor();
            const vCpfExistente = new ValidadorCpfExistente_1.ValidadorCpfExistente(repository);
            vNome.conectar(vCpf).conectar(vSenha).conectar(vCpfExistente);
            this.validador = vNome;
        }
    }
    cadastrar(torcedor) {
        this.validador.validar(torcedor);
        this.repository.salvar(torcedor);
    }
    buscarPorCpf(cpf) {
        return this.repository.buscarPorCpf(cpf);
    }
}
exports.default = ServicoDeTorcedor;
