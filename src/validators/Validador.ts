export abstract class Validador<T> {
  private proximo: Validador<T> | null = null;

  public conectar(proximo: Validador<T>): Validador<T> {
    this.proximo = proximo;
    return proximo;
  }

  public validar(item: T): void {
    this.executarRegra(item);

    if (this.proximo) {
      this.proximo.validar(item);
    }
  }

  protected abstract executarRegra(item: T): void;
}
