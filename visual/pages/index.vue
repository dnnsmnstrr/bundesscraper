<template>
  <section class="container">
    <select name="stuff" v-model="per">
      <option value="13">1994 - 1998</option>
      <option value="14">1998 - 2002</option>
      <option value="17">2009 - 2013</option>
      <option value="18">2013 - 2017</option>
    </select>
    <input type="number" v-model="per" placeholder="Legislaturperiode">
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
      query: "funk",
      per: "18",
      myBubbleChart: null,
      data: {
        datasets: [
          {
            label: '',
            data: null,
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
    this.myBubbleChart = new Chart(ctx,{
      type: 'bubble',
      data: this.data,
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    max: 3,
                    min: -3,
                    stepSize: 0.5
                }
            }]
        }
    }
    })
    console.log(myBubbleChart)
  },
  methods: {
    search: function() {
      var chart = this.myBubbleChart
      fetch(`http://148.251.91.133:5984/parlasentiment/_design/keyphrase/_view/keyphrase?startkey="${this.query}"&endkey="${this.query}\ufff0"`, {
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

        this.data.datasets[0].data = null
        this.data.datasets[0].data = res.rows.filter(ob => ob.id.substr(0, 2) === `${this.per}`).map((ob,i) => {
          return {
            x: parseInt(ob.id),
            y: ob.value.sentiment*10,
            r: 10
          }
        })
        chart.update()
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
  max-width: 90vw;
  max-height: 90vh;
}
</style>
