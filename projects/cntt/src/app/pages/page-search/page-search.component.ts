import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TinTucCnttService } from '../../services/tintuc.service';
import * as moment from 'moment';

@Component({
  selector: 'app-page-search',
  templateUrl: './page-search.component.html',
  styleUrls: ['./page-search.component.css'],
})
export class PageSearchComponent implements OnInit {
  constructor(private tintucCnttService: TinTucCnttService) {}

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
      this.tintucCnttService
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
