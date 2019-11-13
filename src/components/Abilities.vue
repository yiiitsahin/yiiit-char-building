<template>
  <div>
    <ul>
      <ability :ability="ability" v-for="ability in abilities" :key="ability.id" />
    </ul>
  </div>
</template>

<script>
import ability from "./Ability.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    ability
  },
  computed: {
    ...mapGetters({
      actionPoints: "actionsPoints",
      abilities: "allAbilities"
    })
  }
};
</script>

<style lang="scss">
@import "@/assets/_colors";
@import "@/assets/_sizings";

ul {
  margin: 0;
  padding: 0;
}
</style>
