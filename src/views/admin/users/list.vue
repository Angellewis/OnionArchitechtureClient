<template>
  <div>
    <sx-buefy-table :config="tableConfig">
      <template v-slot:fullName="{ row }">
        <div class="media">
          <div class="media-left">
            <figure class="image is-48x48">
              <img
                src="https://bulma.io/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-6">
              <b-tooltip label="Perfil no disponible">
                <a class="has-text-link">{{ row.fullName }}</a>
              </b-tooltip>
            </p>
            <p class="subtitle is-6">@{{ row.userName }}</p>
          </div>
        </div>
      </template>
      <template v-slot:documentType="{ row }">
        <p class="title is-6">
          {{ row.documentTypeValue | documentTypeValue(row.documentType) }}
        </p>
        <p class="subtitle is-6">{{ row.documentType | documentType }}</p>
      </template>
    </sx-buefy-table>
  </div>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { SxBuefyTableMixin } from "@/mixins";
import { IUser } from "@/core/model";
import { BTableColumn } from "@/components/sx/sx-buefy-table/config";
import Helpers from "@/core/utils/helpers";
import { BTableColumnType, UserRole } from "@/core/utils/enums";

@Component
export default class UserTableComponent extends Mixins<
  SxBuefyTableMixin<IUser>
>(SxBuefyTableMixin) {
  created() {
    this.setTableConfig();
    this.formatColumns();
  }
  setTableConfig() {
    this.tableConfig.controller = "User";
    this.tableConfig.aggregatable = true;
    this.tableConfig.aggregating.title = "Usuarios";
    this.tableConfig.pagination.quantityOptions.unshift(1, 2, 3);
  }
  formatColumns() {
    let fullName = new BTableColumn("fullName", "Usuario");
    fullName.sortable = false;
    fullName.customTemplate = true;
    let documentType = new BTableColumn("documentType", "Identificación");
    documentType.customTemplate = true;
    let role = new BTableColumn("userRole", "Rol");
    role.type = BTableColumnType.Custom;
    role.customFilter = (value: UserRole) => Helpers.Filters.UserRole(value);

    this.tableConfig.insertColumns(fullName, documentType, role);
  }
}
</script>