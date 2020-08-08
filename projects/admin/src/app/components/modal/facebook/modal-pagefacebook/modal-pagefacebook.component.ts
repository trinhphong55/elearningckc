import { FormGroup, FormControl } from '@angular/forms';
import { PagefbService } from './../../../../services/pagefb.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-modal-pagefacebook',
  templateUrl: './modal-pagefacebook.component.html',
  styleUrls: ['./modal-pagefacebook.component.css']
})
export class ModalPagefacebookComponent implements OnInit {

  searchpage;
  data: any;
  addForm: FormGroup;
  constructor(
    private modalService: ModalService,
    private pageFBService: PagefbService
    ) { }

  ngOnInit(): void {
    this.getAll();
    this.addForm = new FormGroup({
      tenPage: new FormControl(),
      IDpage: new FormControl(),
      linkPage: new FormControl()
    })
  }
  get tenPage() {
    return this.addForm.get('tenPage');
  }
  get IDpage() {
    return this.addForm.get('IDpage');
  }
  get linkPage() {
    return this.addForm.get('linkPage');
  }

  getAll(){
    this.pageFBService.getAll().subscribe((data) => {
      this.data = data;
    })
  }

  selectRow(data){

  }

  openDetailpage() {
    this.modalService.open('detail-pagefb');
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
