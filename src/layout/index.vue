<template>
    <div class="layout">
        <Header class="layout-header" />
        <div class="layout-container">
            <Aside class="ayout-asider" />
            <div class="layout-main">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'


</script>

<style scoped lang="scss">
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;

    .layout-header {
        flex-shrink: 0;
        height: var(--g-header-height);
        overflow: hidden;
        z-index: 999;
        background-color: var(--g-bg-header);
        width: 100%;
    }

    .layout-container {
        display: flex;
        flex-grow: 1;
        overflow: hidden;

        .layout-asider {
            flex-shrink: 0;
        }

        .layout-main {
            flex-grow: 1;
            overflow: hidden;
        }
    }
}
</style>