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
  addTinTuc(id_loaitintuc: string,tentintuc: string, description:string, noidung:string): void {
    tentintuc = tentintuc.trim();
    if ( !tentintuc) {
      alert('Vui lòng nhập tên');
      return;
    }
    const newMovie: ttthTinTuc = new ttthTinTuc();
    newMovie.id_loaitintuc = id_loaitintuc;
    newMovie.tentintuc = tentintuc;
    newMovie.description = description;
    newMovie.noidung = noidung;
    newMovie.trangthai = true;
    newMovie.nguoitao = 'hieu';
    newMovie.nguoisua = 'loc';
    this.tintucService.addTinTuc(newMovie)
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
  saveTinTuc():void {
    this.TintucService
  }

}
