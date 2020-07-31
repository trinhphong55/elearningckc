import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { FormGroup, FormControl } from '@angular/forms';
import {BacService} from '../../../../services/Bac.service';
import{LopHocService} from '../../../../services/lop-hoc.service'
declare var $: any

@Component({
  selector: 'app-modal-diemchinhthuc',
  templateUrl: './modal-diemchinhthuc.component.html',
  styleUrls: ['./modal-diemchinhthuc.component.css']
})
export class ModalDiemchinhthucComponent implements OnInit {
bac:any;
lop:any;
  constructor(private modalService: ModalService,
    private bacService:BacService,
    private lopHocService:LopHocService) { }

  loaiBaiVietForm = new FormGroup({
    hjhj: new FormControl(''),
    trangThai: new FormControl(''),
    khoa: new FormControl(16),
  });

  ngOnInit(): void { 
    this.danhSachBac();
    this.danhSachLop();
   }

  onSubmitSave() {
    this.loaiBaiVietForm.patchValue({
      hjhj: $("#abcdef").val()
    })
    console.log(this.loaiBaiVietForm.value)
  }
  //danh sach bac
  danhSachBac()
  {
    this.bacService.getBac().subscribe(
      (bac) => {
        this.bac = bac;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //danhSachLop
  danhSachLop()
  {
    this.lopHocService.getAll().subscribe(
      (lop) => {
        this.lop = lop;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
  

}
