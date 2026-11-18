"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockTorcedorRepository = void 0;
const Torcedor_1 = __importDefault(require("../model/domain/Torcedor"));
const ValidadorNomeTorcedor_1 = require("../validators/torcedor/ValidadorNomeTorcedor");
const ValidadorCpfTorcedor_1 = require("../validators/torcedor/ValidadorCpfTorcedor");
const ValidadorSenhaTorcedor_1 = require("../validators/torcedor/ValidadorSenhaTorcedor");
const ValidadorCpfExistente_1 = require("../validators/torcedor/ValidadorCpfExistente");
const ServicoDeTorcedor_1 = __importDefault(require("../model/services/ServicoDeTorcedor"));
class MockTorcedorRepository {
    torcedores = [];
    salvar(torcedor) {
        this.torcedores.push(torcedor);
    }
    buscarPorCpf(cpf) {
        return this.torcedores.find((t) => t.getCpf() === cpf) ?? null;
    }
    listarTodos() {
        return [...this.torcedores];
    }
    buscarPorNome(termo) {
        const termoNormalizado = termo.trim().toLowerCase();
        return this.torcedores.filter((t) => t.getNome().toLowerCase().includes(termoNormalizado));
    }
    buscarPorPlano(nomePlano) {
        const planoNormalizado = nomePlano.trim().toLowerCase();
        return this.torcedores.filter((t) => {
            const plano = t.getPlano();
            return plano ? plano.getNome().toLowerCase() === planoNormalizado : false;
        });
    }
    listarOrdenadosPorNome() {
        return [...this.torcedores].sort((a, b) => a.getNome().localeCompare(b.getNome()));
    }
}
exports.MockTorcedorRepository = MockTorcedorRepository;
describe("Testes do Padrão Chain of Responsibility para Validação de Torcedor", () => {
    let mockRepo;
    beforeEach(() => {
        mockRepo = new MockTorcedorRepository();
    });
    describe("Elos individuais da cadeia", () => {
        test("ValidadorNomeTorcedor deve lançar erro se o nome tiver menos de 3 caracteres", () => {
            const validador = new ValidadorNomeTorcedor_1.ValidadorNomeTorcedor();
            const torcedorNomeCurto = new Torcedor_1.default("Zé", "123.456.789-00", "senha123");
            expect(() => validador.validar(torcedorNomeCurto)).toThrow("O nome do torcedor deve ter no mínimo 3 caracteres.");
        });
        test("ValidadorNomeTorcedor deve passar quando o nome é válido", () => {
            const validador = new ValidadorNomeTorcedor_1.ValidadorNomeTorcedor();
            const torcedorValido = new Torcedor_1.default("Danilo", "123.456.789-00", "senha123");
            expect(() => validador.validar(torcedorValido)).not.toThrow();
        });
        test("ValidadorCpfTorcedor deve lançar erro se o CPF não tiver 11 dígitos numéricos", () => {
            const validador = new ValidadorCpfTorcedor_1.ValidadorCpfTorcedor();
            const torcedorCpfInvalido = new Torcedor_1.default("Cassio Ramos", "123.45", "senha123");
            expect(() => validador.validar(torcedorCpfInvalido)).toThrow("O CPF informado é inválido. Deve conter 11 dígitos numéricos.");
        });
        test("ValidadorCpfTorcedor deve aceitar CPF com ou sem formatação (11 dígitos)", () => {
            const validador = new ValidadorCpfTorcedor_1.ValidadorCpfTorcedor();
            const comFormatacao = new Torcedor_1.default("Cassio", "123.456.789-00", "senha123");
            const semFormatacao = new Torcedor_1.default("Ronaldo", "12345678900", "senha123");
            expect(() => validador.validar(comFormatacao)).not.toThrow();
            expect(() => validador.validar(semFormatacao)).not.toThrow();
        });
        test("ValidadorSenhaTorcedor deve lançar erro para senhas com menos de 4 caracteres", () => {
            const validador = new ValidadorSenhaTorcedor_1.ValidadorSenhaTorcedor();
            const torcedorSenhaCurta = new Torcedor_1.default("Neto", "123.456.789-00", "123");
            expect(() => validador.validar(torcedorSenhaCurta)).toThrow("A senha deve ter no mínimo 4 caracteres.");
        });
        test("ValidadorCpfExistente deve lançar erro se o CPF já estiver cadastrado no repositório", () => {
            const torcedorCadastrado = new Torcedor_1.default("Marcelinho", "123.456.789-00", "senha123");
            mockRepo.salvar(torcedorCadastrado);
            const validador = new ValidadorCpfExistente_1.ValidadorCpfExistente(mockRepo);
            const novoTorcedorDuplicado = new Torcedor_1.default("Outro Marcelinho", "123.456.789-00", "outrasenha");
            expect(() => validador.validar(novoTorcedorDuplicado)).toThrow("Já existe um torcedor cadastrado com este CPF.");
        });
    });
    describe("Execução da cadeia completa através do ServicoDeTorcedor", () => {
        test("Deve cadastrar com sucesso quando todos os elos da cadeia forem satisfeitos", () => {
            const servico = new ServicoDeTorcedor_1.default(mockRepo);
            const torcedor = new Torcedor_1.default("Socrates Brasileiro", "123.456.789-00", "democracia1982");
            servico.cadastrar(torcedor);
            const buscado = servico.buscarPorCpf("123.456.789-00");
            expect(buscado).not.toBeNull();
            expect(buscado?.getNome()).toBe("Socrates Brasileiro");
        });
        test("Deve interromper no primeiro elo que falhar (fail-fast)", () => {
            const servico = new ServicoDeTorcedor_1.default(mockRepo);
            const torcedorInvalido = new Torcedor_1.default("A", "1", "1");
            expect(() => servico.cadastrar(torcedorInvalido)).toThrow("O nome do torcedor deve ter no mínimo 3 caracteres.");
        });
    });
});
