import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { ThongtinwebService } from '../../../../services/ttth/thongtinweb.service';
import { ttthThongTinWeb } from '../../../../../models/ttthThongTinWeb';
const URL = 'https://localhost:4100/api/ttthThongTinWeb/uploads';
declare var $: any;
@Component({
  selector: 'app-modal-logo',
  templateUrl: './modal-logo.component.html',
  styleUrls: ['./modal-logo.component.css']
})
export class ModalLogoComponent implements OnInit {
  ThongTinWeb: ttthThongTinWeb[];
  constructor(private modalService: ModalService,private thongtinwebService: ThongtinwebService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTTWfromServices();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.toastr.success('Tải hình ảnh thành công');
    };
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  getTTWfromServices(): void {
    this.thongtinwebService.getThongTinWeb().subscribe(data => this.ThongTinWeb = data);
  }
  //file upload
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
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
  ///edit
  saveThongTinWeb(ThongTinWeb: ttthThongTinWeb):void {
    if (this.nameImage) {
      ThongTinWeb.logo='https://localhost:4100/uploads/cntt/' + this.nameImage;
    }
    ThongTinWeb.updated_at= new Date;
    this.thongtinwebService.suaThongTinWeb(ThongTinWeb)
    .subscribe(suaThongTinWeb => {
      this.ThongTinWeb.push(suaThongTinWeb);
    });
    this.toastr.success('Sửa thành công');
  }
}
