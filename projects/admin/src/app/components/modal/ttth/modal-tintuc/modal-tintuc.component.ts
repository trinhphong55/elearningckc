import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChuDeService } from '../../../../services/ttth/chude.service';
import { TintucService } from '../../../../services/ttth/tintuc.service';
import { ttthTinTuc } from '../../../../../models/ttthTinTuc';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'https://localhost:4100/api/ttthTintuc/uploads';

@Component({
  selector: 'app-modal-tintuc',
  templateUrl: './modal-tintuc.component.html',
  styleUrls: ['./modal-tintuc.component.css'],
})
export class ModalTintucComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private tintucService: TintucService,
    private chuDeService: ChuDeService,
    private toastr: ToastrService
  ) {}
  TinTuc: ttthTinTuc[];

  public danhSachChuDe: any = []; // Loc code

  ngOnInit(): void {
    this.getTinTucfromServices();
    this.getDanhSachChuDe();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.toastr.success('Tải hình ảnh thành công');
    };
  }

  //ckEditor
  public Editor = ClassicEditor;

  //file upload
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image',
  });

  closeModal(id: string) {
    this.modalService.close(id);
  }

  // Loc code
  getDanhSachChuDe(): void {
    this.chuDeService.getDanhSachChuDe().subscribe((data) => {
      this.danhSachChuDe = data.data;
    });
  } // end

  getTinTucfromServices(): void {
    this.tintucService.getTinTuc().subscribe((data) => {
      this.TinTuc = data;
      setTimeout(() => {}, 0);
    });
  }

  // add tintuc
  CK: any;
  public onChange(event: ClassicEditor.EventInfo) {
    this.CK = event.editor.getData();
  }
  nameImage: any;
  imageSrc: any;
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.nameImage = event.target.files[0].name;
    }
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => (this.imageSrc = reader.result);
      reader.readAsDataURL(file);
    }
  }
  addTinTuc(
    id_loaitintuc: string,
    tentintuc: string,
    description: string
  ): void {
    tentintuc = tentintuc.trim();
    if (
      !id_loaitintuc ||
      !tentintuc ||
      !description ||
      !this.CK ||
      !this.nameImage
    ) {
      this.toastr.success('Vui lòng nhập đủ thông tin');
    } else {
      const newTinTuc: ttthTinTuc = new ttthTinTuc();
      newTinTuc.id_loaitintuc = id_loaitintuc;
      newTinTuc.image = 'https://localhost:4100/uploads/cntt/' + this.nameImage;
      newTinTuc.tentintuc = tentintuc;
      newTinTuc.slug = 'slug';
      newTinTuc.description = description;
      newTinTuc.noidung = this.CK;
      newTinTuc.hienthi = true;
      newTinTuc.trangthai = true;
      newTinTuc.nguoitao = 'hieu';
      newTinTuc.nguoisua = 'loc';
      newTinTuc.created_at = new Date();
      newTinTuc.updated_at = null;
      this.tintucService.addTinTuc(newTinTuc).subscribe((data) => {
        this.TinTuc.push(data);
        setTimeout(() => {}, 0);
      });
      this.getTinTucfromServices();
      this.toastr.success('Thêm thành công');
    }
  }
  ///edit
  selectedItem: ttthTinTuc;
  onSelect(TinTuc: ttthTinTuc): void {
    this.selectedItem = TinTuc;
    // console.log(`selectedItem = ${JSON.stringify(this.selectedItem)}`);
    this.capnhatHienThi = this.selectedItem.hienthi;
  }
  capnhatHienThi: any;
  getValueCheckBox(e) {
    this.capnhatHienThi = e.target.checked;
  }
  saveTinTuc(TinTuc: ttthTinTuc): void {
    if (this.nameImage) {
      TinTuc.image = 'https://localhost:4100/uploads/cntt/' + this.nameImage;
    }
    TinTuc.updated_at = new Date();
    TinTuc.hienthi = this.capnhatHienThi;
    this.tintucService.suaTinTuc(TinTuc).subscribe((data) => {
      this.TinTuc.push(data);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  xoaTinTuc(TinTuc: ttthTinTuc): void {
    this.tintucService.xoaTinTuc(TinTuc).subscribe((data) => {
      this.TinTuc.push(data);
      setTimeout(() => {}, 0);
    });
    this.getTinTucfromServices();
    this.toastr.success('Xóa thành công');
  }
  reset():void{
    this.selectedItem=null;
  }
}
