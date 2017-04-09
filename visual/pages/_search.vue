<template>
  <section class="container">
    <input type="text" placeholder="Suchbegriff">
    <button type="button" v-on:click="search"><i>SUCHEN</i></button>
    <canvas id="myChart" class="canv"></canvas>
  </section>
</template>

<script>
import axios from '~plugins/axios'
const test = require('../assets/text/test.json')

export default {
  ansycData(context) {
    var dat = {
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
            label: '',
            data: test.testdata.map(function(ob,i) {
              return {
                x: 1961+(i*10),
                y: ob.sentiment,
                r: 10
              }
            }),
            backgroundColor:"#ee7a79",
            hoverBackgroundColor: "#ee7a79",
          }
        ]
      }
    }

    fetch(`http://148.251.91.133:5984/parlasentiment2/_design/by_keyphrase/_view/by_keyphrase?key="${context.params.search}"`, {
      method: 'GET',
      mode: 'cors'
    })
    .then(res => res.json())
    .then(res => {
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

      dat.data.datasets[1].data = null
      dat.data.datasets[1].data = res.rows.map((ob,i) => {
        return {
          x: parseInt(ob.id),
          y: ob.value.sentiment,
          r: 10
        }
      })
    }).catch(err => {
      // Error :(
      console.log(err)
    });

    return dat
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
      console.log('wululu')
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
