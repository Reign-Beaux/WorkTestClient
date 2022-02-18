<template>
    <div id="app">
        <router-view v-slot="{ Component }">
          <transition>
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
@import './assets/css/styles.css';
</style>
