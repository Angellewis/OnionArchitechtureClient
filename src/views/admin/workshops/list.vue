<template>
  <div>
    <sx-buefy-table :config="tableConfig">
      <template v-slot:workshop="{ row }">
        <div class="media">
          <div class="media-left">
            <p class="icon-image-rounded has-background-primary">{{ formatWorkShopName(row.name) }}</p>
          </div>
          <div class="media-content">
            <p class="title is-6">
              <b-tooltip label="Detalles del workshop">
                <a @click="gotoDetails(row.id)" class="has-text-link">{{ row.name }}</a>
              </b-tooltip>
            </p>
          </div>
        </div>
      </template>
      <template v-slot:description="{ row }">
        <p class="title is-6">
          {{ row.description }}
        </p>
      </template>
      <template v-slot:startdate="{ row }">
        <p class="title is-6">
          {{ row.startdate }}
        </p>
      </template>
      <template v-slot:actions="{ row }">
        <b-button @click="addMember(row.id)" class="is-primary is-light" style="margin-right: 5px">
          <b-icon
          icon="account-group"
          ></b-icon>
        </b-button>
        <b-button @click="addMember(row.id)" class="is-primary is-light">
          <b-icon
          icon="calendar-today"
          ></b-icon>
        </b-button>
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
import { WorkShop } from "@/core/model";

@Component
export default class WorkShopListComponent extends Mixins<
  SxBuefyTableMixin<WorkShop>
>(SxBuefyTableMixin) {
  created() {
    this.setTableConfig();
    this.formatColumns();
  }
  setTableConfig() {
    this.tableConfig.controller = "WorkShop";
    this.tableConfig.aggregatable = true;
    this.tableConfig.aggregating.title = "Listado de WorkShops";
  }
  formatColumns() {
    let workshop = new BTableColumn("workshop", "Talleres");
    workshop.sortable = false;
    workshop.customTemplate = true;

    let description = new BTableColumn("description", "Descripcion");
    description.customTemplate = true;

    let startdate = new BTableColumn("startDate", "Fecha de inicio");
    startdate.type = BTableColumnType.Custom;
    startdate.customFilter = (value: WorkShop["startDate"]) =>
      Helpers.Filters.Date(value);

    let actions = new BTableColumn("actions", "Miembros/Dias");
    actions.customTemplate = true;

    this.tableConfig.insertColumns(workshop, description, startdate, actions);
  }

  formatWorkShopName(signature:string){
    let noIncludeSpace = !signature.includes(" ");
    if(noIncludeSpace) return "WS"
    return signature.split(" ").map(word => {
      return word[0].toUpperCase() + ""
    }).join("")
  }

  addMember(id: number) {
    this.$router.push(`/admin/workshopmembers/directadd/${id}`);
  }

  gotoDetails(id: number) {
    this.$router.push(`/admin/workshops/details/${id}`);
  }
}
</script>