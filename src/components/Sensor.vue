<template>
  <div class="sensor">
  <h3>{{currentData.heure}}</h3>
    Température : {{currentData.temperature}}°C
    Humidité : {{currentData.humidity}}%
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f69119"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
    </svg>
    <trend-chart
    v-if="dataTemperature.length"
    :datasets="[{data: dataTemperature, fill: true, className: 'curve-btc'}]"
    :labels="labelsTemperature"
    :min="0"
    :grid="grid"
    />
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f69119"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
    </svg>
    <trend-chart
    v-if="dataHumidity.length"
    :datasets="[{data: dataHumidity, fill: true, className: 'curve-btc'}]"
    :labels="labelsHumidity"
    :min="0"
    :grid="grid"
    />
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
      labelsTemperature: {
        xLabels: [],
        yLabels: 5,
        yLabelsTextFormatter: val => Math.round(val * 100) / 100+'°C'
      },
      labelsHumidity: {
        xLabels: [],
        yLabels: 5,
        yLabelsTextFormatter: val => Math.round(val * 100) / 100+'%'
      },
      grid: {
        verticalLines: true,
        verticalLinesNumber: 1,
        horizontalLines: true,
        horizontalLinesNumber: 1
      }
    };
  },
  mounted() {
    this.$gun.get('sensorDataV1').map().on((node) => {
      this.currentData = {
        temperature:node.temperature.toFixed(2),
        humidity:node.humidity.toFixed(0),
        heure:moment(node.date).format("HH:mm")
      }
      const heure = moment(node.date).format("HHmm")

      if(heure % 60 === 0){
        this.labelsTemperature.xLabels.push(moment(node.date).format("HH:mm"));
        this.labelsHumidity.xLabels.push(moment(node.date).format("HH:mm"));
      }
      this.dataTemperature.push(node.temperature)
      this.dataHumidity.push(node.humidity)
    })
  }
};
</script>

<style lang="css">
.bitcoin-price .vtc {
  height: 250px;
  font-size: 12px;
}
@media (min-width: 699px) {
  .bitcoin-price .vtc {
    height: 350px;
  }
}
.bitcoin-price .grid line, .bitcoin-price .labels line {
  stroke: #000;
}
.bitcoin-price .x-labels .label text {
  display: none;
}
.bitcoin-price .x-labels .label line {
  opacity: 0.3;
}
.bitcoin-price .x-labels .label:nth-child(6n + 1) text, .bitcoin-price .x-labels .label:first-child text {
  display: block;
}
.bitcoin-price .x-labels .label:nth-child(6n + 1) line, .bitcoin-price .x-labels .label:first-child line {
  opacity: 1;
}
.bitcoin-price .curve-btc .stroke {
  stroke: #000;
  stroke-width: 2;
}
.bitcoin-price .curve-btc .fill {
  fill: url(#btcFill);
  fill-opacity: 0.5;
}

</style>
