import { ChangeDetialFB } from './../../../../services/changeDetailFB.service';
import { LopHocService } from './../../../../services/lop-hoc.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BacService } from '../../../../services/Bac.service';

@Component({
  selector: 'app-modal-groupfacebook',
  templateUrl: './modal-groupfacebook.component.html',
  styleUrls: ['./modal-groupfacebook.component.css'],
})
export class ModalGroupfacebookComponent implements OnInit {
  datatmp: any;
  data: any;
  bac: any;
  nganhs: any;
  lop: any;
  lopTam: [];
  editting = false;
  currentIndex = -1;
  currentLop = null;
  addForm: FormGroup;
  statusElementList = {};
  isDone = false;
  text = '';
  mss: any;
  //Khai báo list
  public bactamlist = [];
  public bacList: any;
  public lopTams: any;
  public nganhtamlist = {};
  public nganhList = {};
  public nganhTam = [];
  constructor(
    private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService,
    private lopService: LopHocService,
    private _changeDetailFB: ChangeDetialFB
  ) {}
  searchGroup;
  ngOnInit(): void {
    this.getAll();
    this.getNganh();
    this.getbac();
    this.getLop();
    this.addForm = new FormGroup({
      maBac: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      maNganh: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      khoa: new FormControl({ value: '', disabled: true }, Validators.required),
      tenLop: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      TenB: new FormControl(),
      TenN: new FormControl(),
      IDGroup: new FormControl(),
      linkGroup: new FormControl(),
      tenGroup: new FormControl(),
    });
    this._changeDetailFB.setTitleFormGroupFB(this.text);
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
  get TenB() {
    return this.addForm.get('maBac');
  }
  get TenN() {
    return this.addForm.get('maNganh');
  }
  get IDGroup() {
    return this.addForm.get('IDGroup');
  }
  get linkGroup() {
    return this.addForm.get('linkGroup');
  }
  get tenGroup() {
    return this.addForm.get('tenGroup');
  }

  getAll() {
    this.lopService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  getbac() {
    this.bacservice.getBac().subscribe((bac) => {
      this.bac = bac;
      this.bactamlist = this.bac;
    });
  }
  getNganh() {
    this.nganhngheservice.getNganhnghe().subscribe((nganhs) => {
      this.nganhs = nganhs;
      this.nganhtamlist = this.nganhs;
    });
    return this.data;
  }

  getLop() {
    this.lopService.getAll().subscribe((lop) => {
      this.lop = lop;
      this.lopTams = this.lop;
    });
  }

  //bắt sự kiện show lop theo bac
  changedBac(e) {
    this.lopTams = [];
    if (this.addForm.value.maBac !== '') {
      this.lop.forEach((element) => {
        if (element.maBac == this.addForm.value.TenB) {
          this.lopTams.push(element);
        }
      });
    } else {
      this.lopTams = this.lop;
    }
  }
  //bắt sự kiện show lop theo nganh
  changedNganh(e) {
    this.lopTams = [];
    if (this.addForm.value.maNganh !== '') {
      this.lop.forEach((element) => {
        if (element.maNganh == this.addForm.value.TenN) {
          this.lopTams.push(element);
        }
      });
    } else {
      this.lopTams = this.lop;
    }
  }

  insertDateforForm(data) {
    this.datatmp = data;
    this.editting = true;
    this.currentIndex = data._id;
    this.currentLop = data;
    let Bac;
    this.bac.filter((item) => {
      if (data.maBac == item.maBac) {
        Bac = item.tenBac;
      }
    });
    this.maBac.setValue(Bac);
    this.TenB.setValue(Bac);

    let tenNganh;
    this.nganhs.filter((item) => {
      if (data.maNganh === item.maNganhNghe) {
        tenNganh = item.tenNganhNghe;
      }
    });
    this.maNganh.setValue(tenNganh);
    this.TenN.setValue(tenNganh);

    this.khoa.setValue(data.khoa);
    this.tenLop.setValue(data.tenVietTat);
    this.IDGroup.setValue(data.IDGroupFB);
    this.tenGroup.setValue(data.tenGroupFB);
    this.linkGroup.setValue(data.linkGroupFB);
  }
  update() {
    this.lopService
      .updateFB(this.datatmp.maLopHoc, {
        tenGroupFB: this.addForm.value.tenGroup,
        IDGroupFB: this.addForm.value.IDGroup,
        linkGroupFB: this.addForm.value.linkGroup,
      })

      .subscribe((res:any) => {
        this.mss = res.msg;
        alert(this.mss);
      }

      );
  }
  openDetail(detail) {
    this.modalService.open('detail-groupfb');
    this.text = detail.tenGroupFB;
    this._changeDetailFB.setTitleFormGroupFB(this.text);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
