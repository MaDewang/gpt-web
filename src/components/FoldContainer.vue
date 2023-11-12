<template>
    <div class="foldContainer">
        <aside :class="['sider', { collapsed: isCollapsed }]">
            <div style="overflow: hidden;">
                <slot name="sider"></slot>
            </div>
            <div class="n-layout-toggle-button" @click="isCollapsed = !isCollapsed">
            <IconFont :type="'zuojiantou'" class="icon" />
        </div>
        </aside>
        
        <main>
            <slot name="main"></slot>
        </main>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const isCollapsed = ref(false)

</script>

<style lang="scss" scoped>
.foldContainer {
    display: flex;
    flex-flow: row;
    width: 100%;
    overflow-x: hidden;
    box-sizing: border-box;
    height: 100%;

    .sider {
        --n-bezier: cubic-bezier(.4, 0, .2, 1);
        --n-toggle-button-color: #FFF;
        --n-toggle-button-border: 1px solid rgb(239, 239, 245);
        --n-toggle-bar-color: rgba(181, 184, 187, 1);
        --n-toggle-bar-color-hover: rgba(145, 147, 149, 1);
        --n-color: #fff;
        --n-text-color: rgb(51, 54, 57);
        --n-border-color: rgb(239, 239, 245);
        --n-toggle-button-icon-color: rgb(51, 54, 57);
        max-width: 320px;
        width: 320px;

        flex-shrink: 0;
        box-sizing: border-box;
        position: relative;
        z-index: 1;
        color: var(--n-text-color);
        transition: color .3s var(--n-bezier), border-color .3s var(--n-bezier), min-width .3s var(--n-bezier), max-width .3s var(--n-bezier), transform .3s var(--n-bezier), background-color .3s var(--n-bezier);
        background-color: var(--n-color);
        display: flex;
        justify-content: flex-end;

        &.collapsed {
            max-width: 0px;
            .n-layout-toggle-button .iconfont {
                transform: rotate(180deg);
            }
        }
    }

    .n-layout-toggle-button {
        transition: color .3s var(--n-bezier), right .3s var(--n-bezier), left .3s var(--n-bezier), border-color .3s var(--n-bezier), background-color .3s var(--n-bezier);
        cursor: pointer;
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        right: 0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: var(--n-toggle-button-icon-color);
        border: var(--n-toggle-button-border);
        background-color: var(--n-toggle-button-color);
        box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
        transform: translateX(50%) translateY(-50%);
        z-index: 1;
    }

    main {
        flex: 1;
        overflow: auto;
    }

}</style>