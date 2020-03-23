<template>
  <div :class="$style.chart">
    <canvas
      id="canvas"
      :height="canvasHeight" />
  </div>
</template>

<script>
import Chart from 'chart.js'
import { format } from 'date-fns'
import { getChartPeopleWithSynthoms, getChartCasesConfirmed, getChartCasesConfirmedBA } from '~/api'

const COLOR_1 = '#F0E7D8'
const COLOR_2 = '#E87894'
const COLOR_3 = '#ADABC9'

export default {
  data() {
    return {
      dates: [],
      chart: {},
      chartData: {
        confirmedCasesBR: {
          label: 'Casos confirmados (Brasil)',
          fill: false,
          backgroundColor: COLOR_2,
          borderColor: COLOR_2,
          data: [],
        },
        confirmedCasesBA: {
          label: 'Casos confirmados (Bahia)',
          backgroundColor: COLOR_1,
          borderColor: COLOR_1,
          data: [],
          fill: false,
        },
        peopleWithSymptoms: {
          label: 'Casos suspeitos',
          fill: false,
          backgroundColor: COLOR_3,
          borderColor: COLOR_3,
          borderDash: [5, 5],
          data: [],
        }
      }
    }
  },
  computed: {
    canvasHeight() {
      return window.innerWidth > 768 ? '300px' : '200px'
    },
    chartConfig() {
      return {
        type: 'line',
        data: {
          labels: this.dates,// Array.from(Array(60).keys()).map(n => n + 1),
          datasets: [
            this.chartData.confirmedCasesBA,
            this.chartData.peopleWithSymptoms,
            this.chartData.confirmedCasesBR,
          ]
        },
        options: {
          responsive: true,
          legend: {
            position: 'bottom'
          },
          title: {
            display: false,
            text: 'Chart.js Line Chart'
          },
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Dias'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Pessoas'
              }
            }]
          }
        }
      }
    }
  },
  mounted() {
    getChartCasesConfirmed().then(data => {
      const dates = []
      const cases = []
      data.forEach(({ date, confirmed, deaths }) => {
        if (confirmed > 0) {
          dates.push(date)
          cases.push(confirmed)
        }
      })
      this.$store.commit('charts/addDates', dates)
      this.chartData.confirmedCasesBR.data.push(...cases)
      this.$store.commit('charts/addConfirmedCasesBR', cases)
      this.dates.push(...dates.map(d => format(new Date(d), 'dd/MM')))
      this.loadChart(this.chartConfig)

      getChartPeopleWithSynthoms().then(data => {
        if (data.suspeitos) {
          this.chartData.peopleWithSymptoms.data.push(...data.suspeitos)
          this.$store.commit('charts/addPeopleWithSymptoms', data.suspeitos)
          this.updateChart()
        }
      })
    })

    getChartCasesConfirmedBA().then(data => {
      this.chartData.confirmedCasesBA.data.push(...data)
      this.$store.commit('charts/addConfirmedCasesBA', data)
      this.updateChart()
    })
  },
  methods: {
    updateChart() {
      if (this.chart.update && typeof this.chart.update === 'function') this.chart.update(this.chartConfig)
    },
    loadChart(config) {
      Chart.defaults.global.defaultColor = '#f1f1f1'
      Chart.defaults.global.defaultFontColor = '#f1f1f1'

      const ctx = document.getElementById('canvas').getContext('2d')
      this.chart = new Chart(ctx, config)
    },
  }
}
</script>

<style lang="scss" module>
.chart {
  padding: 15px;
}
</style>
