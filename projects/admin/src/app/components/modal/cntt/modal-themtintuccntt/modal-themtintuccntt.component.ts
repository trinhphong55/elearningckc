import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-modal-themtintuccntt',
  templateUrl: './modal-themtintuccntt.component.html',
  styleUrls: ['./modal-themtintuccntt.component.css']
})
export class ModalThemtintuccnttComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
