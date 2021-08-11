<template>
  <b-navbar
    id="navbar"
    :class="{
      'navbar-on-sidebar-reduced': isSidebarReduced,
      'navbar-on-sidebar-not-reduced': !isSidebarReduced,
    }"
  >
    <template #brand>
      <b-navbar-item href="#" @click="switchSidebarReduce">
        <b-tooltip
          :label="isSidebarReduced ? 'Expandir' : 'Reducir'"
          position="is-right"
        >
          <b-icon
            :icon="isSidebarReduced ? 'arrow-right' : 'arrow-left'"
            size="is-small"
          >
          </b-icon>
        </b-tooltip>
      </b-navbar-item>
    </template>
    <template #end>
      <b-navbar-dropdown position="is-bottom-left" :label="currentUser.name">
        <b-navbar-item href="#"> Profile </b-navbar-item>
        <b-navbar-item href="#"> My workshops </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a @click="logout" class="button is-light"> Log out </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import { SidebarMixin, AuthMixin } from "@/mixins";
@Component
export default class Navbar extends Mixins(SidebarMixin,AuthMixin) {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navbar {
  position: absolute;
  right: 0;
}
.navbar-on-sidebar-not-reduced {
  width: calc(100% - 260px);
}
.navbar-on-sidebar-reduced {
  width: calc(100% - 90px);
}
</style>
