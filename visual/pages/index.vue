<template>
  <section class="container">
    <input type="text" v-model="query" placeholder="Suchbegriff">
    <button type="button" v-on:click="search">Suchen</button>
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
            label: '',
            data: test.testdata.map(function(ob,i) {
              return {
                x: 1961+(i*10),
                y: ob.sentiment,
                r: ob.sentiment*0.5
              }
            }),
            backgroundColor:"#ee7a79",
            hoverBackgroundColor: "#ee7a79",
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
  },
  methods: {
    search: function() {
      console.log('search')
    }
  }
}
</script>

<style scoped>
input {
  padding: 0.25em 0.5em;
  margin-bottom: 1em;
  margin-right: 2em;
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-color: #d4d0d0;
  font-size: 1.2em;
}
.canv {
  margin: auto;
  max-width: 80vw;
  max-height: 80vh;
}
</style>
