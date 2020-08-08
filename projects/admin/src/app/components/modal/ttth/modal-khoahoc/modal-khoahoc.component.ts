import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { KhoahocService } from '../../../../services/ttth/khoahoc.service';
import { ttthKhoaHoc } from '../../../../../models/ttthKhoaHoc';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'https://localhost:4100/api/ttthKhoaHoc/uploads';

@Component({
  selector: 'app-modal-khoahoc',
  templateUrl: './modal-khoahoc.component.html',
  styleUrls: ['./modal-khoahoc.component.css']
})
export class ModalKhoahocComponent implements OnInit {
  constructor(private modalService: ModalService,private khoahocService: KhoahocService ,private toastr: ToastrService) { }
  KhoaHoc: ttthKhoaHoc[];

  ngOnInit(): void {
    this.getdanhsach();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.toastr.success('Tải hình ảnh thành công');
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
    this.khoahocService.get().subscribe((data) => {this.KhoaHoc = data;});
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
    if(event.target.files.length > 0)
     {
      this.nameImage = event.target.files[0].name;
     }
    if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
    }
  }
  add(tenkhoahoc: string,makhoahoc: string,color: string): void {
    tenkhoahoc = tenkhoahoc.trim();
    makhoahoc = makhoahoc.trim();
    const newItem: ttthKhoaHoc = new ttthKhoaHoc();
    newItem.tenkhoahoc = tenkhoahoc;
    newItem.image = 'https://localhost:4100/uploads/cntt/' + this.nameImage;
    newItem.makhoahoc = makhoahoc;
    newItem.noidung = this.CK;
    newItem.color = color;
    newItem.trangthai = true;
    newItem.nguoitao = 'hieu';
    newItem.nguoisua = 'loc';
    newItem.created_at = (new Date);
    newItem.updated_at = null;
    this.khoahocService.add(newItem)
      .subscribe(data => {
        this.KhoaHoc.push(data);
        setTimeout(() => {}, 0);
      });
    this.getdanhsach();
    this.toastr.success('Thêm thành công');
  }
  ///edit
  selectedItem: ttthKhoaHoc;
  onSelect(KhoaHoc: ttthKhoaHoc):void {
    this.selectedItem= KhoaHoc;
  }
  update(KhoaHoc: ttthKhoaHoc):void {
    if (this.nameImage) {
      KhoaHoc.image='https://localhost:4100/uploads/cntt/' + this.nameImage;
    }
    KhoaHoc.updated_at= new Date;
    this.khoahocService.update(KhoaHoc)
    .subscribe(data => {
      this.KhoaHoc.push(data);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(KhoaHoc: ttthKhoaHoc):void {
    this.khoahocService.delete(KhoaHoc)
    .subscribe(data => {
      this.KhoaHoc.push(data);
      setTimeout(() => {}, 0);
    });
    this.getdanhsach();
    // window.location.reload();
    this.toastr.success('Xóa thành công');
  }
  reset():void{
    this.selectedItem=null;
  }
}
