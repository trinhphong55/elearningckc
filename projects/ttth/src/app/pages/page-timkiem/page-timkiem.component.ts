import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TimkiemService } from '../../services/timkiem.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-timkiem',
  templateUrl: './page-timkiem.component.html',
  styleUrls: ['./page-timkiem.component.css'],
})
export class PageTimkiemComponent implements OnInit {
  constructor(private timKiemService: TimkiemService) {}

  public formSearch = new FormGroup({
    query: new FormControl(''),
  });

  public result: any = {
    code: '',
    message: '',
    data: [],
  };

  public disableButton: Boolean = false;
  public loading: Boolean = false;
  public defaultElement = true;

  ngOnInit(): void {}

  searchBaiViet(): void {
    // console.log(this.formSearch.value);
    if (this.formSearch.get('query').value.trim().length > 0) {
      this.defaultElement = false;
      this.disableButton = true;
      this.loading = true;
      this.timKiemService
        .searchTinTuc(this.formSearch.get('query').value)
        .subscribe((data) => {
          this.result = data;
          this.disableButton = false;
          this.loading = false;
          console.log(this.result);
          // this.query.setValue(null);
        });
    } else {
      alert('Vui lòng nhập từ khoá để tìm kiếm');
    }
    // this.query.setValue(null);
  }

  formatDatetime(time: string): string {
    if (time) {
      time = moment(time).format('HH:mm, DD-MM-YYYY');
      return time;
    }
    return '';
  }
}
