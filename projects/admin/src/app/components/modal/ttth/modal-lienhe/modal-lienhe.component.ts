import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { LienheService } from '../../../../services/ttth/lienhe.service';
@Component({
  selector: 'app-modal-lienhe',
  templateUrl: './modal-lienhe.component.html',
  styleUrls: ['./modal-lienhe.component.css']
})
export class ModalLienheComponent implements OnInit {
  constructor(private modalService: ModalService,private LienheService: LienheService,private toastr: ToastrService) { }
  LienHe:any[];
  ngOnInit(): void {
    this.getdanhsach();
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  getdanhsach(): void {
    this.LienheService.get().subscribe((data) => {this.LienHe = data; setTimeout(() => {}, 500);});
  }
  delete(LienHe: any):void {
    this.LienheService.delete(LienHe)
    .subscribe(data => {
      this.LienHe.push(data);
      this.getdanhsach();
    });
    this.toastr.success('Xóa thành công');
    // window.location.reload();
  }

}
