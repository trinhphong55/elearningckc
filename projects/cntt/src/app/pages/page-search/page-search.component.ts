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
    query: new FormControl(),
  });

  public result: any = {
    code: '',
    message: '',
    data: [],
  };
  // public result: any;

  public disableButton: Boolean = false;
  public loading: Boolean = false;

  ngOnInit(): void {}

  searchBaiViet(): void {
    if (this.formSearch.get('query').value !== null) {
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
    }
    // this.query.setValue(null);
  }

  formatDatetime(time: string): string {
    time = moment(time).format('HH:mm, DD-MM-YYYY');
    return time;
  }
}
