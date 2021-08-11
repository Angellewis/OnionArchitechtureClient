<template>
  <div>
    <sx-buefy-table :config="tableConfig"></sx-buefy-table>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { SxBuefyTableMixin } from "@/mixins";
import { IUser } from "@/core/abstract";
import { BTableColumn } from "@/core/models";

@Component
export default class UserTableComponent extends Mixins<SxBuefyTableMixin<IUser>>(SxBuefyTableMixin) {
  created() {
    this.setTableConfig();
    this.formatColumns();
  }
  setTableConfig() {
    this.tableConfig.controller = "User";
    this.tableConfig.aggregatable = true;
    this.tableConfig.aggregating.title = "Usuarios";
  }
  formatColumns() {
    let nombre = new BTableColumn("name", "Nombre");
    this.tableConfig.insertColumns(nombre);
  }
}
</script>