import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { BacService } from '../../../../services/Bac.service';
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
  maBac: string = "";
  TenBac: string = "";
  _id: any = "";
  constructor(private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService) {

  }
  ngOnInit(): void {
    this.getdata();
    this.getbac();
  }
  getbac()
  {
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
        if(this.data.maBac=="03")
        {
          this.data.maBac="Cao Đẳng"
          
        }
        
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
    // this.maBac = "";
    // this.TenBac = "Cao Đccccẳng";
  }
  add() {
    if (this.tenNganhNghe == "" || this.tenVietTat == "" || this.maNganhNghe == "") {
      alert(this.tenNganhNghe)
    }
    else {
   this.getbac();
   console.log(this.getbac());
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
    if(this._id=="" ||this.tenNganhNghe == "" || this.tenVietTat == "" || this.maNganhNghe == "")
    {
      alert("Chưa Đủ dữ liệu")
    }
    else
    {
    this.arr= {maNganhNghe:this.maNganhNghe,tenNganhNghe:this.tenNganhNghe,tenVietTat:this.tenVietTat,maBac:this.maBac,maNganhCha:this.maNganhCha} ;
    this.nganhngheservice.updateMonHoc(this._id,this.arr).subscribe(
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
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
