import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-modal-tintuc',
  templateUrl: './modal-tintuc.component.html',
  styleUrls: ['./modal-tintuc.component.css']
})
export class ModalTintucComponent implements OnInit {
  constructor(private modalService: ModalService) { }
  public Editor = ClassicEditor;
  ngOnInit(): void {
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }
}
