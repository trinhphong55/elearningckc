import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { BannerService } from '../../../../services/ttth/banner.service';
import { ttthBanner } from '../../../../../models/ttthBanner';
const URL = 'https://localhost:4100/api/ttthTintuc/uploads';
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
  //preview img
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
  //ckEditor
  public Editor = ClassicEditor;
  getBannerfromServices(): void {
    this.bannerService.getBanner().subscribe(data => this.Banner = data);
  }
}
