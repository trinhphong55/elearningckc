import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { BacService } from '../../../../services/Bac.service';
import { FormControl,FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-nganhnghe',
  templateUrl: './modal-nganhnghe.component.html',
  styleUrls: ['./modal-nganhnghe.component.css']
})
export class ModalNganhngheComponent implements OnInit {
  searchName: string;
  data: any;
  bac: any;
  arr: any;
  tenNganhNghe: string = "";
  tenVietTat: string = "";
  maNganhNghe: string = "";
  maNganhCha: string = "";
  maBac: string = "04";
  TenBac: string = "Cao Đẳng Nghề";
  _id: any = "";
  constructor(private modalService: ModalService,
    private nganhngheservice: NganhNgheService, 
     private bacservice: BacService,) {}
  ngOnInit(): void {
    this.getdata();
    this.getbac();
  }
  getbac() {
    this.bacservice.getBac().subscribe(
      bac => {
        this.bac = bac;
      },
      error => {
        console.log(error);
      });
  }
  getdata() {
    this.nganhngheservice.getNgangnghe().subscribe(
      data => {
        this.data = data;
      },
      error => {
        console.log(error);
      });
  }
  Detail(data) {
    this.nganhngheservice.getDetailNganhNghe(data._id)
      .subscribe(
        data => {
          this.data.published = data;
        },
        error => {
          console.log(error);
        });
    this.tenNganhNghe = data.tenNganhNghe;
    this.tenVietTat = data.tenVietTat;
    this.maNganhNghe = data.maNganhNghe;
    this.maNganhCha = data.maNganhCha;
    this.maBac = data.maBac;
    this._id = data._id;
    this.bacservice.getTenbacFromMaBac(data.maBac)
      .subscribe(
        bac => {
          this.TenBac = bac.tenBac;
        },
        error => {
          console.log(error);
        });
    console.log(this.TenBac)
  }
  huy() {
    this.tenNganhNghe = "";
    this.tenVietTat = "";
    this.maNganhNghe = "";
    this.maNganhCha = "";
    this._id="";
    // this.maBac = "";
    // this.TenBac = "Cao Đccccẳng";
  }
  add() {
    if (this.tenNganhNghe == "" || this.tenVietTat == "" || this.maNganhNghe == "") {
      alert("Dữ liệu không được để trống")
    }
    else {
      this.getbac();
      if(this.TenBac=="Cao Đẳng Nghề")
      {
        this.maBac="04"
      }
      else if(this.TenBac=="Cao Đẳng")
      {
        this.maBac="03"
      }
      else 
      {
        this.maBac="05"
      }


      this.arr = { maNganhNghe: this.maNganhNghe, tenNganhNghe: this.tenNganhNghe, tenVietTat: this.tenVietTat, maBac: this.maBac, maNganhCha: this.maNganhCha };
      this.nganhngheservice.addnganhnghe(this.arr).subscribe(
        data => {
          this.arr = data;
          this.getdata();
          alert("ok")
        },
        error => {
          console.log(error);
        });
      this.huy();
    }
  }
  update() {
    if (this._id == "" || this.tenNganhNghe == "" || this.tenVietTat == "" || this.maNganhNghe == "") {
      alert("Chưa Đủ dữ liệu")
    }
    else {
      if(this.TenBac=="Cao Đẳng Nghề")
      {
        this.maBac="04"
      }
      else if(this.TenBac=="Cao Đẳng")
      {
        this.maBac="03"
      }
      else 
      {
        this.maBac="05"
      }
      this.arr = { maNganhNghe: this.maNganhNghe, tenNganhNghe: this.tenNganhNghe, tenVietTat: this.tenVietTat, maBac: this.maBac, maNganhCha: this.maNganhCha };
      this.nganhngheservice.updateMonHoc(this._id, this.arr).subscribe(
        data => {
          this.arr = data;
          alert("Thành Công")
          this.getdata();
        },
        error => {
          console.log(error);
        });
      console.log(this._id)
    }
  }

  delete(data) {
    this.nganhngheservice.deledeNN(data._id)
      .subscribe(
        data => {
          this.data.published = data;
          this.getdata();
        },
        error => {
          console.log(error);
        });
  }
  xuatexcel() {
      this.modalService.close('ctdt_nganhnghe');
      this.modalService.open('ctdt_import_excel_nganhnghe');
    }
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
