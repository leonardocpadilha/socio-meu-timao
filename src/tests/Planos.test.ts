import PlanoFielDemocracia from "../model/plans/PlanoFielDemocracia";
import PlanoFielInvasao from "../model/plans/PlanoFielInvasao";
import PlanoFielMundial from "../model/plans/PlanoFielMundial";

describe("Testes de cálculo de desconto dos planos", () => {
  test("Deve calcular o valor do ingresso com 25% de desconto para o Plano Fiel Democracia", () => {
    let plano = new PlanoFielDemocracia();
    let valorComDesconto = plano.calcularValorIngresso(100);

    expect(valorComDesconto).toBe(75);
  });

  test("Deve calcular o valor do ingresso com 50% de desconto para o Plano Fiel Invasão", () => {
    let plano = new PlanoFielInvasao();
    let valorComDesconto = plano.calcularValorIngresso(100);

    expect(valorComDesconto).toBe(50);
  });

  test("Deve calcular o valor do ingresso com 75% de desconto para o Plano Fiel Mundial", () => {
    let plano = new PlanoFielMundial();
    let valorComDesconto = plano.calcularValorIngresso(100);

    expect(valorComDesconto).toBe(25);
  });
});
