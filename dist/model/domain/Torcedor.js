"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Torcedor {
    nome;
    cpf;
    dataNascimento;
    senha;
    adimplente;
    plano;
    constructor(nome, cpf, senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.dataNascimento = "";
        this.adimplente = true;
        this.plano = null;
    }
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }
    getCpf() {
        return this.cpf;
    }
    setCpf(cpf) {
        this.cpf = cpf;
    }
    getSenha() {
        return this.senha;
    }
    setSenha(senha) {
        this.senha = senha;
    }
    getDataNascimento() {
        return this.dataNascimento;
    }
    setDataNascimento(dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
    getAdimplente() {
        return this.adimplente;
    }
    setAdimplente(adimplente) {
        this.adimplente = adimplente;
    }
    getPlano() {
        return this.plano;
    }
    setPlano(plano) {
        this.plano = plano;
    }
}
exports.default = Torcedor;
