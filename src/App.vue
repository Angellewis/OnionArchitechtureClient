<template>
  <div id="app">
    <sidebar />
    <div
      class="main-content"
      :class="{
        'main-content-on-sidebar-reduced': isSidebarReduced,
        'main-content-on-sidebar-not-reduced': !isSidebarReduced,
      }"
    >
      <navbar />
      <div class="section">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Vue, Watch } from "vue-property-decorator";
import { SidebarMixin } from "./mixins";

@Component
export default class App extends Mixins(SidebarMixin) {}
</script>
<style lang="scss" >
.main-content {
  position: absolute;
  right: 0;
}
.main-content-on-sidebar-not-reduced {
  width: calc(100% - 260px);
}
.main-content-on-sidebar-reduced {
  width: calc(100% - 90px);
}
.sidebar-reduced .menu-list li a span:last-child {
  display: none !important;
}
</style>
