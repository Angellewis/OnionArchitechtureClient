<template>
  <section>
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item title is-2">Agregar Taller</span>
      </div>
    </nav>
    <form @submit.prevent="validate">
      <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
        <template #trigger="props">
          <div
            class="card-header"
            role="button"
            aria-controls="contentIdForA11y3"
          >
            <p class="card-header-title">Datos del taller</p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
            </a>
          </div>
        </template>

        <div class="card-content">
          <div class="content">
            <div class="columns is-multiline">
              <div class="column">
                <b-field
                  label="Nombre*"
                  :type="{ 'is-danger': errors.has('name') }"
                  :message="errors.first('name')"
                >
                  <b-input
                    v-model="model.name"
                    name="name"
                    data-vv-as="nombre"
                    v-validate="'required'"
                    placeholder="Requerido"
                  />
                </b-field>
              </div>
               <div class="column">
                <b-field
                  label="Contenido*"
                  :type="{ 'is-danger': errors.has('contentSupport') }"
                  :message="errors.first('contentSupport')"
                >
                  <b-input
                    v-model="model.contentSupport"
                    data-vv-as="Soporte de contenido"
                    name="contentSupport"
                    v-validate="'required'"
                    placeholder="Requerido"
                  />
                </b-field>
              </div>
             
            </div>

            <div class="columns is-multiline">
               <div class="column">
                <b-field
                  label="fecha de Inicio*"
                  :type="{ 'is-danger': errors.has('startDate') }"
                  :message="errors.first('startDate')"
                >
                  <b-datepicker
                    v-model="model.startDate"
                    name="startDate"
                    data-vv-as="fecha de Inicio"
                    v-validate="'required'"
                    placeholder="dd/MM/yyyy"
                    icon="calendar-today"
                    locale="es"
                  >
                  </b-datepicker>
                </b-field>
              </div>

               <div class="column">
                <b-field
                  label="fecha de Final*"
                >
                  <b-datepicker
                    v-model="model.endDate"
                    name="endDate"
                    placeholder="dd/MM/yyyy"
                    icon="calendar-today"
                    locale="es"
                  >
                  </b-datepicker>
                </b-field>
              </div>

             
            </div>
             <div class="columns is-multiline">
              <div class="column">
                <b-field
                  label="Descripcion*"
                  :type="{ 'is-danger': errors.has('description') }"
                  :message="errors.first('description')"
                >
                  <b-input
                    type="textarea"
                    v-model="model.description"
                    name="description"
                    data-vv-as="descripcion"
                    v-validate="'required'"
                    placeholder="Requerido"
                  />
                </b-field>
              </div>
             </div>
          </div>
        </div>
      </b-collapse>
      <br/>
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <p class="level-item">
            <b-button
              :disabled="(modelDoNotChange && !errors.any()) || saving"
              type="is-light"
              @click="clean"
              icon-right="eraser"
              >Reiniciar</b-button
            >
          </p>
          <p class="level-item">
            <b-button
              type="is-danger"
              :disabled="saving"
              @click="cancel"
              icon-right="cancel"
              >Cancelar</b-button
            >
          </p>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <b-button
              type="is-primary"
              native-type="submit"
              :disabled="errors.any()"
              :loading="saving"
              icon-right="content-save"
              >Guardar</b-button
            >
          </p>
        </div>
      </nav>
    </form>
  </section>
</template>


<script lang="ts">
import { Component, Mixins, Vue } from "vue-property-decorator";
import { BaseFormAddMixin } from "@/mixins";
import { WorkShop, WorkShopMember } from "@/core/model";
@Component
export default class WorkShopAddComponent extends Mixins<
  BaseFormAddMixin<WorkShop>
>(BaseFormAddMixin) {

  private member: any;
  private memberArray: any;
  private loading: boolean = false;

    constructor() {
    super();
    this.controller = "WorkShop";
    this.model = new WorkShop();
    this.memberArray = [] = [WorkShopMember];
  }

  created() {
    this.loadingData();
  }

  loadingData() {
    try {
      this.loading = true;
      this.getMemberData().then((data) => {
        this.member = data;
      });
    } catch (error) {
      if (this.onError) this.onError(error);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>