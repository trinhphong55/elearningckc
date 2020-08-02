import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-quanlyheadercntt',
  templateUrl: './modal-quanlyheadercntt.component.html',
  styleUrls: ['./modal-quanlyheadercntt.component.css'],
})
export class ModalQuanlyheadercnttComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  public formMenuHeader = new FormGroup({

  })


  ngOnInit(): void {}

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
