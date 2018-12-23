import React from 'react';
import { connect } from 'dva';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/map';
import 'echarts/map/js/china';

@connect(({ user }) => ({
  user,
}))
class myMap extends React.Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/fetchPros'
    });
  }

  componentDidMount() {
    // 初始化
    const myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: (params,ticket,callback) => {
          if(params.data){
            const text = this.props.user.pro.text[params.data.name];
            const res = `旅行日志<br/>${params.data.name}<br/>${text[0]}<br/>${text[1]}`;
            callback(ticket, res);
            setTimeout(()=>{
                callback(ticket, res);
            }, 0)
            return ' ';
          }
          return '未去过';
        }
      },
      series : [
        {
          name: '旅行日志',
          type: 'map',
          roam: true,
          map: 'china',
          itemStyle:{
              emphasis:{label:{show:true}}
          },
          data: this.props.user.pro.map,
          selectedMode:true,
          scaleLimit: {
            min:1.5,
            max:1.5
          },
          label: {
            show: true
          }
        }
      ]
    })
  }

  render() {
    return (
      <div id="main" style={{ width: '100%', height: 500 }} />
    );
  }
}

export default myMap;
