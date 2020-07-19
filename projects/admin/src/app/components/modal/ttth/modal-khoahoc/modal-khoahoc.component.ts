import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { Test } from '../../../../components/modal/ttth/modal-khoahoc/test';

@Component({
  selector: 'app-modal-khoahoc',
  templateUrl: './modal-khoahoc.component.html',
  styleUrls: ['./modal-khoahoc.component.css']
})
export class ModalKhoahocComponent implements OnInit {
  test: Test[] = [
  {
    id:1,
    ten:"Ten 1",
    noidung:"Noi dung 1"
  },
  {
    id:2,
    ten:"Ten 2",
    noidung:"Noi dung 2"
  },
  {
    id:3,
    ten:"Ten 3",
    noidung:"Noi dung 3"
  },
  {
    id:4,
    ten:"Ten 4",
    noidung:"Noi dung 4"
  }
  ]
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
  ///
  selectedItem: Test;
  onSelect(test: Test):void {
    this.selectedItem= test;
    console.log(`selectedItem = ${JSON.stringify(this.selectedItem)}`);
  }
}
