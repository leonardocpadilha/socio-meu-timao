import Torcedor from "../model/domain/Torcedor";
import Partida from "../model/domain/Partida";
import PlanoFielDemocracia from "../model/plans/PlanoFielDemocracia";
import ServicoDeBilheteria from "../model/services/ServicoDeBilheteria";

describe("Teste do Serviço de Bilheteria para compra de ingresso", () => {
  test("Deve realizar a compra do ingresso com desconto e reduzir as vagas", () => {
    let torcedor = new Torcedor("Ana", "109.514.468-10", "senha123");
    torcedor.setPlano(new PlanoFielDemocracia());
    let partida = new Partida("São Paulo", 100, 10);
    let servico = new ServicoDeBilheteria();
    let ingresso = servico.processarCompra(torcedor, partida);

    expect(ingresso?.getValorPago()).toBe(75);
    expect(partida.getIngressosDisponiveis()).toBe(9);
  });

  test("Não deve realizar a compra do ingresso quando o torcedor está inadimplente", () => {
    let torcedor = new Torcedor("Ana", "123", "senha");
    torcedor.setPlano(new PlanoFielDemocracia());
    torcedor.setAdimplente(false);
    let partida = new Partida("Palmeiras", 100, 10);
    let servico = new ServicoDeBilheteria();
    let ingresso = servico.processarCompra(torcedor, partida);

    expect(ingresso).toBeNull();
    expect(partida.getIngressosDisponiveis()).toBe(10);
  });

  test("Não deve realizar a compra do ingresso quando a partida não possui ingressos disponíveis", () => {
    let torcedor = new Torcedor("Jose", "695.845.362-39", "senhaFraca");
    torcedor.setPlano(new PlanoFielDemocracia());
    let partida = new Partida("Palmeiras", 100, 0);
    let servico = new ServicoDeBilheteria();
    let ingresso = servico.processarCompra(torcedor, partida);

    expect(ingresso).toBeNull();
    expect(partida.getIngressosDisponiveis()).toBe(0);
  });

  test("Não deve realizar a comprar do ingresso quando o torcedor não tem plano", () => {
    let torcedor = new Torcedor("Fabio", "110.321.964-17", "senhaForte");
    let partida = new Partida("Santos", 100, 10);
    let servico = new ServicoDeBilheteria();
    let ingresso = servico.processarCompra(torcedor, partida);

    expect(ingresso).toBeNull();
    expect(partida.getIngressosDisponiveis()).toBe(10);
  });
});
