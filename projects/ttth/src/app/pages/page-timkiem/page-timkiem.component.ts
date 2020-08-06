import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { TimkiemService } from '../../services/timkiem.service';

@Component({
  selector: 'app-page-timkiem',
  templateUrl: './page-timkiem.component.html',
  styleUrls: ['./page-timkiem.component.css'],
})
export class PageTimkiemComponent implements OnInit {
  constructor(private timKiemService: TimkiemService) {}

  public formSearch = new FormGroup({
    query: new FormControl(),
  });
  public result: any = {
    code: '',
    message: '',
    data: [],
  };

  public disableButton: Boolean = false;
  public loading: Boolean = false;

  ngOnInit(): void {}

  searchBaiViet(): void {
    if (this.formSearch.get('query').value !== null) {
      this.disableButton = true;
      this.loading = true;
      this.timKiemService
        .searchTinTuc(this.formSearch.get('query').value)
        .subscribe((data) => {
          console.log(data);
          this.result = data;
          this.disableButton = false;
          this.loading = false;
          this.formSearch.get('query').setValue(null);
        });
    }
  }
}
