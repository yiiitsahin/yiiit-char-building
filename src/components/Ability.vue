<template>
  <li class="ability">
    <div>{{ability.name}} (Max: {{ability.max}})</div>

    <div class="ability__buttons">
      <button
        class="ability__button"
        :class="{'ability__button--disabled': ability.value <= 0}"
        @click="decrement"
        @keypress.enter="decrement"
      >-</button>
      <span class="ability__point">{{ability.value}}</span>
      <button
        class="ability__button"
        :class="{'ability__button--disabled': !pointsAvailable || ability.value >= ability.max }"
        @click="increment"
        @keypress.tab="increment"
      >+</button>
    </div>

    <div class="ability__bar" :style="barStyle"></div>
  </li>
</template>

<script>
import EventBus from "../eventbus.js";

export default {
  data() {
    return {
      pointsAvailable: true
    };
  },
  props: ["ability"],
  methods: {
    increment() {
      if (this.pointsAvailable && this.ability.max > this.ability.value) {
        EventBus.$emit("abilityIncreased", this.ability);
      }
    },
    decrement() {
      if (this.ability.value !== 0)
        EventBus.$emit("abilityDecreased", this.ability);
    }
  },
  computed: {
    barStyle() {
      return `width: ${(this.ability.value / this.ability.max) * 100}%`;
    }
  },
  created() {
    EventBus.$on("pointsOver", () => {
      this.pointsAvailable = false;
    });
    EventBus.$on("pointsNotOver", () => {
      this.pointsAvailable = true;
    });
  }
};
</script>

<style lang="scss">
@import "@/assets/_colors";
@import "@/assets/_sizings";

.ability {
  border: 1px solid $btnBorderColor;
  background-color: $btnBigBackgroundColor;
  list-style: none;
  display: flex;
  align-content: center;
  padding: $gap;
  margin-bottom: $gap;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: $radius;
  position: relative;
  overflow: hidden;

  &__bar {
    display: block;
    background-color: #ff000017;
    position: absolute;
    top: -1px;
    left: 0;
    height: 110%;
    z-index: -1;
    transition: width 0.2s ease;
  }

  &:hover {
    background-color: $btnBigHoverColor;
  }

  &__buttons {
    margin-left: auto;
    height: 100%;
  }

  &__point {
    margin-left: $gap;
    width: 25px;
    display: inline-block;
    text-align: center;
  }

  &__button {
    width: 50px;
    background-color: $btnColor;
    text-align: center;
    display: inline-block;
    border: 1px solid $btnBorderColor;
    margin-left: $gap;
    cursor: pointer;
    transition: opacity 0.1s ease;

    &:hover,
    &--pressed {
      background-color: $btnHoverColor;
    }

    &--disabled {
      opacity: 0.2;

      &:hover {
        opacity: 0.2;
        background-color: $btnColor;
      }
    }
  }
}
</style>
