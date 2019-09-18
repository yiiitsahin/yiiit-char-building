<template>
  <li class="ability">
    <div>{{ability.name}}</div>

    <div class="ability__buttons">
      <span class="ability__button" :class="{'ability__button--disabled': !pointsAvailable}" @click="increment">+</span>
      <span class="ability__point">{{ability.value}}</span>
      <span class="ability__button" :class="{'ability__button--disabled': ability.value <= 0}" @click="decrement">-</span>
    </div>
  </li>
</template>

<script>
import EventBus from "../eventbus.js"

export default {
    data(){
        return {
            pointsAvailable: true
        }
    },
    props: ["ability"],
    methods: {
      increment(){
        if(this.pointsAvailable){
          EventBus.$emit("abilityIncreased", this.ability);
        }
      },
      decrement(){
          EventBus.$emit("abilityDecreased", this.ability);
      }
    },
    created(){
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
    transition: opacity .1s ease;

    &:hover,
    &--pressed {
      background-color: $btnHoverColor;
    }

    &--disabled {
      opacity: .2;

      &:hover {
        opacity: .2;
        background-color: $btnColor;
      }
    }
  }
}
</style>
