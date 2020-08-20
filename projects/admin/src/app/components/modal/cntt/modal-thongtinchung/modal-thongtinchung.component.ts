import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { ThongTinChungService } from '../../../../services/cntt/thongtinchung.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-thongtinchung',
  templateUrl: './modal-thongtinchung.component.html',
  styleUrls: ['./modal-thongtinchung.component.css'],
})
export class ModalThongtinchungComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private thongTinChungService: ThongTinChungService,
    private toastrService: ToastrService
  ) {}
  private _id: any;
  private _logo: any;
  private _logoMenu: any;

  public formThongTinChung = new FormGroup({
    diaChi: new FormControl(),
    email: new FormControl(),
    copyRight: new FormControl(),
    soDienThoai: new FormControl(),
    urlFacebook: new FormControl(),
    urlYoutube: new FormControl(),
  });
  logo: any;
  logoMenu: any;

  ngOnInit(): void {
    this.getThongTinChung();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  selectLogo(event) {
    if (event.target.files.length > 0) {
      this._logo = event.target.files[0];
    }
  }

  selectLogoMenu(event) {
    if (event.target.files.length > 0) {
      this._logoMenu = event.target.files[0];
    }
  }

  getThongTinChung(): void {
    this.thongTinChungService.getThongTinChung().subscribe((data) => {
      if (data.data.length > 0) {
        this._id = data.data[0]._id;
        this.formThongTinChung.patchValue({
          diaChi: data.data[0].diaChi,
          email: data.data[0].email,
          copyRight: data.data[0].copyRight,
          soDienThoai: data.data[0].soDienThoai,
          urlFacebook: data.data[0].urlFacebook,
          urlYoutube: data.data[0].urlYoutube,
        });
        this.logo = 'https://localhost:4100/' + data.data[0].logo;
        this.logoMenu = 'https://localhost:4100/' + data.data[0].logoMenuMobile;
      }
    });
  }

  logData(): void {
    // console.log(this._id);
  }

  onSave(): void {
    const formData = new FormData();
    formData.append('_id', this._id);
    formData.append('photos', this._logo);
    formData.append('photos', this._logoMenu);
    formData.append('diaChi', this.formThongTinChung.get('diaChi').value);
    formData.append('email', this.formThongTinChung.get('email').value);
    formData.append('copyRight', this.formThongTinChung.get('copyRight').value);
    formData.append(
      'soDienThoai',
      this.formThongTinChung.get('soDienThoai').value
    );
    formData.append(
      'urlFacebook',
      this.formThongTinChung.get('urlFacebook').value
    );
    formData.append(
      'urlYoutube',
      this.formThongTinChung.get('urlYoutube').value
    );
    this.thongTinChungService.onSave(formData).subscribe((data) => {
      // console.log(data);
      this.getThongTinChung();
      // alert('Cập nhật thành công');
      this.toastrService.success('Cập nhật thành công', 'Thông báo', {
        timeOut: 4000,
      });
    });
  }
}
