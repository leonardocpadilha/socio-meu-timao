"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Torcedor {
    id;
    nome;
    cpf;
    data_nascimento;
    email;
    senha;
    adimplente = true;
    plano;
    constructor(nome, cpf, senha) {
        this.id = Date.now().toString();
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.data_nascimento = "";
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
        return this.data_nascimento;
    }
    setDataNascimento(data_nascimento) {
        this.data_nascimento = data_nascimento;
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
