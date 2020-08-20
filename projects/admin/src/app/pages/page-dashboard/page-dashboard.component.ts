import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { setCookie, getCookie } from '../../../../../common/helper';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
} from 'ng-apexcharts';
import { LopHocService } from '../../services/lop-hoc.service';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};
@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.css'],
})
export class PageDashboardComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  nam = '2019';
  temp = parseInt(this.nam);
  public series = [
    {
      name: 'Công nghệ Thông tin',
      data: [4, 3, 0],
    },
    {
      name: 'Quản trị mạng máy tính',
      data: [0, 0, 2],
    },
    {
      name: 'Kỹ thuật sửa chữa, lắp ráp máy tính',
      data: [0, 0, 2],
    },
    {
      name: 'Công nghệ Thông tin-Chuyên ngành Công nghệ phần mềm',
      data: [0, 2, 2],
    },
    {
      name: 'Công nghệ Thông tin-Chuyên ngành Mạng máy tính',
      data: [0, 2, 2],
    },
    {
      name: 'Khoa học máy tính',
      data: [0, 0, 0],
    },
  ];
  public years = [this.temp - 2, this.temp - 1, this.temp];
  constructor(private el: ElementRef, private lopHocService: LopHocService) {
    // this.lopHocService.thongKe((this.temp - 2).toString()).subscribe(
    //   (response) => {
    //     if(response.data){
    //       let temp = response.data[(this.temp - 2).toString()];
    //       this.series.map(serie => {
    //         if(temp[serie.name]){
    //           serie.data.push(temp[serie.name]);
    //         }
    //         else{
    //           serie.data.push(0);
    //         }
    //       })
    //     }
    //   }
    // )

    // this.lopHocService.thongKe((this.temp -1).toString()).subscribe(
    //   (response) => {
    //     if(response.data){
    //       let temp = response.data[(this.temp -1).toString()];
    //       this.series.map(serie => {
    //         if(temp[serie.name]){
    //           serie.data.push(temp[serie.name]);
    //         }
    //         else{
    //           serie.data.push(0);
    //         }
    //       })
    //     }
    //   }
    // )

    // this.lopHocService.thongKe((this.temp).toString()).subscribe(
    //   (response) => {
    //     if(response.data != null){
    //       let temp = response.data[this.temp];
    //       this.series.map(serie => {
    //         if(temp[serie.name]){
    //           serie.data.push(temp[serie.name]);
    //         }
    //         else{
    //           serie.data.push(0);
    //         }
    //       })
    //     }
    //     else{
    //       this.series.map(serie => {
    //         serie.data.push(0);
    //       })
    //     }
    //   }
    // )
    this.chartOptions = {
      series: this.series,
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        stackType: '100%',
        fontFamily: 'inherit',
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      title: {
        text: 'Thống kế số lượng lớp của từng ngành theo năm',
        style: {
          fontSize: '20px',
          fontWeight: '700',
          fontFamily: 'inherit',
        },
      },
      xaxis: {
        categories: this.years,
      },
    };
    //2017-2018-2019
  }
  isLogged: Boolean = false;
  ngOnInit(): void {
    if (getCookie('token') && getCookie('role') == 'admin') {
      this.isLogged = true;
      this.effectLoadPage();
    }
    this.effectLoadPage();
  }

  effectLoadPage(): void {
    const element = this.el.nativeElement;
    var opacity = parseInt(
      element.querySelector('.loadpage_effect').style.opacity
    );
    const setOpacity = setInterval(() => {
      opacity += 0.01;
      element.querySelector('.loadpage_effect').style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(setOpacity);
      }
    }, 10);
  }
}
