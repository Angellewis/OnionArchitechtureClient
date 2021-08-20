<template>
  <section>
    <nav class="navbar">
      <div class="navbar-brand">
        <span class="navbar-item title is-2">Agregar miembros</span>
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
            <p class="card-header-title">Datos generales</p>
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
                  label="Taller*"
                >
                  <b-select
                    icon="cogs"
                    :loading="this.loading"
                    expanded
                    v-model="model.workShopId"
                    placeholder="Seleccione el taller"
                    required
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
              <div class="column">
                <b-field
                  label="Usuario*"
                >
                  <b-select
                    :loading="this.loading"
                    expanded
                    v-model="model.userId"
                    icon="account"
                    placeholder="Seleccione el usuario"
                    required
                  >
                    <option
                      v-for="option in this.User"
                      :value="option.id"
                      :key="option.id"
                    >
                      {{ option.name }} {{ option.lastName }}
                    </option>
                  </b-select>
                </b-field>
              </div>
            </div>
            <div class="columns is-multiline">
              <div class="column">
                <b-field
                  label="Rol del usuario*"
                  :type="{ 'is-danger': errors.has('role') }"
                  :message="errors.first('role')"
                >
                  <b-select
                    expanded
                    v-model="model.role"
                    name="role"
                    placeholder="Seleccione el rol"
                    data-vv-as="Rol de usuario"
                    v-validate="'required'"
                  >
                    <option :value="0">Estudiante</option>
                    <option :value="1">Profesor</option>
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
import { BaseFormAddMixin } from "@/mixins";
import { WorkShopMember } from "@/core/model";
import axios, { AxiosResponse } from "axios";
@Component
export default class WorkShopMemberAddComponent extends Mixins<
  BaseFormAddMixin<WorkShopMember>
>(BaseFormAddMixin) {
  public loading: boolean = false;
  private WorkShop: any;
  private User: any;

  constructor() {
    super();
    this.controller = "WorkShopMember";
    this.model = new WorkShopMember();
    this.WorkShop = [];
    this.User = [];
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
      this.getUserData().then((data) => {
        this.User = data;
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