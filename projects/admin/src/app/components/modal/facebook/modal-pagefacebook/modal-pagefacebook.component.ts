import { ChangeDetialFB } from './../../../../services/changeDetailFB.service';
import { filter } from 'rxjs/operators';
import { TrangThaifbService } from './../../../../services/trangthaifb.service';
import { LoaifbService } from './../../../../services/loaifb.service';
import { BaiDangfbService } from './../../../../services/baidangfb.service';
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
  getloai: any;
  gettt: any;
  idPage:any;
  loaistt :any;
  idpage :any;
  messa :any;
  urlImg :any;
  MaLoai :any;
  tenpage:any;
  text: '';
  constructor(
    private modalService: ModalService,
    private pageFBService: PagefbService,
    private baiDangFBService: BaiDangfbService,
    private loaifbService: LoaifbService,
    private trangthaiFBService: TrangThaifbService,
    private _changeDetailFB: ChangeDetialFB
    ) { }

  ngOnInit(): void {
    this.getAll();
    this.getLoai();
    this.addForm = new FormGroup({
      tenPage: new FormControl(),
      IDpage: new FormControl(),
      linkPage: new FormControl(),
      linkStatus: new FormControl(),
      getLoaistt: new FormControl(),
      getURLimg: new FormControl(),
      getMessage: new FormControl()
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
  get linkStatus(){
    return this.addForm.get('linkStatus');
  }
  get getLoaistt(){
    return this.addForm.get('getLoaistt');
  }
  get getURLimg(){
    return this.addForm.get('getURLimg');
  }

  get getMessage(){
    return this.addForm.get('getMessage');
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

  getLoai() {
    this.loaifbService.getAll().subscribe((getloai) => {
      this.getloai = getloai;
    });
  }

  getTrangThai(){
    this.trangthaiFBService.getAll().subscribe((gettt) => {
      this.gettt = gettt;
      console.log(this.gettt);
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  insertTobd(){
    this.delay(3000).then(any=>{
      //your task after delay.
      this.loaistt = this.addForm.value.getLoaistt;
      this.idpage = $('#getidpage').val();
      this.messa = this.addForm.value.getMessage;
      this.urlImg = this.addForm.value.getURLimg;
      this.data.filter((item)=>{
        if(item.id_Page === this.idpage){
          this.tenpage = item.tenPage;
        }
      })
      this.getloai.filter((item)=>{
        if(item.loai === this.loaistt){
          this.MaLoai = item.maLoai;
        }
      })
      let linkpost = $('#linkstt').val();
      let Post_idd = $('#postid').val();
      console.log(linkpost);
      console.log(Post_idd);
      console.log(this.idpage);
      console.log(this.loaistt);
      console.log(this.messa);
      console.log(this.urlImg);
      console.log(this.tenpage);
      console.log(this.MaLoai);
      this.baiDangFBService.create({
        ID: this.idpage,
        postID: Post_idd,
        link: linkpost,
        message: this.messa,
        url: this.urlImg,
        maLoai: this.MaLoai,
        loai: this.loaistt,
        thuoc: this.tenpage
      }).subscribe((ress:any)=>{
        this.mess = ress.msg;
        alert(this.mess);
        console.log(ress);
      })
    });
  }
  insertDraft(){
    this.loaistt = this.addForm.value.getLoaistt;
    this.getloai.filter((item)=>{
      if(item.loai === this.loaistt){
        this.MaLoai = item.maLoai;
      }
    })

    this.idpage = $('#getidpage').val();
    this.messa = this.addForm.value.getMessage;
    this.urlImg = this.addForm.value.getURLimg;
    this.data.filter((item)=>{
      if(item.id_Page === this.idpage){
          this.tenpage = item.tenPage;
      }
    })

    this.baiDangFBService.createDraw({
      ID: this.idpage,
      message: this.messa,
      url: this.urlImg,
      maLoai: this.MaLoai,
      loai: this.loaistt,
      thuoc: this.tenpage
    }).subscribe((ress:any)=>{
      this.mess = ress.msg;
      alert(this.mess);
      console.log(ress);
    })
  }

  changeTitle(d){
   document.getElementById('title').innerText = "Đăng bài cho "+ d;
  }

  openDetailpage(detail) {
    this.modalService.open('detail-pagefb');
    this.text = detail.tenPage;
    this._changeDetailFB.setTitleFormPageFB(this.text);
    $('#id_P').val(detail.id_Page);
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }

}
