<template>
  <section>
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item title is-2">Agregar dias al taller</span>
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
            <p class="card-header-title">Datos del dia</p>
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
                  label="Día*"
                  :type="{ 'is-danger': errors.has('weekDay') }"
                  :message="errors.first('weekDay')"
                >
                  <b-select
                    expanded
                    v-model="model.day"
                    placeholder="Requerido"
                    name="weekDay"
                    data-vv-as="Día"
                    v-validate="'required'"
                  >
                    <option :value="0">Lunes</option>
                    <option :value="1">Martes</option>
                    <option :value="2">Miércoles</option>
                    <option :value="3">Jueves</option>
                    <option :value="4">Viernes</option>
                    <option :value="5">Sábado</option>
                    <option :value="6">Domingo</option>
                  </b-select>
                </b-field>
                <b-field
                  label="Hora de inicio*"
                  :type="{ 'is-danger': errors.has('startHour') }"
                  :message="errors.first('startHour')"
                >
                  <b-clockpicker
                    rounded
                    v-model="model.startHour"
                    name="startHour"
                    placeholder="Requerido"
                    data-vv-as="Hora de inicio"
                    v-validate="'required'"
                    icon="clock"
                  >
                  </b-clockpicker>
                </b-field>
                <b-field
                  label="Ubicación*"
                  :type="{ 'is-danger': errors.has('modeLocation') }"
                  :message="errors.first('modeLocation')"
                >
                  <b-input
                    v-model="model.modeLocation"
                    name="modeLocation"
                    data-vv-as="Ubicación"
                    v-validate="'required'"
                    placeholder="Requerido"
                  />
                </b-field>
              </div>
              <div class="column">
                <b-field
                  label="Modo del WorkShop*"
                  :type="{ 'is-danger': errors.has('workShopDayMode') }"
                  :message="errors.first('workShopDayMode')"
                >
                  <b-select
                    expanded
                    v-model="model.mode"
                    placeholder="Requerido"
                    name="workShopDayMode"
                    data-vv-as="Modo del WorkShop"
                    v-validate="'required'"
                  >
                    <option :value="0">Presencial</option>
                    <option :value="1">Virtual</option>
                  </b-select>
                </b-field>

                <b-field label="Hora de fin">
                  <b-clockpicker
                    rounded
                    v-model="model.endHour"
                    name="endHour"
                    placeholder="Opcional"
                    icon="clock"
                  >
                  </b-clockpicker>
                </b-field>
                <b-field
                  label="Taller*"
                  :type="{ 'is-danger': errors.has('workShopId') }"
                  :message="errors.first('workShopId')"
                >
                  <b-select
                    icon="cogs"
                    name="workShopId"
                    :loading="this.loading"
                    expanded
                    v-model="model.workShopId"
                    placeholder="Seleccione el taller"
                    data-vv-as="Taller"
                  >
                    <option
                      v-for="option in this.WorkShop"
                      :value="option.id"
                      :key="option.id"
                    >
                      Taller: {{ option.id }}, "{{ option.name }}".
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>
      <br />

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
import { BaseFormEditMixin } from "@/mixins";
import { WorkShopDay } from "@/core/model";

@Component
export default class WorkShopDayEditComponent extends Mixins<BaseFormEditMixin<WorkShopDay>>(
  BaseFormEditMixin
) {
  uploading = false;
  successUpload = false;
  private WorkShop: any;

  isActiveChangePasswordModal = false;
  constructor() {
    super();
    this.controller = "WorkShopDay";
    this.model = new WorkShopDay();
    this.WorkShop = [];
  }

  created() {
    this.loadingData();
  }

  loadingData() {
    this.loading = true;
    try {
      this.getWorkShopData().then((data) => {
        this.WorkShop = data;
      });
    } catch (error) {
      if (this.onError) this.onError(error);
    } finally {
      this.loading = false;
    }
  }

  async getData() {
    try {
      if (this.modelToEdit && !this.loadFromAPI)
        this.model = this.map<WorkShopDay>(this.modelToEdit);
      else {
        this.loading = true;
        const response = await this.service.getById(this.id);
        this.model = response.data;
        this.model.startHour = new Date(this.model.startHour as string);
        this.model.endHour = new Date(this.model.endHour as string);
      }
      this.modelInit = this.map<WorkShopDay>(this.model);
    } catch (errors) {
      this.operationFailedErrors(errors);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style lang="css">
.p-2rem {
  padding: 2rem;
}
</style>