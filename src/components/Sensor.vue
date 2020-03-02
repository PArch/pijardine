<template>
  <div class="bitcoin-price">
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f69119"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
    </svg>
    <trend-chart
    v-if="dataset.length"
    :datasets="[{data: dataset, fill: true, className: 'curve-btc'}]"
    :labels="labels"
    :min="0"
    :grid="grid"
    />
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      dataset: [],
      labels: {
        xLabels: [],
        yLabels: 5,
        yLabelsTextFormatter: val => "$" + Math.round(val * 100) / 100
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
console.log(  this.$gun)
console.log(     this.$gun.get('sensorData').map())
    this.$gun.get('sensorData').map().on((node, key) => {
console.log(key)
console.log(node)

    });
    this.$http.get(
      "https://api.coindesk.com/v1/bpi/historical/close.json?start=2018-01-01&end=2019-01-31"
    )
    .then(res => {
      const data = res.data.bpi;
      for (let key in data) {
        this.dataset.push(data[key]);
        this.labels.xLabels.push(moment(key).format("MM/DD"));
      }
    });
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
  stroke: rgba(246, 145, 25, 0.5);
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
  stroke: #f69119;
  stroke-width: 2;
}
.bitcoin-price .curve-btc .fill {
  fill: url(#btcFill);
  fill-opacity: 0.5;
}

</style>
