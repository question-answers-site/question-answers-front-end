<script>/* eslint-disable */
  //Importing Line class from the vue-chartjs wrapper
import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins


  //Exporting this so it can be used in other components
  export default {
    extends: Line,
    mixins: [reactiveProp],
    data () {
      return {

        //Chart.js options that controls the appearance of the chart
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            xAxes: [ {
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: true
        }
      }
    },

    mounted () {
      //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.chartData, this.options)
    },
    // watch: {
    //   chartData (newValue, oldValue) {
    //     this.datacollection.labels=newValue.labels
    //     this.datacollection.data=newValue.data
    //     console.log(this.datacollection.labels)
    //     console.log('this.datacollection.labels')
    //     console.log(this.datacollection.data)
    //   }
    // },
  }
</script>
