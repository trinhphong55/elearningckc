import { Component, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { BacService } from '../../../../services/Bac.service';
import { FormControl,FormGroup,FormBuilder,Validator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { nganhnghe } from '../../../../interfaces/NganhNghe.interface';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
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
  dsnganhnghe: nganhnghe[];

  setData = () => {
    return {
      tenNganhNghe: this.addForm.value.tenNganhNghe,
    };
  };
  constructor(private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
     private bacservice: BacService,
     private toastrService:ToastrService) {}
  ngOnInit(): void {
    this.getdata();
    this.getbac();
    this.addForm = new FormGroup({
      tenNganh: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      maNganh: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('[Z0-9]*'),
      ]),
      tenVT: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
    });

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
//check du lieu 
  check(){

  }
  // thêm một ngành nghề mới
  add() {
    if (this.tenNganhNghe == "" || this.tenVietTat == "" || this.maNganhNghe == "" || this.maNganhNghe== '0') {
      this.toastrService.error("Dữ liệu Không được để trống", 'ERROR', { timeOut: 6000 });
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
          this.toastrService.success("Thêm Thành Công", 'Thông Báo!', { timeOut: 6000 });
          }
          else
          {
            this.toastrService.error("Dữ liệu đã tồn tại", 'ERROR', { timeOut: 6000 });
          }
        },
        (error) => {
          console.log(error);
          this.toastrService.error("Dữ liệu đã tồn tại", 'ERROR', { timeOut: 6000 });
        });
      this.huy();
    }
  }
 

  //sửa 1 ngành nghề
  update() {
    if (this._id == "" || this.tenNganhNghe == "" || this.tenVietTat == "" || this.maNganhNghe == "") {
      this.toastrService.error("Dữ liệu không hợp lệ", 'ERROR', { timeOut: 6000 });
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
          this.toastrService.success("Cập Nhập thành Công", 'Thông Báo!', { timeOut: 6000 });
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
        this.toastrService.success("Xóa thành Công", 'Thông Báo!', { timeOut: 6000 });
        this.getdata();
        this.huy(); 
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


  ///excel
  spinnerEnabled = false;
  keys: string[];
  dataSheet = new Subject;
  @ViewChild('inputFile') inputFile: ElementRef;
  isExcelFile: boolean;

  onChange(evt) {
    let data;
    const target: DataTransfer = <DataTransfer>(evt.target);
    this.isExcelFile = !!target.files[0].name.match(/(.xls|.xlsx)/);
    if (target.files.length > 1) {
      this.inputFile.nativeElement.value = '';
    }
    if (this.isExcelFile) {
      this.spinnerEnabled = true;
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        data = XLSX.utils.sheet_to_json(ws);
        this.dsnganhnghe = data;
      };

      reader.readAsBinaryString(target.files[0]);

      reader.onloadend = (e) => {
        this.spinnerEnabled = false;
        this.keys = Object.keys(data[0]);
        // console.log(this.dsMonHoc);
        this.dataSheet.next(data);
      }
    } else {
      this.inputFile.nativeElement.value = '';
    }
  }


  removeData() {
    this.inputFile.nativeElement.value = '';
    this.dataSheet.next(null);
    this.keys = null;
    this.dsnganhnghe = undefined;
  }
  importExcel() {
    this.nganhngheservice.importNganhNGheFromExcel(this.dsnganhnghe).subscribe(status => {
      if (status.success) {
        this.getdata();
        this.toastrService.success("import thành công", 'Thông Báo!', { timeOut: 6000 });
       
      } else {
        if (status.error) {
          this.toastrService.error("import thất bại, dữ liệu đã tồn tại", 'Thông Báo!', { timeOut: 6000 });
        } else {
          this.toastrService.error("import thất bại", 'Thông Báo!', { timeOut: 6000 });
        }
      }
    });
   
  }


}
