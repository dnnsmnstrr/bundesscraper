<template>
  <section class="container">
    <canvas id="myChart" class="canv"></canvas>
  </section>
</template>

<script>
import axios from '~plugins/axios'
const test = require('../assets/text/test.json')

export default {
  data() {
    return {
      query: "Migration",
      data: {
        datasets: [
          {
            label: '',
            data: [
              {
                  x: 1960,
                  y: 100,
                  r: 1
              },
              {
                x: 2017,
                y: 0,
                r: 1
              }
            ],
            backgroundColor:"#FFFFFF",
            hoverBackgroundColor: "#FFFFFF",
          },
          {
            label: 'Daten',
            data: [
              {
                  x: 1999,
                  y: 30,
                  r: 15
              }
            ],
            backgroundColor:"#FF6384",
            hoverBackgroundColor: "#FF6384",
          }
        ]
      }
    }
  },
  mounted() {
    var Chart = require('chart.js')
    var ctx = document.getElementById("myChart")
    var myBubbleChart = new Chart(ctx,{
      type: 'bubble',
      data: this.data
    })
  }
}
</script>

<style scoped>
input {
  padding: 0.25em 0.5em;
  margin-bottom: 1em;
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-color: #d4d0d0;
  font-size: 1.2em;
}
.canv {
  width: 70vw;
  height: 60vh;
}
</style>
