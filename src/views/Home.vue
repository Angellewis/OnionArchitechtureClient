<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    Username: {{ $store.getters.getUserName }}

    <input type="text" v-model="userName" />
    <button @click="changeUserName">Cambiar nombre de usuario</button>
    <button @click="changeUserNameAsync">Cambiar nombre de usuario (async)</button>
    <HelloWorld msg="Hola Mundo" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { ACTIONS, MUTATIONS } from "@/store";

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  person = {
    name: "Emmanuel",
    lastName: "Jimenez",
  };
userName = this.$store.state.user.userName;

  async changeUserNameAsync(){
   await this.$store.dispatch(ACTIONS.SET_USER_NAME_ASYNC,this.userName);
  }

  changeUserName(){
    this.$store.commit(MUTATIONS.SET_USER_NAME,this.userName);
  }

  @Watch("person", { deep: true })
  onNameChange(newValue: { name: string; lastName: string }) {
    console.log(newValue);

  }
}
</script>
