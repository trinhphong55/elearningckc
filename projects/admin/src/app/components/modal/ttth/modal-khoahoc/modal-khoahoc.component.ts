import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { KhoahocService } from '../../../../services/ttth/khoahoc.service';
import { ttthKhoaHoc } from '../../../../../models/ttthKhoaHoc';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from '../../../../../../../common/helper';
const URL = 'https://localhost:4100/api/ttthKhoaHoc/uploads';

@Component({
  selector: 'app-modal-khoahoc',
  templateUrl: './modal-khoahoc.component.html',
  styleUrls: ['./modal-khoahoc.component.css']
})
export class ModalKhoahocComponent implements OnInit {
  constructor(private modalService: ModalService,private khoahocService: KhoahocService ,private toastr: ToastrService) { }
  KhoaHoc: ttthKhoaHoc[];
  private _username: any = getCookie('name');
  ngOnInit(): void {
    this.getdanhsach();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      // this.toastr.success('Tải hình ảnh thành công');
    };

  }

  //file upload
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  closeModal(id: string) {
    this.modalService.close(id)
  }

  getdanhsach(): void {
    this.khoahocService.get().subscribe((data) => {this.KhoaHoc = data;setTimeout(() => {}, 500);});
  }

  // add
  //ckEditor
  public Editor = ClassicEditor;

  CK: any;
  public onChange( event: ClassicEditor.EventInfo ) {
    this.CK = event.editor.getData()
  }
  nameImage: any;
  imageSrc: any;
  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.nameImage = event.target.files[0];
      console.log(this.nameImage);
      let img = new Image()
      img.src = window.URL.createObjectURL(event.target.files[0])
      img.onload = () => {
        if(img.width ===128 && img.height === 128){
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => (this.imageSrc = reader.result);
          reader.readAsDataURL(file);
        }
        else{
          this.imageSrc = null;
          this.toastr.error('Hình ảnh chưa đúng kích thước');
        }
      }
    };
    if (event.target.files[0].size > 2097152) {
      this.toastr.error('File yêu cầu nhỏ hơn 2MB');
    };
   }
  add(tenkhoahoc: string,makhoahoc: string,color: string,nhapdiem: string): void {
    let kiemtra: any;
    this.KhoaHoc.forEach(function (value) {
      if(value.tenkhoahoc==tenkhoahoc){
        kiemtra=true;
      }
    });
    if(kiemtra==true){
      this.toastr.error('Tên khóa học đã tồn tại');
    }
    else{
      tenkhoahoc = tenkhoahoc.trim();
      makhoahoc = makhoahoc.trim();
      const newItem: ttthKhoaHoc = new ttthKhoaHoc();
      newItem.tenkhoahoc = tenkhoahoc;
      newItem.image = 'https://localhost:4100/uploads/cntt/' + 'khoahoc_'+ this.nameImage.name;
      newItem.makhoahoc = makhoahoc;
      newItem.noidung = this.CK;
      newItem.color = color;
      newItem.nhapdiem = nhapdiem;
      newItem.trangthai = true;
      newItem.nguoitao = this._username;
      newItem.nguoisua = null;
      newItem.created_at = (new Date);
      newItem.updated_at = null;
      this.khoahocService.add(newItem)
        .subscribe(data => {
          this.KhoaHoc.push(data);
          this.getdanhsach();
        });
      this.toastr.success('Thêm thành công');
    }

  }
  ///edit
  selectedItem: ttthKhoaHoc;
  onSelect(KhoaHoc: ttthKhoaHoc):void {
    this.selectedItem= KhoaHoc;
  }
  update(KhoaHoc: ttthKhoaHoc):void {
    if (this.nameImage) {
      KhoaHoc.image='https://localhost:4100/uploads/cntt/' + 'khoahoc_'+ this.nameImage.name;
    }
    KhoaHoc.updated_at= new Date;
    KhoaHoc.nguoisua= this._username;
    this.khoahocService.update(KhoaHoc)
    .subscribe(data => {
      this.KhoaHoc.push(data);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(KhoaHoc: ttthKhoaHoc):void {
    var comfirmDel = confirm('Bạn có chắc chắn muốn xóa');
    if(comfirmDel==true){
    KhoaHoc.nguoisua= this._username;
    this.khoahocService.delete(KhoaHoc)
    .subscribe(data => {
      this.KhoaHoc.push(data);
      this.getdanhsach();
    });
    this.toastr.success('Xóa thành công');
    }
  }
  reset():void{
    this.selectedItem=null;
  }
}
