/**
 * g2plot 折线图的基本配置
 * @param { Vue } vm 用于上下文
 */
export default function(vm, tooltipFormatter) {
  return {
    // height:410,
    padding: '0 10px 20px',
    forceFit: true,
    data: null,
    xField: 'date',
    yField: 'value',
    color: [
      '#2E88FC',
      '#13C2C2',
      '#FAAD14',
      '#52C41B',
      '#FA551B',
      '#BB47D6',
      '#f97575',
      '#2696fe',
      '#70c5c8',
      '#cfecf7',
      '#ff7c41',
      '#ffb08d',
      '#ffe5d9',
      '#efd53a',
      '#f5e689',
      '#fcf7d8',
      '#16cf45',
      '#73e28f',
      '#d5f8df',
      '#7d4ddb',
      '#a77fe6',
      '#e2d4f7',
      '#ffe5d9',
      '#f8a3a2',
      '#fe5251'
    ],
    renderer: 'svg',
    xAxis: {
      label: {
        visible: true,
        style: {
          fill: '#2B2B2B'
        }
      },
      // grid: {
      //   visible: true,
      //   style:{
      //     stroke:'#f6f6f6'
      //   }
      // },
      line: {
        visible: true,
        style: {
          stroke: '#eeeeee'
        }
      },
      tickLine: {
        visible: true,
        style: {
          stroke: '#ccc'
        }
      },
      title: {
        visible: true,
        text: 'x',
        offset: 40,
        style: { fontSize: 18, fill: 'white' }
      }
    },
    yAxis: {
      min: vm.g2YAxisMinnum || 0,
      line: {
        visible: true,
        style: {
          stroke: '#eeeeee'
        }
      },
      label: {
        // 数值格式化为千分位
        formatter: v => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, s => `${s},`),
        visible: true,
        style: {
          fill: '#2B2B2B'
        }
      }
    },
    title: {
      visible: true,
      text: '数据趋势',
      style: {
        fontSize: 18,
        fill: 'white'
      }
    },
    legend: {
      custom: true,
      visible: true,
      // offsetY: 5,
      position: 'bottom-center',
      title: {
        visible: true,
        text: ' ',
        style: {
          fontSize: 18,
          fill: 'white'
        }
      },
      marker: {
        symbol: 'circle'
      },
    },

    tooltip: {
      formatter: tooltipFormatter,
      fields: ['value', 'type']
    },
    smooth: 'spline',
    point: {
      visible: true,
      size: 3,
      shape: 'circle',
      style: {
        lineWidth: 1,
        opacity: 0.1,
        stroke: '#ffffff'
      }
    },
    seriesField: 'type'
  }
}
