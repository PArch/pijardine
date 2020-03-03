<template>
  <div class="sensor">
    <ul id='data'>
      <li v-for="item in dataset"  v-bind:key="item.key">
        {{ item.date }}
        {{ item.temperature }}
        {{ item.humidity }}
      </li>
    </ul>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data() {
    return {dataset:[]}
    //  return {temperature: 0,humidity: 0,date:0}
  },
  mounted() {
    this.$gun.get('sensorDataV1').map((node,key) => {
      this.dataset.push({
        key:key,
        temperature:node.temperature
        ,humidity:node.humidity,
        date:moment(node.date).format('MM/DD/HH:mm')})
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
