import { StatusCompra } from "../../enum/StatusCompra";
import Ingresso from "./Ingresso";

export class Compra {
  private status: StatusCompra;

  constructor(private ingresso: Ingresso) {
    this.status = StatusCompra.PENDENTE;
  }

  public aprovar(): void {
    if (this.status !== StatusCompra.PENDENTE) {
      return;
    }
    this.status = StatusCompra.APROVADA;
  }

  public cancelar(): void {
    if (this.status !== StatusCompra.PENDENTE) {
      return;
    }
    this.ingresso.liberar();
    this.status = StatusCompra.CANCELADA;
  }

  public getStatus(): StatusCompra {
    return this.status;
  }
}
