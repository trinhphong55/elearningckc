import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { LophocService } from '../../../../services/ttth/lophoc.service';
import { KhoahocService } from '../../../../services/ttth/khoahoc.service';
import { ttthLopHoc } from '../../../../../models/ttthLopHoc';
import { ToastrService } from 'ngx-toastr';
import { getCookie } from '../../../../../../../common/helper';
@Component({
  selector: 'app-modal-ttth-lophoc',
  templateUrl: './modal-ttth-lophoc.component.html',
  styleUrls: ['./modal-ttth-lophoc.component.css']
})
export class ModalTtthLophocComponent implements OnInit {
  constructor(private modalService: ModalService,private lophocService: LophocService,private khoahocService: KhoahocService ,private toastr: ToastrService) { }
  LopHoc: ttthLopHoc[];
  MaKhoaHoc: any[];
  private NhapDiem: 'ádsad';
  private _username: any = getCookie('displayName');
  getYear = new Date().getFullYear();
  ngOnInit(): void {
    this.getdanhsach();
    this.getmakhoahoc();
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  getdanhsach(): void {
    this.lophocService.get().subscribe((data) => {this.LopHoc = data ;setTimeout(() => {}, 500);});
  }
  getmakhoahoc(): void {
    this.khoahocService.get().subscribe((data) => this.MaKhoaHoc = data);
  }
  reset():void{
    this.selectedItem=null;
  }
  add(makhoahoc: string,dot: string,giaovien: string,buoihoc: string,giohoc: string,ngaykhaigiang: string,hocphi: string): void {
    this.MaKhoaHoc.forEach(function (value) {
      if (makhoahoc==value.makhoahoc) {
        // this.NhapDiem = value.nhapdiem;
        alert(this.NhapDiem)
      }
    });
    const newItem: ttthLopHoc = new ttthLopHoc();
    newItem.makhoahoc = makhoahoc;
    newItem.dot = dot;
    newItem.lop =  String(this.getYear);
    newItem.buoihoc = buoihoc;
    newItem.giohoc = giohoc;
    newItem.ngaykhaigiang = ngaykhaigiang;
    newItem.hocphi = hocphi;
    newItem.giaovien = giaovien;
    newItem.nhapdiem = this.NhapDiem;
    newItem.trangthai = true;
    newItem.nguoitao = this._username;
    newItem.nguoisua = null;
    newItem.created_at = (new Date);
    newItem.updated_at = null;
    this.lophocService.add(newItem)
      .subscribe(data => {
        this.LopHoc.push(data);
        this.getdanhsach();

      });
    this.toastr.success('Thêm thành công');
  }
  ///edit
  selectedItem: ttthLopHoc;
  onSelect(LopHoc: ttthLopHoc):void {
    this.selectedItem= LopHoc;
  }
  update(LopHoc: ttthLopHoc):void {
    LopHoc.updated_at= new Date;
    LopHoc.nguoisua= this._username;
    this.lophocService.update(LopHoc)
    .subscribe(data => {
      this.LopHoc.push(data);
    this.getdanhsach();

    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(LopHoc: ttthLopHoc):void {
    var comfirmDel = confirm('Bạn có chắc chắn muốn xóa');
    if(comfirmDel==true){
      LopHoc.nguoisua= this._username;
      this.lophocService.delete(LopHoc)
      .subscribe(data => {
        this.LopHoc.push(data);
      this.getdanhsach();

      });
      this.toastr.success('Xóa thành công');
    }
  }
}
