import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { ToastrService } from 'ngx-toastr';
import { DangkidotthiService } from '../../../../services/ttth/dangkidotthi.service';

@Component({
  selector: 'app-modal-dangkidotthi',
  templateUrl: './modal-dangkidotthi.component.html',
  styleUrls: ['./modal-dangkidotthi.component.css']
})
export class ModalDangkidotthiComponent implements OnInit {
  constructor(private modalService: ModalService,private DangkidotthiService: DangkidotthiService,private toastr: ToastrService) { }
  DKDT:any[];
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
    this.DangkidotthiService.get().subscribe((data) => {this.DKDT = data; setTimeout(() => {}, 500);});
  }
  delete(DKDT: any):void {
    this.DangkidotthiService.delete(DKDT)
    .subscribe(data => {
      this.DKDT.push(data);
      setTimeout(() => {}, 0);
    this.getdanhsach();

    });
    this.toastr.success('Xóa thành công');
    // window.location.reload();
  }

}
