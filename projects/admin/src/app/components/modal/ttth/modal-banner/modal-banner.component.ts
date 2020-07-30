import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from '../../../../services/ttth/banner.service';
import { ttthBanner } from '../../../../../models/ttthBanner';
const URL = 'https://localhost:4100/api/ttthBanner/uploads';
declare var $: any;
@Component({
  selector: 'app-modal-banner',
  templateUrl: './modal-banner.component.html',
  styleUrls: ['./modal-banner.component.css']
})
export class ModalBannerComponent implements OnInit  {
  Banner: ttthBanner[];
  constructor(private modalService: ModalService,private bannerService: BannerService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBannerfromServices();
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
  //ckEditor
  public Editor = ClassicEditor;
  getBannerfromServices(): void {
    this.bannerService.getBanner().subscribe(data => this.Banner = data);
  }
  //file upload
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
   // add
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
   addBanner(link: string,vitri: string): void {
     console.log(vitri);
     link = link.trim();
     if (!link || !vitri || !this.nameImage) {
       this.toastr.success('Vui lòng nhập đủ thông tin');
     }
     else{
       const newItem: ttthBanner = new ttthBanner();
       newItem.image = 'https://localhost:4100/uploads/cntt/' + this.nameImage;
       newItem.link = link;
       newItem.vitri = vitri;
       newItem.hienthi = true;
       newItem.trangthai = true;
       newItem.nguoitao = 'hieu';
       newItem.nguoisua = 'loc';
       newItem.created_at = (new Date);
       newItem.updated_at = null;
       this.bannerService.addBanner(newItem)
         .subscribe(addBanner => {
           this.Banner.push(addBanner);
         });
       this.toastr.success('Thêm thành công');
     }
   }
  ///edit
  selectedItem: ttthBanner;
  onSelect(Banner: ttthBanner):void {
    this.selectedItem= Banner;
    this.capnhatHienThi=this.selectedItem.hienthi;
  }
  capnhatHienThi: any;
  getValueCheckBox(e){
    this.capnhatHienThi= e.target.checked;
  }
  saveBanner(Banner: ttthBanner):void {
    if (this.nameImage) {
      Banner.image='https://localhost:4100/uploads/cntt/' + this.nameImage;
    }
    Banner.updated_at= new Date;
    Banner.hienthi= this.capnhatHienThi;
    this.bannerService.suaBanner(Banner)
    .subscribe(suaBanner => {
      this.Banner.push(suaBanner);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  xoaBanner(Banner: ttthBanner):void {
    this.bannerService.xoaBanner(Banner)
    .subscribe(xoaBanner => {
      this.Banner.push(xoaBanner);
    });
    this.toastr.success('Xóa thành công');
    window.location.reload();
  }
}
