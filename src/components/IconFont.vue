<template>
    <span :class="iconClass" :v-bind="$attrs" >
        <svg class="svg" aria-hidden="true">
            <use :xlink:href="iconPath" />
        </svg>
    </span>
</template>
  
<script lang="ts" setup>
import { ref, computed } from 'vue';
// const attrs = useAttrs();

const props = defineProps({
  type: {
    type: String,
    default: '',
  }
});

const iconPath = ref(`#icon-${props.type}`);

const iconClass = computed(() => {
  return {
    iconfont: true,
    [`icon-${props.type}`]: true,
  };
});

</script>
  
<style scoped lang="scss">
.iconfont {
    display: inline-block;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    font-size: 16px;
    line-height: 1;
    color: inherit;
    .svg {
        width: 100%;
        height: 100%;
    }
}
</style>
  