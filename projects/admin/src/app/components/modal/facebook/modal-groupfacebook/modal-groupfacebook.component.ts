import { LopHocService } from './../../../../services/lop-hoc.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BacService } from '../../../../services/Bac.service';

@Component({
  selector: 'app-modal-groupfacebook',
  templateUrl: './modal-groupfacebook.component.html',
  styleUrls: ['./modal-groupfacebook.component.css'],
})
export class ModalGroupfacebookComponent implements OnInit {
  data: any;
  bac: any;
  nganhs: any;
  lop: any;
  editting= false;
  currentIndex=-1;
  currentLop=null;
  addForm: FormGroup;
  statusElementList = {};
  isDone = false;
  constructor(
    private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService,
    private lopService: LopHocService
  ) {}
  searchGroup;
  ngOnInit(): void {
    this.getAll();
    this.getNganh();
    this.getbac();
    this.getLop();
    this.addForm = new FormGroup({
      maBac: new FormControl({value: '', disabled: true}, Validators.required),
      maNganh: new FormControl({value: '', disabled: true}, Validators.required),
      khoa: new FormControl({value: '', disabled: true}, Validators.required),
      tenLop: new FormControl({value: '', disabled: true}, Validators.required),
    });

  }
  //Validator
  get maBac() {
    return this.addForm.get('maBac');
  }
  get maNganh() {
    return this.addForm.get('maNganh');
  }
  get khoa() {
    return this.addForm.get('khoa');
  }
  get tenLop() {
    return this.addForm.get('tenLop');
  }
  getAll() {
    this.lopService.getAll().subscribe(
      data=> {
      this.data = data;
    });
  }

  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bac = bac;
      },
    );
  }
  getNganh() {
    this.nganhngheservice.getNganhnghe().subscribe(
      (nganhs) => {
        this.nganhs = nganhs;
      },
    );
    return this.data;
  }

  getLop() {
    this.lopService.getAll().subscribe((lop) => {
      this.lop = lop;
    });
  }


  insertDateforForm(data) {
    this.editting = true;
    this.currentIndex = data._id;
    this.currentLop = data;
    let Bac;
    this.bac.filter(item => {
      console.log(this.bac);
      if (data.maBac == item.maBac) {
        Bac = item.tenBac;
      }
      console.log(Bac);
    })
    this.maBac.setValue(Bac);

    let tenNganh;
    this.nganhs.filter(item => {
      if (data.maNganh === item.maNganhNghe) {
        tenNganh = item.tenNganhNghe;
      }
    })
    this.maNganh.setValue(tenNganh);

    this.khoa.setValue(data.khoa);
    this.tenLop.setValue(data.tenLop);
    console.log(data)
  }

  openDetail(id_fb: number) {
    this.modalService.open('detail-groupfb');

      console.log(id_fb);

  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
