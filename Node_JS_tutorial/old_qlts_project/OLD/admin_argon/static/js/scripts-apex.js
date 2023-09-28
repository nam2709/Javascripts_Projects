// window.Apex = {
//   chart: {
//     foreColor: '#fff',
//     toolbar: {
//       show: false
//     },
//   },
//   colors: ['#FCCF31', '#17ead9', '#f02fc2'],
//   stroke: {
//     width: 3
//   },
//   dataLabels: {
//     enabled: false
//   },
//   grid: {
//     borderColor: "#40475D",
//   },
//   xaxis: {
//     axisTicks: {
//       color: '#333'
//     },
//     axisBorder: {
//       color: "#333"
//     }
//   },
//   fill: {
//     type: 'gradient',
//     gradient: {
//       gradientToColors: ['#F55555', '#6078ea', '#6094ea']
//     },
//   },
//   tooltip: {
//     theme: 'dark',
//     x: {
//       formatter: function (val) {
//         return moment(new Date(val)).format("HH:mm:ss")
//       }
//     }
//   },
//   yaxis: {
//     decimalsInFloat: 2,
//     opposite: true,
//     labels: {
//       offsetX: -10
//     }
//   }
// };

var trigoStrength = 3
var iteration = 11

function getRandom() {
  var i = iteration;
  return (Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2)
}

function getRangeRandom(yrange) {
  return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
}

function generateMinuteWiseTimeSeries(baseval, count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y = ((Math.sin(i / trigoStrength) * (i / trigoStrength) + i / trigoStrength + 1) * (trigoStrength * 2))

    series.push([x, y]);
    baseval += 300000;
    i++;
  }
  return series;
}
var CRR_SCORE = [0,0];
var CRR_SCORE_PERCENT = [0,5];
var MAX_SCORE = [1000,40];        

function initCurrentScore()
{
  var crr_score = localStorage.getItem("level_score");
  if(crr_score != "" && crr_score != undefined){
    var crr_score_obj = JSON.parse(crr_score);
    CRR_SCORE = []
  }

}

var optionsCircle = {
  chart: {
    type: 'radialBar',
    height: 320,
    offsetY: -30,
    offsetX: 20
  },
  plotOptions: {
    radialBar: {
      size: undefined,
      inverseOrder: false,
      hollow: {
        margin: 5,
        size: '48%',
        background: 'transparent',
      },
      track: {
        show: true,
        // background: '#40475D',
        strokeWidth: '10%',
        opacity: 1,
        margin: 3, // margin is in pixels
      },


    },
  },
  // series: [71, 63],
  series: CRR_SCORE_PERCENT,
  labels: ['Tổng điểm', 'Năng lực hiện tại'],
  legend: {
    show: true,
    position: 'bottom',
    // offsetX: -30,
    // offsetY: 10,
    formatter: function (val, opts) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex] + '%'
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'horizontal',
      shadeIntensity: 0.5,
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  }
}



window.setInterval(function () {
  iteration++;
  // chartCircle.updateSeries([getRangeRandom({ min: 10, max: 100 }), getRangeRandom({ min: 10, max: 100 })])
}, 3000);
function calculate_percent(score,total){
  if(isNaN(score) || isNaN(score)){
    perc=0;
     }else{
     perc = ((score/total) * 100).toFixed(0);
     }
  return perc;
}
function SumAllScoreActive(crr_panel_id){
  var total = 0;
  crr_panel_id.find(".score_inputId").each(function(){
    var crr_value = $(this).val();
    if(crr_value !="" &&crr_value != null &&crr_value !=undefined ){
      total += Number(crr_value);
    }

  })
  // percent_all = ((CRR_SCORE[0] + total) / MAX_SCORE[0])*100
  // percent_crr = ((CRR_SCORE[1] + total) / MAX_SCORE[1])*100
  $("#crr_score_value").html(total);
  percent_all = calculate_percent(CRR_SCORE[0] + total,MAX_SCORE[0]);
  percent_crr = calculate_percent(CRR_SCORE[1] + total,MAX_SCORE[1]);
  chartCircle.updateSeries([percent_all,percent_crr])

}

var chartCircle = null;

$(document).ready(function(){

chartCircle = new ApexCharts(document.querySelector('#circlechart'), optionsCircle);
chartCircle.render();
$("#crr_score_value").html(CRR_SCORE[1]);
});