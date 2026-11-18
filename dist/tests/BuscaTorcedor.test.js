"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Torcedor_1 = __importDefault(require("../model/domain/Torcedor"));
const PlanoFielDemocracia_1 = __importDefault(require("../model/plans/PlanoFielDemocracia"));
const PlanoFielInvasao_1 = __importDefault(require("../model/plans/PlanoFielInvasao"));
const ServicoDeTorcedor_1 = __importDefault(require("../model/services/ServicoDeTorcedor"));
const ValidadorTorcedor_test_1 = require("./ValidadorTorcedor.test");
describe("Testes de Busca Especializada e Ordenação de Torcedores", () => {
    let repo;
    let servico;
    beforeEach(() => {
        repo = new ValidadorTorcedor_test_1.MockTorcedorRepository();
        servico = new ServicoDeTorcedor_1.default(repo);
        // Massa de dados para os testes
        const t1 = new Torcedor_1.default("Mariana Ferreira", "111.111.111-11", "senha1");
        t1.setPlano(new PlanoFielInvasao_1.default());
        const t2 = new Torcedor_1.default("Marcelo da Silva", "222.222.222-22", "senha2");
        t2.setPlano(new PlanoFielDemocracia_1.default());
        const t3 = new Torcedor_1.default("Ana Claudia Silva", "333.333.333-33", "senha3");
        t3.setPlano(new PlanoFielInvasao_1.default());
        const t4 = new Torcedor_1.default("Carlos Eduardo", "444.444.444-44", "senha4");
        // Sem plano
        repo.salvar(t1);
        repo.salvar(t2);
        repo.salvar(t3);
        repo.salvar(t4);
    });
    describe("Listagem geral", () => {
        test("Deve listar todos os torcedores cadastrados", () => {
            const todos = servico.listarTodos();
            expect(todos.length).toBe(4);
        });
    });
    describe("Busca especializada por parte do nome (substring / case-insensitive)", () => {
        test("Deve encontrar torcedores contendo 'Silva' no nome", () => {
            const resultado = servico.buscarPorNome("Silva");
            expect(resultado.length).toBe(2);
            const nomes = resultado.map((t) => t.getNome());
            expect(nomes).toContain("Marcelo da Silva");
            expect(nomes).toContain("Ana Claudia Silva");
        });
        test("Deve ser case-insensitive (maiúsculas e minúsculas)", () => {
            const resultado = servico.buscarPorNome("mariana");
            expect(resultado.length).toBe(1);
            expect(resultado[0].getNome()).toBe("Mariana Ferreira");
        });
        test("Deve retornar lista vazia se nenhum torcedor corresponder ao termo", () => {
            const resultado = servico.buscarPorNome("Zico");
            expect(resultado.length).toBe(0);
        });
    });
    describe("Busca especializada por plano", () => {
        test("Deve retornar apenas torcedores do 'Plano Fiel Invasao'", () => {
            const resultado = servico.buscarPorPlano("Plano Fiel Invasao");
            expect(resultado.length).toBe(2);
            const nomes = resultado.map((t) => t.getNome());
            expect(nomes).toContain("Mariana Ferreira");
            expect(nomes).toContain("Ana Claudia Silva");
        });
        test("Deve retornar vazio para um plano que nenhum torcedor possui", () => {
            const resultado = servico.buscarPorPlano("Plano Fiel Mundial");
            expect(resultado.length).toBe(0);
        });
    });
    describe("Ordenação alfabética por nome (A-Z)", () => {
        test("Deve retornar a lista ordenada alfabeticamente por nome", () => {
            const ordenados = servico.listarOrdenadosPorNome();
            const nomes = ordenados.map((t) => t.getNome());
            expect(nomes).toEqual([
                "Ana Claudia Silva",
                "Carlos Eduardo",
                "Marcelo da Silva",
                "Mariana Ferreira",
            ]);
        });
    });
});
