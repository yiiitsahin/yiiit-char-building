<template>
  <div class="character">
    <div class="char__info">
        <p class="char__name">Example Char</p>
        <p class="char__points">Toplam Puan: {{actionPoints}}</p>
    </div>
    <div class="char__abilities">
      <abilities />
    </div>
  </div>
</template>

<script>
import abilities from './Abilities.vue'
import { mapGetters } from "vuex";

export default {
  components: {
    abilities
  },
  computed: {
    ...mapGetters(['actionPoints']),
  }
}
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
