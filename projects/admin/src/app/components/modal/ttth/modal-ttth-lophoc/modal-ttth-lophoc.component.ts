import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { LophocService } from '../../../../services/ttth/lophoc.service';
import { KhoahocService } from '../../../../services/ttth/khoahoc.service';
import { ttthLopHoc } from '../../../../../models/ttthLopHoc';
import { ToastrService } from 'ngx-toastr';
import { exit } from 'process';

@Component({
  selector: 'app-modal-ttth-lophoc',
  templateUrl: './modal-ttth-lophoc.component.html',
  styleUrls: ['./modal-ttth-lophoc.component.css']
})
export class ModalTtthLophocComponent implements OnInit {
  constructor(private modalService: ModalService,private lophocService: LophocService,private khoahocService: KhoahocService ,private toastr: ToastrService) { }
  LopHoc: ttthLopHoc[];
  MaKhoaHoc: any[];
  ngOnInit(): void {
    this.getdanhsach();
    this.getmakhoahoc();
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

  getdanhsach(): void {
    this.lophocService.get().subscribe((data) => {this.LopHoc = data});
  }
  getmakhoahoc(): void {
    this.khoahocService.get().subscribe((data) => this.MaKhoaHoc = data);
  }

  // add
  add(makhoahoc: string,dot: string,giaovien: string,buoihoc: string,giohoc: string,ngaykhaigiang: string,hocphi: string): void {
    const newItem: ttthLopHoc = new ttthLopHoc();
    newItem.makhoahoc = makhoahoc;
    newItem.dot = dot;
    newItem.lop = makhoahoc + '-' + new Date().getFullYear() + '-' + dot + '-' + buoihoc + '-' + giaovien;
    newItem.buoihoc = buoihoc;
    newItem.giohoc = giohoc;
    newItem.ngaykhaigiang = ngaykhaigiang;
    newItem.hocphi = hocphi;
    newItem.giaovien = giaovien;
    newItem.trangthai = true;
    newItem.nguoitao = 'hieu';
    newItem.nguoisua = 'loc';
    newItem.created_at = (new Date);
    newItem.updated_at = null;
    this.lophocService.add(newItem)
      .subscribe(data => {
        this.LopHoc.push(data);
      });
    this.getdanhsach();
    this.toastr.success('Thêm thành công');
  }
  ///edit
  selectedItem: ttthLopHoc;
  onSelect(LopHoc: ttthLopHoc):void {
    this.selectedItem= LopHoc;
  }
  update(LopHoc: ttthLopHoc):void {
    LopHoc.updated_at= new Date;
    this.lophocService.update(LopHoc)
    .subscribe(data => {
      this.LopHoc.push(data);
    });
    this.toastr.success('Sửa thành công');
  }
  //delete
  delete(LopHoc: ttthLopHoc):void {
    this.lophocService.delete(LopHoc)
    .subscribe(data => {
      this.LopHoc.push(data);
    });
    this.getdanhsach();
    // window.location.reload();
    this.toastr.success('Xóa thành công');
  }

}
