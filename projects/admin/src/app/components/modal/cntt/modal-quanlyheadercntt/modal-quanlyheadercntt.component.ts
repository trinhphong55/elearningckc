import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { HeaderService } from '../../../../services/cntt/header.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-quanlyheadercntt',
  templateUrl: './modal-quanlyheadercntt.component.html',
  styleUrls: ['./modal-quanlyheadercntt.component.css'],
})
export class ModalQuanlyheadercnttComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private headerService: HeaderService,
    private toastrService: ToastrService
  ) {}

  private _defaultFormvalue: any;

  public formMenuHeader = new FormGroup({
    _id: new FormControl(null),
    icon1: new FormControl(),
    name1: new FormControl(),
    url1: new FormControl(),
    sub1: new FormArray([]),
    icon2: new FormControl(),
    name2: new FormControl(),
    url2: new FormControl(),
    sub2: new FormArray([]),
    icon3: new FormControl(),
    name3: new FormControl(),
    url3: new FormControl(),
    sub3: new FormArray([]),
    icon4: new FormControl(),
    name4: new FormControl(),
    url4: new FormControl(),
    sub4: new FormArray([]),
    icon5: new FormControl(),
    name5: new FormControl(),
    url5: new FormControl(),
    sub5: new FormArray([]),
  });

  public arrayMenu: any = [
    {
      icon: 'icon1',
      name: 'name1',
      url: 'url1',
      sub: 'sub1',
    },
    {
      icon: 'icon2',
      name: 'name2',
      url: 'url2',
      sub: 'sub2',
    },
    {
      icon: 'icon3',
      name: 'name3',
      url: 'url3',
      sub: 'sub3',
    },
    {
      icon: 'icon4',
      name: 'name4',
      url: 'url4',
      sub: 'sub4',
    },
    {
      icon: 'icon5',
      name: 'name5',
      url: 'url5',
      sub: 'sub5',
    },
  ];

  ngOnInit(): void {
    this.getHeaderFromDatabase();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  logData(): void {
    // console.log('default');
    // console.log(this._defaultFormvalue);
    // console.log('form');
    // console.log(this.formMenuHeader.value);
  }

  getHeaderFromDatabase(): void {
    this.headerService.getHeader().subscribe((data) => {
      if (data.data.length > 0) {
        const xData = data.data[0];
        this._defaultFormvalue = xData;
        this.formMenuHeader.patchValue(xData);
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
        if (xData.sub4.length > 0) {
          for (let i = 0; i < xData.sub4.length; i++) {
            const item = xData.sub4[i];
            this.setSubMenu('sub4', item.name, item.url);
          }
        }
        if (xData.sub5.length > 0) {
          for (let i = 0; i < xData.sub5.length; i++) {
            const item = xData.sub5[i];
            this.setSubMenu('sub5', item.name, item.url);
          }
        }
        //#endregion
      }
    });
  }

  getSubMenu(subName: string) {
    return this.formMenuHeader.get(subName) as FormArray;
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
      return this.formMenuHeader.patchValue(this._defaultFormvalue);
    }
    return this.formMenuHeader.reset();
  }

  onSave(): void {
    this.headerService
      .saveHeader(this.formMenuHeader.value)
      .subscribe((data) => {
        this.formMenuHeader.patchValue({
          _id: data.data._id,
        });
        this._defaultFormvalue = this.formMenuHeader.value;
        // alert(data.message);
        this.toastrService.success(data.message, 'Thông báo', {
          timeOut: 4000,
        });
      });
  }
}
