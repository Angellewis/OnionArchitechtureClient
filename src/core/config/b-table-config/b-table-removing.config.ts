import { RowTable } from "@/core/typings/b-row-table";
import { BDialogConfig } from "buefy/types/components";

export default class BTableConfigRemoving<T> {
  public routeTo: string;
  public icon: string;
  public outlined: boolean;
  public type: string;
  public showConfirm: boolean;
  public confirm!: BDialogConfig;
  public successText: string;

  constructor() {
    this.successText = "Registro eliminado!";
    this.routeTo = "remove";
    this.icon = "delete";
    this.type = "is-danger";
    this.outlined = false;
    this.showConfirm = true;
  }
  setupDefaultConfirm(onConfirm: any, onCancel: any = undefined) {
    this.confirm = {
      title: "Confirmación",
      message: "¿Desea eliminar este registro?",
      confirmText: "Adelante!",
      cancelText: "Cancelar",
      type: "is-danger",
      size: "is-medium",
      hasIcon: true,
      onConfirm: onConfirm,
      onCancel: onCancel,
    };
  }
  public remove?(id: number, row: T, props: RowTable<T>): void;
  public isRemovableRow(row: Object): boolean {
    return true;
  }
}
