<template>
  <div>
    <ul>
      <ability :ability="ability" v-for="ability in abilities" :key="ability.id"/>
    </ul>
  </div>
</template>

<script>
import ability from "./Ability.vue";
import EventBus from "../eventbus.js"

export default {
  data() {
    return {
      actionPoint: 25,
      allAbilities: [
        {
          id: 1,
          name: "Agility",
          value: 5
        },
        {
          id: 2,
          name: "Speed",
          value: 5
        },
        {
          id: 3,
          name: "Power",
          value: 5
        },
        {
          id: 4,
          name: "Intelligence",
          value: 5
        },
        {
          id: 5,  
          name: "Life",
          value: 5
        }
      ]
    };
  },
  components: {
    ability
  },
  computed: {
    abilities() {
      return this.allAbilities.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
  },
  created(){
    EventBus.$emit("actionPointUpdated", this.actionPoint);
    EventBus.$on("abilityIncreased", (ability) => {
      this.actionPoint--;
      this.allAbilities.map(item => { if(item.id === ability.id) item.value++})
    })
    EventBus.$on("abilityDecreased", (ability) => {
      if(ability.value > 0) {
        this.actionPoint++;
        this.allAbilities.map(item => { if(item.id === ability.id) item.value--})
        if(this.actionPoint===1) EventBus.$emit("pointsNotOver");
      }
    })
  },
  watch: {
    actionPoint(){
      if(this.actionPoint === 0) {
        EventBus.$emit("pointsOver")
      }

      EventBus.$emit("actionPointUpdated", this.actionPoint);
    }
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
