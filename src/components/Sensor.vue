<template>
  <div class="sensor">
    <h3>{{currentData.heure}}</h3>
    Température : {{currentData.temperature}}°C
    Humidité : {{currentData.humidity}}%
    <line-chart :data="dataTemperature" :round="2"></line-chart>
    <line-chart :data="dataHumidity"></line-chart>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {
      currentData: {},
      dataTemperature: [],
      dataHumidity: [],
    };
  },
  mounted() {
    this.$gun.get('sensorDataV1').map().on((node) => {
      const heure = moment(node.date).format("HH:mm")
      this.currentData = {
        temperature:node.temperature.toFixed(2),
        humidity:node.humidity.toFixed(0),
        heure:heure
      }
      if(moment().diff(moment(node.date),'hours') < 24 && moment(node.date).format("HHmm") % 10 === 0){
        this.dataTemperature.push([heure,node.temperature])
        this.dataHumidity.push([heure,node.humidity])
      }
    })
  }
};
</script>
