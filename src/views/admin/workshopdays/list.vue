<template>
  <div>
    <sx-buefy-table :config="tableConfig">
      <template v-slot:modeLocation="{ row }">
        <div class="media">
          <div class="media-content">
            <p class="title is-6">
              {{ row.modeLocation }}
            </p>
          </div>
        </div>
      </template>
      <template v-slot:workShopId="{ row }">
        <b-tooltip label="Detalles no disponible">
          <a class="has-text-link cursor-ban">
            {{ row.workShopId }}
          </a>
        </b-tooltip>
      </template>
      <template v-slot:startHour="{ row }">
        <p class="title is-6">
          {{ row.startHour }}
        </p>
      </template>
      <template v-slot:endHour="{ row }">
        <p class="title is-6">
          {{ row.endHour }}
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
import { BTableColumnType, WeekDay, WorkShopDayMode } from "@/core/utils/enums";
import { WorkShopDay } from "@/core/model";

@Component
export default class WorkShopDayListComponent extends Mixins<
  SxBuefyTableMixin<WorkShopDay>
>(SxBuefyTableMixin) {
  created() {
    this.setTableConfig();
    this.formatColumns();
  }
  setTableConfig() {
    this.tableConfig.controller = "WorkShopDay";
    this.tableConfig.aggregatable = true;
    this.tableConfig.aggregating.title = "Listado de dias";
    this.tableConfig.aggregating.btnText = "Agregar dias";
  }
  formatColumns() {
    let day = new BTableColumn("day", "Dia");
    day.type = BTableColumnType.Custom;
    day.customFilter = (value: WeekDay) =>
      Helpers.Filters.WorkShopDayday(value);

    let mode = new BTableColumn("mode", "Modalidad");
    mode.type = BTableColumnType.Custom;
    mode.customFilter = (value: WorkShopDayMode) =>
      Helpers.Filters.WorkShopDayMode(value);

    let modeLocation = new BTableColumn("modeLocation", "Ubicacion");
    modeLocation.customTemplate = true;

    let workShopId = new BTableColumn("workShopId", "Taller");
    workShopId.customTemplate = true;

    let startHour = new BTableColumn("startHour", "Hora de inicio");
    startHour.type = BTableColumnType.Custom;
    startHour.customFilter = (value: WorkShopDay["startHour"]) =>
      Helpers.Filters.Time(value);

    let endHour = new BTableColumn("endHour", "Hora de finalizacion");
    endHour.type = BTableColumnType.Custom;
    endHour.customFilter = (value: WorkShopDay["endHour"]) =>
      Helpers.Filters.Time(value);

    this.tableConfig.insertColumns(day, mode, modeLocation, workShopId, startHour, endHour);
  }
}
</script>