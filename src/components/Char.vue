<template>
  <div class="character">
    <div class="char__info">
        <p class="char__name">Name</p>
        <p class="char__points">Toplam puan: {{actionPoints}}</p>
    </div>
    <div class="char__abilities">
      <abilities />
    </div>
  </div>
</template>

<script>
import abilities from "./Abilities.vue"
import EventBus from "../eventbus.js"

export default {
  data(){
    return {
      actionPoints: 0
    }
  },
  components: {
    abilities
  },
  computed: {
    actionPoints(){
      return 
    }
  },
  created(){
    EventBus.$on("actionPointUpdated", payload => {
      this.actionPoints = payload;
    })
  }
};
</script>

<style lang="scss">
@import "@/assets/_colors";
@import "@/assets/_sizings";

.character {
  width: 400px;
  margin: 0 auto;
}

.char {
  &__info {
    border: 1px solid $btnBorderColor;
    border-radius: $radius;
    padding: $gap;
    margin-bottom: $gap;
    font-family: $font;
  }
}
</style>
