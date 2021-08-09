<template>
  <b-navbar id="navbar" :class="{'navbar-on-sidebar-reduced':isSidebarReduced, 'navbar-on-sidebar-not-reduced':!isSidebarReduced}">
    <template #brand>
      <b-navbar-item href="#" @click="switchSidebarReduce" > {{isSidebarReduced ? 'Incrementar':'Reducir'}} </b-navbar-item>
    </template>
    <template #end>
       <b-navbar-dropdown label="User">
        <b-navbar-item href="#"> Profile </b-navbar-item>
        <b-navbar-item href="#"> My workshops </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-light"> Log out </a>
        </div>
      </b-navbar-item>
       
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import {SidebarMixin} from '@/mixins'
@Component
export default class Navbar extends mixins(SidebarMixin) {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#navbar{
 position: absolute;
  right: 0;
}
.navbar-on-sidebar-not-reduced{
  width: calc(100% - 260px);
}
.navbar-on-sidebar-reduced{
  width: calc(100% - 90px);
}
</style>
