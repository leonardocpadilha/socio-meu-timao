"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Torcedor {
    id;
    nome;
    cpf;
    dataNascimento;
    email;
    senha;
    adimplente;
    plano;
    constructor(nome, cpf, senha) {
        this.id = Date.now().toString();
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.dataNascimento = "";
        this.email = "";
        this.adimplente = true;
        this.plano = null;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
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
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
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
