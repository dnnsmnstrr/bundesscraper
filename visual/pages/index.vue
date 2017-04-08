<template>
  <section class="container">
    <canvas id="myChart" class="canv"></canvas>
  </section>
</template>

<script>
import axios from '~plugins/axios'
const test = require('../assets/text/test.json')

export default {
  mounted() {
    var Chart = require('chart.js')
    var ctx = document.getElementById("myChart");
    var data = {
        datasets: [
            {
                label: 'First Dataset',
                data: [
                    {
                        x: 20,
                        y: 30,
                        r: 15
                    },
                    {
                        x: 40,
                        y: 10,
                        r: 10
                    }
                ],
                backgroundColor:"#FF6384",
                hoverBackgroundColor: "#FF6384",
            }]
    };

    var myBubbleChart = new Chart(ctx,{
      type: 'bubble',
      data: data
    });
  }
}
</script>

<style scoped>
.canv {
  width: 70vw;
  height: 60vh;
}
</style>
