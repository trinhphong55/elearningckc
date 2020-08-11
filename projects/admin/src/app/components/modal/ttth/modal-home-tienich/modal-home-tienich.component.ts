import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { TienichService } from '../../../../services/ttth/tienich.service';
import { ttthTienIch } from '../../../../../models/ttthTienIch';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'https://localhost:4100/api/ttthTintuc/uploads';
@Component({
  selector: 'app-modal-home-tienich',
  templateUrl: './modal-home-tienich.component.html',
  styleUrls: ['./modal-home-tienich.component.css']
})
export class ModalHomeTienichComponent implements OnInit {
  constructor(private modalService: ModalService,private tienichService: TienichService ,private toastr: ToastrService) { }
  TienIch: ttthTienIch[];

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
    this.tienichService.get().subscribe((data) => {this.TienIch = data;
      setTimeout(() => {}, 0);
    });
  }

  // add tintuc
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
  add(ten: string,mota: string, link:string): void {
    ten = ten.trim();
    mota = mota.trim();
    link = link.trim();
    const newTinTuc: ttthTienIch = new ttthTienIch();
    newTinTuc.ten = ten;
    newTinTuc.mota = mota;
    newTinTuc.image = 'https://localhost:4100/uploads/cntt/' + this.nameImage;
    newTinTuc.link = link;
    newTinTuc.trangthai = true;
    newTinTuc.nguoitao = 'hieu';
    newTinTuc.nguoisua = 'loc';
    newTinTuc.created_at = (new Date);
    newTinTuc.updated_at = null;
    this.tienichService.add(newTinTuc)
      .subscribe(data => {
        this.TienIch.push(data);
      });
    this.getdanhsach();
    this.toastr.success('Thêm thành công');
  }
  ///edit
  selectedItem: ttthTienIch;
  onSelect(TienIch: ttthTienIch):void {
    this.selectedItem= TienIch;
  }
  capnhatHienThi: any;
  getValueCheckBox(e){
    this.capnhatHienThi= e.target.checked;
  }
  update(TienIch: ttthTienIch):void {
    if (this.nameImage) {
      TienIch.image='https://localhost:4100/uploads/cntt/' + this.nameImage;
    }
    TienIch.updated_at= new Date;
    this.tienichService.update(TienIch)
    .subscribe(data => {
      this.TienIch.push(data);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(TienIch: ttthTienIch):void {
    this.tienichService.delete(TienIch)
    .subscribe(data => {
      this.TienIch.push(data);
    });
    this.getdanhsach();
    window.location.reload();
    this.toastr.success('Xóa thành công');
  }
  reset():void{
    this.selectedItem=null;
  }
}
