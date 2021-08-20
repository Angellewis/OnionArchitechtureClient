<template>
  <div>
    <sx-buefy-table :config="tableConfig">
      <template v-slot:role="{ row }">
        <div class="media">
          <div class="media-content">
            <p class="title is-6">
                {{ row.role }}
            </p>
          </div>
        </div>
      </template>
      <template v-slot:workShopId="{ row }">
        <p class="title is-6">
          <b-tooltip label="Detalles no disponible">
          <a class="has-text-link cursor-ban">
            {{ row.workShopId }}
          </a>
        </b-tooltip>
        </p>
      </template>
      <template v-slot:userId="{ row }">
        <p class="title is-6">
          <b-tooltip label="Detalles no disponible">
          <a class="has-text-link cursor-ban">
            {{ row.userId }}
          </a>
        </b-tooltip>
        </p>
      </template>
    </sx-buefy-table>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { SxBuefyTableMixin } from "@/mixins";
import { BTableColumn } from "@/components/sx/sx-buefy-table/config";
import Helpers from "@/core/utils/helpers";
import { BTableColumnType, WorkShopMemberRole } from "@/core/utils/enums";
import { WorkShopMember } from "@/core/model";

@Component
export default class WorkShopMemberListComponent extends Mixins<
  SxBuefyTableMixin<WorkShopMember>
>(SxBuefyTableMixin) {
  created() {
    this.setTableConfig();
    this.formatColumns();
  }
  setTableConfig() {
    this.tableConfig.controller = "WorkShopMember";
    this.tableConfig.aggregatable = true;
    this.tableConfig.aggregating.title = "Listado de miembros";
    this.tableConfig.aggregating.btnText= "Agregar miembros"
  }
  formatColumns() {
    let role = new BTableColumn("role", "Rol");
    role.type = BTableColumnType.Custom;
    role.customFilter = (value: WorkShopMemberRole) => Helpers.Filters.WorkShopMemberRole(value);

    let workShopId = new BTableColumn("workShopId", "Taller");
    workShopId.customTemplate = true;

    let userId = new BTableColumn("userId", "Usuario");
    userId.customTemplate = true;

    this.tableConfig.insertColumns(role, workShopId, userId);
  }
}
</script>