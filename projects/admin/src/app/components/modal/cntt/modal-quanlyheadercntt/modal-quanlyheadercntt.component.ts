import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-quanlyheadercntt',
  templateUrl: './modal-quanlyheadercntt.component.html',
  styleUrls: ['./modal-quanlyheadercntt.component.css'],
})
export class ModalQuanlyheadercnttComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  private _defaultFormvalue: any;
  public formMenuHeader = new FormGroup({
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

  ngOnInit(): void {}

  closeModal(id: string) {
    this.modalService.close(id);
  }

  logData(): void {
    console.log(this.formMenuHeader.value);
  }

  getSubMenu(name: string) {
    return this.formMenuHeader.get(name) as FormArray;
  }

  addSubMenu(name: string): void {
    this.getSubMenu(name).push(
      new FormGroup({
        name: new FormControl(),
        url: new FormControl(),
      })
    );
  }

  removeSubMenu(name: string): void {
    if (this.getSubMenu(name).length > 0) {
      this.getSubMenu(name).removeAt(this.getSubMenu(name).length - 1);
    }
  }

  onReset(): void {
    this.formMenuHeader.patchValue(this._defaultFormvalue);
  }

  onSave(): void {
    this._defaultFormvalue = this.formMenuHeader.value;
    console.log(this.formMenuHeader.value);
    alert('Cập nhật thành công.');
  }
}
