<template>
  <section class="container">
    <input type="text" v-model="query" placeholder="Suchbegriff">
    <button type="button" v-on:click="search"><i>SUCHEN</i></button>
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
            label: 'Skalierung',
            data: [
              {
                  x: 1960,
                  y: 1,
                  r: 1
              },
              {
                x: 2017,
                y: -1,
                r: 1
              }
            ],
            backgroundColor:"#FFFFFF",
            hoverBackgroundColor: "#FFFFFF",
          },
          {
            label: 'Negativ -1 - -0.5',
            data: test.testdata.map(function(ob,i) {
              return {
                x: 1961+(i*10),
                y: ob.sentiment,
                r: 10
              }
            }),
            backgroundColor:"#ee7a79",
            hoverBackgroundColor: "#ee7a79",
          },
          {
            label: 'Neutral-Negativ -0.5 - 0',
            data: test.testdata.map(function(ob,i) {
              return {
                x: 1961+(i*10+1),
                y: ob.sentiment,
                r: 10
              }
            }),
            backgroundColor:"#e7cd8a",
            hoverBackgroundColor: "#e7cd8a",
          },
          {
            label: 'Neutral-Positiv 0 - 0.5',
            data: test.testdata.map(function(ob,i) {
              return {
                x: 1961+(i*10+2),
                y: ob.sentiment,
                r: 10
              }
            }),
            backgroundColor:"#7869aa",
            hoverBackgroundColor: "#7869aa",
          },
          {
            label: 'Positiv 0.5 - 1',
            data: test.testdata.map(function(ob,i) {
              return {
                x: 1961+(i*10+3),
                y: ob.sentiment,
                r: 10
              }
            }),
            backgroundColor:"#71c0a4",
            hoverBackgroundColor: "#71c0a4",
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
      fetch('http://148.251.91.133:5984/parlasentiment2/_find/', {
      	method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
          "selector": {
            "keywords": {
              "$elemMatch": {
                "$eq": this.query
              }
            }
          }
        })
      }).then(res => {
        /*
        sorted = res.map((ob,i) => {
          if (ob.sentiment >= 0.5) {

          }
          else if (ob.sentiment < 0.5 && ob.sentiment > 0) {

          }
          else if (ob.sentiment < 0 && ob.sentiment > -0.5) {

          }
          else {

          }
        })
        */
        console.log(res);


        this.data.datasets[1].data = res.docs.map((ob,i) => {
          return {
            x: ob.date,
            y: ob.sentiment,
            r: 10
          }
        })
      }).catch(err => {
      	// Error :(
        console.log(err)
      });
    }
  }
}
</script>

<style scoped>
input {
  padding: 0.25em 0.5em;
  margin-bottom: 1em;
  margin-right: 1em;
  margin-top: 0.5em;
  border-radius: 2px;
  border-style: solid;
  border-width: 1px;
  border-color: #d4d0d0;
  font-size: 1.2em;
}
button {
  height: 3em;
  margin-top: -0.5em;
  border-style: solid;
  border-color: #3b3a39;
  background-color: #3b3a39;
  color: #f2f2f2;
  font-weight: bold;
}
.canv {
  margin: auto;
  max-width: 80vw;
  max-height: 80vh;
}
</style>
