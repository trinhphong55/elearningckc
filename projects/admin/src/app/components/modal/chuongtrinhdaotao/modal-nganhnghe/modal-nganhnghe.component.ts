import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { BacService } from '../../../../services/Bac.service';
import { FormControl,FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
@Component({
  selector: 'app-modal-nganhnghe',
  templateUrl: './modal-nganhnghe.component.html',
  styleUrls: ['./modal-nganhnghe.component.css'],
})
export class ModalNganhngheComponent implements OnInit {

  //khai báo dư liệu
  searchName: string;
  data: any;
  bac: any;
  arr: any;
  tenNganhNghe: string = "";
  tenVietTat: string ="";
  maNganhNghe: string ="";
  maNganhCha: string ="0";
  maBac: string ="4";
  TenBac: string = "Cao Đẳng (các ngành đào tạo)";
  _id: any ="";
  tenNganhcha: string ="Không có ngành cha";
  addForm: FormGroup;
  constructor(private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
     private bacservice: BacService,) {}
  ngOnInit(): void {
    this.getdata();
    this.getbac();
    this.addForm = new FormGroup({
      tenNganhNghe : new FormControl('', [Validators.required]),
    });
  }
  get maKhoa() {
    return this.addForm.get('tenNganhNghe');
  }
  // hiển thị danh sách bậc
  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bac = bac;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // hiển thị danh sách ngành nghề
  getdata() {
    this.nganhngheservice.getNganhnghe().subscribe(
      data => {
        this.data = data;
      },
      (error) => {
        console.log(error);
      });
  }
  // lấy ngành nghề theo id
  Detail(data) {
    this.nganhngheservice.getDetailNganhNghe(data._id)
      .subscribe(
        data => {
          this.data.published = data;
        },
        error => {
          console.log(error);
        });
      //gán lại các trường nhập theo danh sách lấy ra
    this.tenNganhNghe = data.tenNganhNghe;
    this.tenVietTat = data.tenVietTat;
    this.maNganhNghe = data.maNganhNghe;
    this.maNganhCha = data.maNganhCha;
    this.maBac = data.maBac;
    this._id = data._id;
    //gán mã bâc
    this.bacservice.getTenbacFromMaBac(data.maBac).subscribe(
        bac => {
          this.TenBac = bac.tenBac;
        },
        error => {
          console.log(error);
        });
        //gán mã ngành cha
    this.data.forEach(x => {
           if(this.maNganhCha=='0' || this.maNganhCha=="" || this.maNganhCha==null )
           {
            this.tenNganhcha='Không có ngành cha';
           }
          if(this.maNganhCha=== x.maNganhNghe)
          {
            this.tenNganhcha= x.tenNganhNghe
          }

        });
        console.log(this.maNganhCha)
  }
  // hủy xóa dữ liệu trong form
  huy() {
    this.tenNganhNghe = "";
    this.tenVietTat = "";
    this.maNganhNghe = "";
    this.maNganhCha = "0";
    this._id="";
    this.maBac = "4";
    this.TenBac ="Cao Đẳng (các ngành đào tạo)";
    this.tenNganhcha ="Không có ngành cha";
  }

  // thêm một ngành nghề mới
  add() {
    if (this.tenNganhNghe == "" || this.tenVietTat == "" || this.maNganhNghe == "" || this.maNganhNghe== '0') {
      alert("Dữ liệu không được để trống và mã ngành nghề phải khác '0'")
    }
    else {
      //lấy ma bac theo ten bac hiên thi
       this.bac.forEach(x => {
        if(this.TenBac==x.tenBac)
        {
          this.maBac=x.maBac
        }
       });
       // lấy mã ngành cha theo tên ngành cha
       this.data.forEach(x => {
        if(this.tenNganhcha === 'Không có ngành cha'|| this.tenNganhcha=="")
        {
          this.maNganhCha= '0';
        }
        if(this.tenNganhcha == x.tenNganhNghe)
        {
          this.maNganhCha= x.maNganhNghe;
        }

      });
      //gán dữ liệu
      this.arr = { maNganhNghe: this.maNganhNghe, tenNganhNghe: this.tenNganhNghe, tenVietTat: this.tenVietTat, maBac: this.maBac, maNganhCha: this.maNganhCha };
      this.nganhngheservice.addnganhnghe(this.arr).subscribe(
        data => {
          if(data!=undefined)
          {
          this.arr = data;
          this.getdata();
          alert("Thêm thành công")
          }
          else
          {
            alert("Dữ liệu đã tồn tại")
          }
          console.log(data);

        },
        (error) => {
          console.log(error);
          alert("thêm thất bại,dữ liệu đã tồn tại")
        });
      this.huy();
    }
  }


  //sửa 1 ngành nghề
  update() {
    if (this._id == "" || this.tenNganhNghe == "" || this.tenVietTat == "" || this.maNganhNghe == "") {
      alert("Dữ liệu không được để trống")
    }
    else {
      this.bac.forEach(x => {
        if(this.TenBac==x.tenBac)
        {
          this.maBac=x.maBac
        }
       });
       this.data.forEach(x => {
        if(this.tenNganhcha === 'Không có ngành cha')
        {
          this.maNganhCha= '0';
        }
        if(this.tenNganhcha == x.tenNganhNghe)
        {
          this.maNganhCha= x.maNganhNghe;
        }

      });

      this.arr = { maNganhNghe: this.maNganhNghe, tenNganhNghe: this.tenNganhNghe, tenVietTat: this.tenVietTat, maBac: this.maBac, maNganhCha: this.maNganhCha };
      this.nganhngheservice.updateMonHoc(this._id, this.arr).subscribe(
        (data) => {
          this.arr = data;
          alert('Thành Công');
          this.getdata();
        },
        (error) => {
          console.log(error);
        });
    }
  }

  //xóa ngành nghề
  delete(data) {
    this.nganhngheservice.deledeNN(data._id).subscribe(
      (data) => {
        this.data.published = data;
        this.getdata();
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //xuất excel ngành nghề
  xuatexcel() {
    this.modalService.close('ctdt_nganhnghe');
    this.modalService.open('ctdt_import_excel_nganhnghe');
  }
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
