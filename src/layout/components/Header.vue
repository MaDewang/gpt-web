<template>
  <div class="header">
    header
    <div class="model">
      切换模型：
      <el-select v-model="activeToken" class="m-2" placeholder="Select" size="small" width="80"
        @change="(val: string) => setModelType(val)">
        <el-option v-for="item in tokens" :key="item.value" :label="item.label" :value="item.label" />
      </el-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getTokens, getModelType, setModelType } from '@/utils/gpt-versions-config'
import { ElSelect, ElOption } from 'element-plus'
import { ref } from 'vue'

const tokens = getTokens()

const activeToken = ref(getModelType())


</script>

<style lang="scss" scoped>
.header {
  --wails-draggable: drag;
  border-bottom: 1px solid var(--g-border-color);
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  top: 0;
  background-color: pink;
  box-sizing: border-box;
}
</style>