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
  currentKhoa = null;
  currentIndex = -1;
  display = true;
  loais: any;
  addForm: FormGroup;

  result = {
    msg: '',
    status: false,
  };

  constructor(
    private loaiDonviService: LoaidonviService,
    private modalService: ModalService,
    private KhoaBonmonService: KhoaBonmonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retriveKhoaBoMon();
    this.retriveLoaiDonVi();
    this.addForm = new FormGroup({
      loaiDonVi: new FormControl('', [Validators.required]),
      maKhoa: new FormControl('', [Validators.required]),
      tenKhoa: new FormControl('', [Validators.required]),
      tenVietTat: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
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

  setActiveKhoaBoMon(khoa, index) {
    this.currentKhoa = khoa;
    this.currentIndex = index;

    // this.tenKhoa.setValue(khoa.tenKhoa);
    // this.maKhoa.setValue(khoa.maKhoa);
    // this.tenVietTat.setValue(khoa.tenVietTat);
    // this.loai.setValue(khoa.loai);
  }
  removeDisplayKhoa(khoa) {
    if (khoa.trangThai === 1) {
      return true;
    }
    return false;
  }
  //lấy tất cả LoaiDonViLoaiDonVi
  retriveLoaiDonVi() {
    this.loaiDonviService.getAll().subscribe(
      (data) => {
        this.loais = data;
        console.log(this.loais);
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
        console.log(this.khoas);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // thêm KhoaBoMon
  addModal() {
    const data = {
      tenKhoa: this.addForm.value.tenKhoa,
      maKhoa: this.addForm.value.maKhoa,
      tenVietTat: this.addForm.value.tenVietTat,
      maLoai: this.addForm.value.loaiDonVi,
      nguoiTao: 'HuyHuy',
      nguoiChinhSua: 'huy',
    };
    console.log(data);
    this.KhoaBonmonService.create(data).subscribe(
      (response) => {
        // this.result.msg = response.msg;
        // this.result.status = response.status;
        this.retriveKhoaBoMon();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // cập nhật KhoaBoMonKhoaBoMon
  updateModal(id, khoa) {
    khoa = {
      tenKhoa: this.addForm.value.tenKhoa,
      maKhoa: this.addForm.value.maKhoamaKhoa,
      tenVietTat: this.addForm.value.tenVietTat,
      maLoai: this.addForm.value.maLoai,
      nguoiTao: 'Them do sau',
      nguoiChinhSua: 'huy',
    };

    this.KhoaBonmonService.update(id, khoa).subscribe(
      (response) => {
        // this.result.msg = response.msg;
        // this.result.status = response.status;
        //load lại dữ liệuliệu
        this.retriveKhoaBoMon();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //Xoa KhoaBoMonKhoaBoMon
  deleteModal(khoa_id) {
    this.KhoaBonmonService.delete(khoa_id).subscribe(
      (response) => {
        // this.result.msg = response.msg;
        // this.result.status = response.status;
        //load lại dữ liệuliệu
        this.retriveKhoaBoMon();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  saveModal() {}
  closeModal(id: string) {
    this.modalService.close(id);
  }
}
