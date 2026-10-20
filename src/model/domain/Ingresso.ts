import Partida from "./Partida";
import Torcedor from "./Torcedor";
import { StatusIngresso } from "../../enum/StatusIngresso";

export default class Ingresso {
  private torcedor: Torcedor;
  private partida: Partida;
  private valorPago: number;
  private status: StatusIngresso;

  public constructor(torcedor: Torcedor, partida: Partida, valorPago: number) {
    this.torcedor = torcedor;
    this.partida = partida;
    this.valorPago = valorPago;
    this.status = StatusIngresso.ATIVO;
  }

  public getTorcedor(): Torcedor {
    return this.torcedor;
  }

  public getPartida(): Partida {
    return this.partida;
  }

  public getValorPago(): number {
    return this.valorPago;
  }

  public getStatus(): StatusIngresso {
    return this.status;
  }

  public liberar(): boolean {
    if (this.status === StatusIngresso.ATIVO) {
      this.status = StatusIngresso.CANCELADO;
      this.partida.liberarIngresso();
      return true;
    }

    return false;
  }
}
