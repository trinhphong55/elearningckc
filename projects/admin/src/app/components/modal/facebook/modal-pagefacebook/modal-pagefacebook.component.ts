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
  datatmp:any;
  mess:any;
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
    this.datatmp = data;
    this.tenPage.setValue(data.tenPage);
    this.IDpage.setValue(data.id_Page);
    this.linkPage.setValue(data.linkPage)
    this.getAll();
  }

  Insert(){
    this.pageFBService.create({
      tenPage: this.addForm.value.tenPage,
      id_Page: this.addForm.value.IDpage,
      linkPage: this.addForm.value.linkPage
    }).subscribe((ress:any)=>{
      this.mess = ress.msg;
      alert(this.mess);
      console.log(ress);
      this.getAll();
    })

  }

  UpdatePage(){
    this.pageFBService.update(this.datatmp._id,{
      tenPage: this.addForm.value.tenPage,
      id_Page: this.addForm.value.IDpage,
      linkPage: this.addForm.value.linkPage
    }).subscribe((ress:any)=>{
      this.mess = ress.msg;
      alert(this.mess);
      console.log(ress);
      this.getAll();
    })

  }

  DeletePage(d){
    this.pageFBService.delete(d._id).subscribe((ress:any)=>{
      this.mess = ress.msg;
      alert(this.mess);
      console.log(ress);
      this.getAll();
    })

  }

  openDetailpage() {
    this.modalService.open('detail-pagefb');
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
