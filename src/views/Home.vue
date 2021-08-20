<template>
  <div class="home">
    <div class="columns">
      <div v-for="items in this.workshop" :key="items.id" class="column">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <p class="icon-image-rounded" :style="{backgroundColor: getRandomColor()}">
                  {{ formatWorkShopName(items.name) }}
                </p>
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ items.name }}</p>
              <p class="subtitle is-6">
                Fecha de inicio: {{ convertDate(items.startDate) }}
              </p>
            </div>
          </div>

          <div class="content">
            {{ items.description }}
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { BaseService } from "@/core/services";
import { WorkShop } from "@/core/model/workshop.model";
import { ODataQuery } from "@/core/infraestructure/odata";
import Helpers from "@/core/utils/helpers";
import {
  BTableConfigSorting,
  BTableConfigPagination,
} from "@/components/sx/sx-buefy-table/config";

@Component
export default class Home extends Vue {
  public controller: string = "WorkShop";
  public loading: boolean = false;
  public resource!: string;
  public sorting: BTableConfigSorting;
  public pagination: BTableConfigPagination<WorkShop>;
  public $filter!: string;
  public $expand!: string;
  private service = new BaseService<WorkShop>(this.controller);
  public onError?: (erorr: any) => void;
  public workshop: any;

  constructor() {
    super();
    this.pagination = new BTableConfigPagination();
    this.sorting = new BTableConfigSorting();
    this.workshop = [WorkShop];
  }

  created() {
    this.getData();
  }

  get apiService() {
    return this.service.controller
      ? this.service
      : new BaseService<WorkShop>(this.controller);
  }
  getODataQuery(): ODataQuery {
    let instace = new ODataQuery();
    instace.$orderby =
      this.sorting.field + (this.sorting.order === "desc" ? " desc" : "");
    instace.$skip = (this.pagination.currentPage - 1) * this.pagination.perPage;
    instace.$top = this.pagination.perPage;
    instace.$filter = this.$filter;
    instace.$expand = this.$expand;
    return instace;
  }

  async getData(callback?: (payload: WorkShop[]) => void) {
    this.loading = true;
    const resource = this.resource || "";
    const odataQuery = this.getODataQuery();
    try {
      const response = await this.apiService.getAll(resource, odataQuery);
      const value = response.data.value;
      this.workshop = value.slice(0, 3);
    } catch (error) {
      if (this.onError) this.onError(error);
    } finally {
      this.loading = false;
    }
  }

  formatWorkShopName(signature: string) {
    let noIncludeSpace = !signature.includes(" ");
    if (noIncludeSpace) return "WS";
    return signature
      .split(" ")
      .map((word) => {
        return word[0].toUpperCase() + "";
      })
      .join("");
  }

  convertDate(date: string) {
    let dateProcessor = date.split("T")[0].trim().split("-");
    let newDate =
      dateProcessor[1] + "/" + dateProcessor[2] + "/" + dateProcessor[0];
    return newDate;
  }

  getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
</script>

<style scoped>
.home {
  margin-left: 50px;
  margin-top: 50px;
}

.column .card {
  height: auto;
  width: 350px;
  margin-left: 10px;
  text-align: center;
}
</style>
