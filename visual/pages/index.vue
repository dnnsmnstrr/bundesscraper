<template>
  <section class="container">
    <svg class="canv"></svg>
  </section>
</template>

<script>
import axios from '~plugins/axios'
import * as d3 from 'd3'
const test = require('../assets/text/test.json')

function vis() {
  console.log(test.testdata)
}

export default {
  mounted() {
    vis()
  }
}
</script>

<style scoped>
.canv {
  width: 100vw;
  height: 60vh;
}
</style>
