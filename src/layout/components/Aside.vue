<template>
  <div class="aside">
    <div class="menus h-full mt-2">
      <router-link :to="{ path: item.path }" v-for="item in menus" :key="item.path" :class="['menu-item', 'aa-text']">
      <IconFont :type="item.icon" class="icon" />
      <div class="text-xs mt-0.5">{{ item.title }}</div>
      
    </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const menus = ref<{
  title: string;
  icon: string;
  path: string;
}[]>([
  {
    title: '对话',
    icon: 'duihua',
    path: '/chat',
  }
])
</script>

<style lang="scss" scoped>
.aside {
  --n-bezier: cubic-bezier(.4, 0, .2, 1);
  --n-toggle-button-color: #FFF;
  --n-toggle-button-border: 1px solid rgb(239, 239, 245);
  --n-toggle-bar-color: rgba(181, 184, 187, 1);
  --n-toggle-bar-color-hover: rgba(145, 147, 149, 1);
  --n-color: #fff;
  --n-text-color: rgb(51, 54, 57);
  --n-border-color: rgb(239, 239, 245);
  --n-toggle-button-icon-color: rgb(51, 54, 57);
  max-width: 70px;
  width: 70px;

  flex-shrink: 0;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
  color: var(--n-text-color);
  transition: color .3s var(--n-bezier), border-color .3s var(--n-bezier), min-width .3s var(--n-bezier), max-width .3s var(--n-bezier), transform .3s var(--n-bezier), background-color .3s var(--n-bezier);
  background-color: var(--n-color);
  display: flex;
  justify-content: flex-end;
  .menus {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .menu-item {
    height: 52px;
    width: 52px;
    border-radius: var(--aa-border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    color: var(--aa-font-color);
    text-decoration: none;
    background-color: var(--aa-bg-menu);
    &:not(:last-child) {
      margin-bottom: 0.5rem;
  }
  &:hover {
    background-color: var(--aa-c-primary-low);
    color: var(--aa-c-primary);
  }
  .icon {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
  }
}
</style>