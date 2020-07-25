import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-modal-chinhsuatintuccntt',
  templateUrl: './modal-chinhsuatintuccntt.component.html',
  styleUrls: ['./modal-chinhsuatintuccntt.component.css']
})
export class ModalChinhsuatintuccnttComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
}
