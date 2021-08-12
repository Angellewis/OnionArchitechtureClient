<template>
  <section>
    <b-sidebar
      :class="{
        'sidebar-reduced': isSidebarReduced,
        'sidebar-not-reduced': !isSidebarReduced,
      }"
      type="is-light"
      open
      fullheight
      :reduce="isSidebarReduced"
    >
      <div class="p-1">
        <div class="block">
          <img
            src="../../assets/sx-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </div>
        <b-menu class="is-custom-mobile">
          <b-menu-list label="Menu">
            <b-menu-item
              active
              icon="information-outline"
              label="Home"
              tag="router-link"
              :to="{ path: '/' }"
            >
            </b-menu-item>
            <b-menu-item
              icon="view-list"
              label="My workshops"
              tag="router-link"
              :to="{ path: '/workshops' }"
            >
            </b-menu-item>
            <b-menu-item
              v-if="isCurrentUserAdmin"
              expanded
              icon="security"
              label="Administrator"
            >
              <b-menu-item
                id="das"
                icon="account-multiple"
                label="Users"
                tag="router-link"
                :to="{ path: '/admin/users' }"
              ></b-menu-item>
              <b-menu-item
                icon="view-list"
                label="Workshops"
                tag="router-link"
                :to="{ path: '/admin/workshops' }"
              ></b-menu-item>
            </b-menu-item>
            <b-menu-item
              icon="account"
              label="My profile"
              tag="router-link"
              :to="{ path: '/profile' }"
            >
            </b-menu-item>
          </b-menu-list>
          <b-menu-list label="Actions">
            <b-menu-item icon="logout" label="Logout"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
  </section>
</template>


<script lang="ts">
import { Component, Mixins, Prop, Vue } from "vue-property-decorator";
import { AuthMixin, SidebarMixin } from "@/mixins";
@Component
export default class Sidebar extends Mixins(SidebarMixin, AuthMixin) {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.p-1 {
  padding: 1em !important;
}
</style>
