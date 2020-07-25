import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-modal-chinhsuabaivietcntt',
  templateUrl: './modal-chinhsuabaivietcntt.component.html',
  styleUrls: ['./modal-chinhsuabaivietcntt.component.css']
})
export class ModalChinhsuabaivietcnttComponent implements OnInit {

  public Editor = ClassicEditor;
  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
