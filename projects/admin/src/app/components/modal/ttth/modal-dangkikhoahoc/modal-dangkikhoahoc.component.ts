import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { DangkilophocService } from '../../../../services/ttth/dangkilophoc.service';
@Component({
  selector: 'app-modal-dangkikhoahoc',
  templateUrl: './modal-dangkikhoahoc.component.html',
  styleUrls: ['./modal-dangkikhoahoc.component.css']
})
export class ModalDangkikhoahocComponent implements OnInit {
  constructor(private modalService: ModalService,private dangkilophocService: DangkilophocService,private toastr: ToastrService) { }
  DKKH:any[];
  dtOptions: any = {};
  ngOnInit(): void {
    this.getdanhsach();
    this.dtOptions = {
      dom: 'Bfrtip',
      buttons: [
        'excel',
      ]
    };
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
  getdanhsach(): void {
    this.dangkilophocService.get().subscribe((data) => {this.DKKH = data; setTimeout(() => {}, 500);});
  }
  delete(DKKH: any):void {
    this.dangkilophocService.delete(DKKH)
    .subscribe(data => {
      this.DKKH.push(data);
    this.getdanhsach();

    });
    this.toastr.success('Xóa thành công');
    // window.location.reload();
  }
}
