import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { FooterService } from '../../../../services/cntt/footer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-quanlyfootercntt',
  templateUrl: './modal-quanlyfootercntt.component.html',
  styleUrls: ['./modal-quanlyfootercntt.component.css'],
})
export class ModalQuanlyfootercnttComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private footerService: FooterService,
    private toastrService: ToastrService
  ) {}

  private _defaultFormvalue: any;

  public formMenuFooter = new FormGroup({
    _id: new FormControl(null),
    name1: new FormControl(),
    url1: new FormControl(),
    sub1: new FormArray([]),
    name2: new FormControl(),
    url2: new FormControl(),
    sub2: new FormArray([]),
    name3: new FormControl(),
    url3: new FormControl(),
    sub3: new FormArray([]),
  });

  public arrayMenu: any = [
    {
      name: 'name1',
      url: 'url1',
      sub: 'sub1',
    },
    {
      name: 'name2',
      url: 'url2',
      sub: 'sub2',
    },
    {
      name: 'name3',
      url: 'url3',
      sub: 'sub3',
    },
  ];

  ngOnInit(): void {
    this.getFooterFromDatabase();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  logData(): void {
    // console.log('default');
    // console.log(this._defaultFormvalue);
    // console.log('form');
    // console.log(this.formMenuFooter.value);
  }

  getFooterFromDatabase(): void {
    this.footerService.getFooter().subscribe((data) => {
      if (data.data.length > 0) {
        const xData = data.data[0];
        this._defaultFormvalue = xData;
        this.formMenuFooter.patchValue(xData);
        //#region add submenu to form
        if (xData.sub1.length > 0) {
          for (let i = 0; i < xData.sub1.length; i++) {
            const item = xData.sub1[i];
            this.setSubMenu('sub1', item.name, item.url);
          }
        }
        if (xData.sub2.length > 0) {
          for (let i = 0; i < xData.sub2.length; i++) {
            const item = xData.sub2[i];
            this.setSubMenu('sub2', item.name, item.url);
          }
        }
        if (xData.sub3.length > 0) {
          for (let i = 0; i < xData.sub3.length; i++) {
            const item = xData.sub3[i];
            this.setSubMenu('sub3', item.name, item.url);
          }
        }
        //#endregion
      }
    });
  }

  getSubMenu(subName: string) {
    return this.formMenuFooter.get(subName) as FormArray;
  }

  addSubMenu(subName: string): void {
    this.getSubMenu(subName).push(
      new FormGroup({
        name: new FormControl(),
        url: new FormControl(),
      })
    );
  }

  setSubMenu(subName: string, valueName: string, valueURL: string) {
    this.getSubMenu(subName).push(
      new FormGroup({
        name: new FormControl(valueName),
        url: new FormControl(valueURL),
      })
    );
  }

  removeSubMenu(subName: string): void {
    if (this.getSubMenu(subName).length > 0) {
      this.getSubMenu(subName).removeAt(this.getSubMenu(subName).length - 1);
    }
  }

  onReset(): void {
    if (this._defaultFormvalue != undefined) {
      return this.formMenuFooter.patchValue(this._defaultFormvalue);
    }
    return this.formMenuFooter.reset();
  }

  onSave(): void {
    this.footerService
      .saveFooter(this.formMenuFooter.value)
      .subscribe((data) => {
        this.formMenuFooter.patchValue({
          _id: data.data._id,
        });
        this._defaultFormvalue = this.formMenuFooter.value;
        // alert(data.message);
        this.toastrService.success(data.message, 'Thông báo', {
          timeOut: 4000,
        });
      });
  }
}
