import { ChangeDetialFB } from './../../../../../services/changeDetailFB.service';
import { ModalService } from './../../../../../services/modal.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-groupfacebook',
  templateUrl: './detail-groupfacebook.component.html',
  styleUrls: ['./detail-groupfacebook.component.css']
})
export class DetailGroupfacebookComponent implements OnInit {

  titleFormGroup: string;

  constructor(
    private modalService: ModalService,
    private _changeDetailFB: ChangeDetialFB
  ) { }

  ngOnInit(): void {

    this._changeDetailFB.titleFromGroupFB$.subscribe(text =>this.titleFormGroup = text);
  }

  closeModal(id: string) {
    this.modalService.close(id)
  }

}
