import { BomonService } from './../../../../services/khoa-bomons/bomon.service';
import { LoaidonviService } from './../../../../services/loaidonvi/loaidonvi.service';
import { KhoaBonmonService } from './../../../../services/khoa-bomons/khoa-bonmon.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, Form } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-khoabomon',
  templateUrl: './modal-khoabomon.component.html',
  styleUrls: ['./modal-khoabomon.component.css'],
})
export class ModalKhoabomonComponent implements OnInit {
  khoas: any;
  khoasTmp:any;
  bomons: any;
  dsBoMonTam: any;
  public maKhoaHienTai;
  public taiKhoan: any;
  currentKhoa = null;
  currentIndex = -1;
  display = true;
  loais: any;
  addForm: FormGroup;
  soTrang: FormControl;
  dskhoaTam: any[] = [];

  statusElementList = {};
  //status
  editting = false;
  isDone = false;
  //load component excel

  setData = () => {
    return {
      tenBoMon: this.addForm.value.tenKhoa,
      tenKhoa: this.addForm.value.tenKhoa,
      maKhoa: this.addForm.value.maKhoa,
      tenVietTat: this.addForm.value.tenVietTat,
      maLoai: this.addForm.value.loaiDonVi,
      nguoiTao: this.taiKhoan.email,
      nguoiChinhSua: this.taiKhoan.email,
    };
  };
  importExcel() {
    this.modalService.close('ctdt_khoabomon');
    this.modalService.open('ctdt_importexcelkhoabomon');
  }
  setStatusElementList() {
    this.statusElementList = {
      'bg-primary': this.editting,
      'bg-success': this.isDone,
    };
  }
  result = { msg: 'Không có gì thay đổi', status: false };

  constructor(
    private loaiDonviService: LoaidonviService,
    private modalService: ModalService,
    private BomonService: BomonService,
    private KhoaBonmonService: KhoaBonmonService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {}
  updateForm: FormGroup;
  KhoaForm: FormGroup;
  tongSoTrang: any;
  gioiHan: number = 10;
  ngOnInit(): void {
    this.soTrang = new FormControl(0);
    this.taiKhoan = this.cookieService.getAll();
    this.getKhoaBoMon();
    this.retriveLoaiDonVi();
    this.getBoMon();

    this.KhoaForm = new FormGroup({
      tenKhoa: new FormControl(''),
      tenVietTat: new FormControl(''),
    });
    this.updateForm = new FormGroup({
      tenKhoa: new FormControl(''),
      tenVietTat: new FormControl(''),
      loaiDonVi: new FormControl(''),
      tenDonVi: new FormControl(''),
    });
    this.addForm = new FormGroup({
      loaiDonVi: new FormControl('', [Validators.required]),
      maKhoa: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
      tenKhoa: new FormControl('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      tenVietTat: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
        Validators.pattern('[a-zA-Z0-9]*'),
      ]),
    });

    this.setStatusElementList();
  }

  //Validator
  get maKhoa() {
    return this.addForm.get('maKhoa');
  }
  get tenKhoa() {
    return this.addForm.get('tenKhoa');
  }
  get tenVietTat() {
    return this.addForm.get('tenVietTat');
  }
  get loaiDonVi() {
    return this.addForm.get('loaiDonVi');
  }

  //lấy tất cả LoaiDonViLoaiDonVi
  retriveLoaiDonVi() {
    this.loaiDonviService.getAll().subscribe(
      (data) => {
        this.loais = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //lay tất cả KhoaBoMonKhoaBoMon
  getKhoaBoMon() {
    this.KhoaBonmonService.getAll().subscribe(
      (data: any) => {
        this.khoas = data;
        this.dskhoaTam = data;
        this.tongSoTrang = [];
        let length = this.khoas.length / this.gioiHan;
        for (let i = 0; i < length; i++) {
          this.tongSoTrang.push(i);
        }
        this.phanTrang();
      },
      (error) => {

      }
    );
  }
  getBoMon() {
    this.BomonService.getAll().subscribe(
      (data) => {
        this.bomons = data;
        this.dsBoMonTam = data;
        this.xem_ChiTiet(this.maKhoaHienTai);
      },
      (error) => {

      }
    );
  }
  // thêm KhoaBoMon
  themDonVi() {
    let data = {
      tenBoMon: this.addForm.get('tenKhoa').value,
      tenVietTat: this.addForm.get('tenVietTat').value,
      maLoai: this.addForm.get('loaiDonVi').value,
      maKhoa: this.addForm.get('maKhoa').value,
      nguoiChinhSua: this.taiKhoan.email,
    };

    this.BomonService.create(data).subscribe(
      (response: any) => {
        this.result.msg = response.msg;
        this.result.status = response.status;
        this.toastr.success(response.msg, 'Thông báo', { timeOut: 5000 });
        this.getBoMon();
      },
      (error) => {
        if (error.status == 422)
          error.error.forEach((element) => {
            this.toastr.error(element.msg, 'ERROR', { timeOut: 6000 });
          });
      }
    );
  }
  public phanTrang() {
    let start = this.soTrang.value * this.gioiHan;
    let end = start + this.gioiHan;
    this.khoas = this.dskhoaTam.slice(start, end);

  }
  /**
   * themKhoa
   */
  public onClick_ThemKhoa() {
    let data = {
      tenKhoa: this.KhoaForm.get('tenKhoa').value,
      tenVietTat: this.KhoaForm.get('tenVietTat').value,
      nguoiChinhSua: this.taiKhoan.email,
    };
    this.KhoaBonmonService.create(data).subscribe(
      (response: any) => {
        this.result.msg = response.msg;
        this.result.status = response.status;
        this.toastr.success(response.msg, 'Thông báo', { timeOut: 6000 });
        this.getKhoaBoMon();
      },
      (error) => {
        if (error.status == 422)
          error.error.forEach((element) => {
            this.toastr.error(element.msg, 'ERROR', { timeOut: 6000 });
          });
        // this.toastr.error(error.error, 'ERROR', { timeOut: 6000 });
      }
    );
  }

  insertDateforForm(khoa) {
    this.editting = true;
    this.currentIndex = khoa._id;
    this.currentKhoa = khoa;
    if (khoa.tenKhoa) {
      this.KhoaForm.get('tenKhoa').setValue(khoa.tenKhoa);
      this.KhoaForm.get('tenVietTat').setValue(khoa.tenVietTat);
    }
    if (khoa.tenBoMon) {
      this.updateForm.get('tenDonVi').setValue(khoa.tenBoMon);
      this.updateForm.get('tenVietTat').setValue(khoa.tenVietTat);
      this.updateForm.get('loaiDonVi').setValue(khoa.maLoai);
      this.updateForm.get('tenKhoa').setValue(this.currentKhoa.maKhoa);
    }
  }
  themKhoa() {
    this.editting = false;
    this.KhoaForm.get('tenKhoa').setValue('');
    this.KhoaForm.get('tenVietTat').setValue('');
  }
  // cập nhật KhoaBoMonKhoaBoMon
  capNhat_BoMon() {
    this.result.msg = '';
    let id = this.currentIndex;
    let data = {
      tenBoMon: this.updateForm.get('tenDonVi').value,
      tenVietTat: this.updateForm.get('tenVietTat').value,
      maLoai: this.updateForm.get('loaiDonVi').value,
      nguoiChinhSua: this.taiKhoan.email,
      maKhoa: this.updateForm.get('tenKhoa').value ,
    };

    this.BomonService.update(id, data).subscribe(
      (response: any) => {
        this.result.msg = response.msg;
        this.result.status = response.status;
        this.toastr.success(this.result.msg, 'Thông báo', { timeOut: 6000 });
        //load lại dữ liệuliệu
        this.getBoMon();
        //this.xem_ChiTiet(this.maKhoaHienTai);
      },
      (error) => {
        this.toastr.error(error.message, 'ERROR', { timeOut: 6000 });
      }
    );
  }

  public capNhat_Khoa() {
    this.result.msg = '';

    let id = this.currentIndex;
    let data = {
      tenKhoa: this.KhoaForm.get('tenKhoa').value,
      tenVietTat: this.KhoaForm.get('tenVietTat').value,
      nguoiChinhSua: this.taiKhoan.email,
    };

    this.KhoaBonmonService.update(id, data).subscribe(
      (response: any) => {
        this.result.msg = response.msg;
        this.result.status = response.status;
        this.toastr.success(response.msg, 'Thông báo', { timeOut: 6000 });
        //load lại dữ liệuliệu
        this.getKhoaBoMon();
      },
      (error) => {

      }
    );
  }
  //Xoa KhoaBoMonKhoaBoMon
  deleteModal(khoa_id, khoa_maloai) {
    this.result.msg = '';
    if (khoa_maloai == 1) {
      this.KhoaBonmonService.delete(khoa_id).subscribe(
        (response: any) => {
          this.result.msg = response.msg;
          this.result.status = response.status;
          this.toastr.success(response.msg, 'Thông báo', { timeOut: 6000 });

          //load lại dữ liệuliệu
          this.getKhoaBoMon();
        },
        (error) => {

        }
      );
    } else {
      this.BomonService.delete(khoa_id).subscribe(
        (response: any) => {
          this.result.msg = response.msg;
          this.result.status = response.status;
          this.toastr.success(response.msg, 'Thông báo', { timeOut: 6000 });
          this.getBoMon();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  public xem_ChiTiet(maKhoa) {
    let dsDonVi = [];
    this.maKhoaHienTai = maKhoa;
    this.dsBoMonTam.forEach((element) => {
      if (element.maKhoa === maKhoa) {
        dsDonVi.push(element);
      }
    });
    this.bomons = dsDonVi;
  }
  saveModal() {}
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
