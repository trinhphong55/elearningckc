import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TintucService } from '../../../../services/ttth/tintuc.service';
import { ttthTinTuc } from '../../../../../models/ttthTinTuc';

@Component({
  selector: 'app-modal-tintuc',
  templateUrl: './modal-tintuc.component.html',
  styleUrls: ['./modal-tintuc.component.css']
})
export class ModalTintucComponent implements OnInit {
  TinTuc: ttthTinTuc[];
  constructor(private modalService: ModalService,private tintucService: TintucService) { }
  public Editor = ClassicEditor;
  ngOnInit(): void {
    this.getTinTucfromServices();
  }
  openModal(id: string) {
    this.modalService.open(id)
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  getTinTucfromServices(): void {
    this.tintucService.getTinTuc().subscribe(updatedTinTuc => this.TinTuc = updatedTinTuc);
  }
  // add tintuc
  value: any;
  onFileSelected(event) {
    if(event.target.files.length > 0)
     {
      this.value = event.target.files[0].name;
     }
   }
  addTinTuc(id_loaitintuc: string,tentintuc: string, description:string, noidung:string): void {

    tentintuc = tentintuc.trim();
    if ( !tentintuc) {
      alert('Vui lòng nhập tên');
      return;
    }
    const newTinTuc: ttthTinTuc = new ttthTinTuc();
    newTinTuc.id_loaitintuc = id_loaitintuc;
    newTinTuc.image = this.value;
    newTinTuc.tentintuc = tentintuc;
    newTinTuc.slug = 'slug';
    newTinTuc.description = description;
    newTinTuc.noidung = noidung;
    newTinTuc.trangthai = false;
    newTinTuc.nguoitao = 'hieu';
    newTinTuc.nguoisua = 'loc';
    this.tintucService.addTinTuc(newTinTuc)
      .subscribe(insertedMovie => {
        this.TinTuc.push(insertedMovie);
      });
  }
  ///edit
  selectedItem: ttthTinTuc;
  onSelect(TinTuc: ttthTinTuc):void {
    this.selectedItem= TinTuc;
    console.log(`selectedItem = ${JSON.stringify(this.selectedItem)}`);
  }
  saveTinTuc(TinTuc: ttthTinTuc):void {
    this.selectedItem= TinTuc;
    console.log(`selectedItem = ${JSON.stringify(this.selectedItem)}`);
  }

}
