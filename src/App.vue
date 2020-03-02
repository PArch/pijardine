<template>
  <div id="app">
    <Sensor/>
  </div>
</template>

<script>
import Sensor from './components/Sensor.vue'

export default {
  name: 'App',
  components: {
    Sensor
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
