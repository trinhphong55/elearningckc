import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TintucService } from '../../../../services/ttth/tintuc.service';
import { ttthTinTuc } from '../../../../../models/ttthTinTuc';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
const URL = 'https://localhost:4100/api/ttthTintuc/uploads';
declare var $: any;

@Component({
  selector: 'app-modal-tintuc',
  templateUrl: './modal-tintuc.component.html',
  styleUrls: ['./modal-tintuc.component.css']
})
export class ModalTintucComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private modalService: ModalService,private tintucService: TintucService ,private toastr: ToastrService) { }
  TinTuc: ttthTinTuc[];

  ngOnInit(): void {
    this.getTinTucfromServices();
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.toastr.success('Tải hình ảnh thành công');
    };

  }

  //datatable
  ngAfterViewInit(): void {
    // $(document).ready(function () {
    //   $('.datatable').DataTable();
    // });
    setTimeout(function () {
      $(function () {
        $('.datatable').DataTable();
      });
    }, 3000);
  }
  ngOnDestroy(): void {
    $('.datatable').off();
  }
  //ckEditor
  public Editor = ClassicEditor;

  //file upload
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });

  openModal(id: string) {
    this.modalService.open(id)
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

  getTinTucfromServices(): void {
    this.tintucService.getTinTuc().subscribe(data => this.TinTuc = data);
  }

  // filter ngFOr
  // filterItemsOfType(){
  //   return this.TinTuc.filter((item) => item.trangthai === true);
  // }
  // add tintuc
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
  addTinTuc(id_loaitintuc: string,tentintuc: string, description:string): void {
    tentintuc = tentintuc.trim();
    if (!id_loaitintuc || !tentintuc || !description || !this.CK || !this.nameImage) {
      this.toastr.success('Vui lòng nhập đủ thông tin');
    }
    else{
      const newTinTuc: ttthTinTuc = new ttthTinTuc();
      newTinTuc.id_loaitintuc = id_loaitintuc;
      newTinTuc.image = 'uploads/ttth/tintuc/' + this.nameImage;
      newTinTuc.tentintuc = tentintuc;
      newTinTuc.slug = 'slug';
      newTinTuc.description = description;
      newTinTuc.noidung = this.CK;
      newTinTuc.hienthi = true;
      newTinTuc.trangthai = true;
      newTinTuc.nguoitao = 'hieu';
      newTinTuc.nguoisua = 'loc';
      newTinTuc.created_at = (new Date);
      newTinTuc.updated_at = null;
      this.tintucService.addTinTuc(newTinTuc)
        .subscribe(addTinTuc => {
          this.TinTuc.push(addTinTuc);
        });
      this.toastr.success('Thêm thành công');
    }
  }
  ///edit
  capnhatHienThi = false;
  getValueCheckBox(e){
    this.capnhatHienThi= e.target.checked;
  }
  selectedItem: ttthTinTuc;
  onSelect(TinTuc: ttthTinTuc):void {
    this.selectedItem= TinTuc;
    // console.log(`selectedItem = ${JSON.stringify(this.selectedItem)}`);
  }
  saveTinTuc(TinTuc: ttthTinTuc):void {
    TinTuc.updated_at= new Date;
    TinTuc.hienthi= this.capnhatHienThi;
    this.tintucService.suaTinTuc(TinTuc)
    .subscribe(suaTinTuc => {
      this.TinTuc.push(suaTinTuc);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  xoaTinTuc(TinTuc: ttthTinTuc):void {
    this.tintucService.xoaTinTuc(TinTuc)
    .subscribe(xoaTinTuc => {
      this.TinTuc.push(xoaTinTuc);
    });
    this.toastr.success('Xóa thành công');
    window.location.reload();
  }
}
