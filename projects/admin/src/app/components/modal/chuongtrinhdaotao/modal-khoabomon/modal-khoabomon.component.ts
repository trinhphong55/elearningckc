import { BomonService } from './../../../../services/khoa-bomons/bomon.service';
import { LoaidonviService } from './../../../../services/loaidonvi/loaidonvi.service';
import { KhoaBonmonService } from './../../../../services/khoa-bomons/khoa-bonmon.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal-khoabomon',
  templateUrl: './modal-khoabomon.component.html',
  styleUrls: ['./modal-khoabomon.component.css'],
})
export class ModalKhoabomonComponent implements OnInit {
  khoas: any;
  bomons: any;

  currentKhoa = null;
  currentIndex = -1;
  display = true;
  loais: any;
  addForm: FormGroup;

  statusElementList = {};
  //status
  editting = false;
  isDone = false;
  //load component excel

  setData = () => {
    return {
      maBoMon: this.addForm.value.maKhoa,
      tenBoMon: this.addForm.value.tenKhoa,
      tenKhoa: this.addForm.value.tenKhoa,
      maKhoa: this.addForm.value.maKhoa,
      tenVietTat: this.addForm.value.tenVietTat,
      maLoai: this.addForm.value.loaiDonVi,
      nguoiTao: 'HuyHuy',
      nguoiChinhSua: 'huy',
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
  result = { msg: '', status: false };

  constructor(
    private loaiDonviService: LoaidonviService,
    private modalService: ModalService,
    private BomonService: BomonService,
    private KhoaBonmonService: KhoaBonmonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retriveKhoaBoMon();
    this.retriveLoaiDonVi();
    this.getBoMon();
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
        Validators.minLength(4),
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
  retriveKhoaBoMon() {
    this.KhoaBonmonService.getAll().subscribe(
      (data) => {
        this.khoas = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getBoMon() {
    this.BomonService.getAll().subscribe(
      (data) => {
        this.bomons = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // thêm KhoaBoMon
  addModal() {
    if (this.addForm.value.loaiDonVi == 1) {
      this.KhoaBonmonService.create(this.setData).subscribe(
        (response) => {
          //this.result.msg = response.msg;
          //this.result.status = response.status;
          console.log(response);
          this.retriveKhoaBoMon();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.BomonService.create(this.setData).subscribe(
        (response) => {
          //this.result.msg = response.msg;
          //this.result.status = response.status;
          console.log(response);

          this.retriveKhoaBoMon();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  insertDateforForm(khoa) {
    this.editting = true;
    this.currentIndex = khoa._id;
    this.currentKhoa = khoa;

    this.tenKhoa.setValue(khoa.tenKhoa);
    this.maKhoa.setValue(khoa.maKhoa);
    this.tenVietTat.setValue(khoa.tenVietTat);
    this.loaiDonVi.setValue(khoa.maLoai);
  }
  // cập nhật KhoaBoMonKhoaBoMon
  updateModal(id, khoa) {

    if (this.addForm.value.maLoai == 1) {
      this.KhoaBonmonService.update(id, this.setData).subscribe(
        (response) => {
          // this.result.msg = response.msg;
          //this.result.status = response.status;
          console.log(response);
          //load lại dữ liệuliệu
          this.retriveKhoaBoMon();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.BomonService.update(id, this.setData).subscribe(
        (response) => {
          // this.result.msg = response.msg;
          //this.result.status = response.status;
          console.log(response);
          //load lại dữ liệuliệu
          this.retriveKhoaBoMon();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  //Xoa KhoaBoMonKhoaBoMon
  deleteModal(khoa_id, khoa_maloai) {
    if(khoa_maloai == 1){
      this.KhoaBonmonService.delete(khoa_id).subscribe(
        (response) => {
          //this.result.msg = response.msg;
          //this.result.status = response.status;
          console.log(response);
          //load lại dữ liệuliệu
          this.retriveKhoaBoMon();

        },
        (error) => {
          console.log(error);
        }
      );
    }else{
     
      this.BomonService.delete(khoa_id).subscribe(
        (response) => {
          //this.result.msg = response.msg;
          //this.result.status = response.status;
          console.log(response);
          //load lại dữ liệuliệu

          this.getBoMon();
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }
  saveModal() {}
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
