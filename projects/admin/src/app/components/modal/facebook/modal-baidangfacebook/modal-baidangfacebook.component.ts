import { PagefbService } from './../../../../services/pagefb.service';
import { LoaifbService } from './../../../../services/loaifb.service';
import { LopHocService } from './../../../../services/lop-hoc.service';
import { TrangThaifbService } from './../../../../services/trangthaifb.service';
import { BaiDangfbService } from './../../../../services/baidangfb.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-modal-baidangfacebook',
  templateUrl: './modal-baidangfacebook.component.html',
  styleUrls: ['./modal-baidangfacebook.component.css'],
})
export class ModalBaidangfacebookComponent implements OnInit {
  data: any;
  trangthai: any;
  setTrangthai: any;
  mess:any;
  selectedCityIds:[];
  selectedPgae:[];
  layloaifb:any;
  getpg:any;
  waitTime = 0;
  _ListIndex:-1;
  _listidpage:[];
  conTentt:any;
  urlImg:any;
  getMaloai:any;
  getloaifb:any;
  tenpage:any;

  //Khai báo list
  public posttams: any;
  public addForm: FormGroup;
  constructor(
    private modalService: ModalService,
    private baiDangService: BaiDangfbService,
    private trangthaifbSV: TrangThaifbService,
    private lophocSV: LopHocService,
    private LoaiFB: LoaifbService,
    private pageSV:PagefbService
  ) {}
  searchpage;
  lopHoc:any;
  ngOnInit(): void {
    this.addForm = new FormGroup({
      trangThai: new FormControl(''),
      theLoai: new FormControl(),
      getLoaisTT:new FormControl(),
      conTent:new FormControl(),
      urlimg:new FormControl(),
    });
    this.getAll();
    this.getTrangthai();
    this.changedTrangThai();
    this.getLopHoc();
    this.getLoaifb();
    this.getPage();

  }

  get getLoaisTT(){
    return this.addForm.get('getLoaisTT');
  }
  get conTent(){
    return this.addForm.get('conTent');
  }

  get urlimg(){
    return this.addForm.get('urlimg');
  }

  getAll() {
    this.baiDangService.getAll().subscribe((data) => {
      this.data = data;
      this.posttams = data;
    });
  }

  getPage(){
    this.pageSV.getAll().subscribe((getpg)=>{
      this.getpg = getpg;
    })
  }

  getLopHoc(){
    this.lophocSV.getAll().subscribe((lopHoc)=>{
      this.lopHoc = lopHoc;
    })
  }

  getLoaifb(){
    this.LoaiFB.getAll().subscribe((layloaifb)=>{
      this.layloaifb = layloaifb;
    })
  }

  getTrangthai(){
    this.trangthaifbSV.getAll().subscribe((trangthai) => {
      this.trangthai = trangthai;
    });
  }

  changeTrangthai(d){
    this.baiDangService.delete(d._id).subscribe((ress:any)=>{
      this.mess = ress.msg;
      alert(this.mess);
      console.log(ress);
      this.getAll();
    })
  }

  //bắt sự kiện show post theo trạng thái
  changedTrangThai() {
    this.posttams = [];
    if (this.addForm.value.trangThai !== '') {
      this.data.forEach((element) => {
        if (element.trangThai == this.addForm.value.trangThai) {
          this.posttams.push(element);
        }
      });
    } else {
      this.posttams = this.data;
    }
  }

  fixInput(){
    console.log(this.selectedCityIds);
    $('#listidgrp').val(this.selectedCityIds);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  transIDpage(){
    $('#listidpage').val(this.selectedPgae);


    this.delay(1000).then(any=>{
      var nofi = $('#returnloaip1').val();
        if(nofi !== ''){
          alert(nofi);
        }else{
          this._listidpage = this.selectedPgae;
           //setTimeout(function AutoCallPage(){},1000);
        }
    });
  }

  AutoCallPage() {
    //Tạo 1 flat để dừng post
    var CanContinue = true;
     this.waitTime = 20;
    console.log(this.waitTime);
    //Nếu thời gian chờ == 0 thì chạy hàm post còn khác 0 thì giảm thời gian chờ đi 1 đơn vị rồi hiển thị lên monitor
    if (this.waitTime == 0) {

      this.waitTime=20;
        //Sau đó tăng biến đếm index các group đã post
          this._ListIndex ++;
          console.log(this._ListIndex);

        //So sánh nếu danh sách các group đã post < độ dài của các group id cần post thì chạy hàm post
        if (this._ListIndex < this._listidpage.length) {

            this.insertTime(this._listidpage[this._ListIndex]);


        } else {
            //Khi đã hết các group cần post bài thì flat có giá trị fales
            CanContinue = false;
        }

    } else {
      //Nếu waitTime== 0 thì sẽ reset thời gian chờ

      this.waitTime = this.waitTime-1;
      console.log(this.waitTime);

    }

    // Tự gọi lại chính nó sau 1 giây
    if (CanContinue) {
        setTimeout(function(){ this.AutoCallPage()}, 1000);
    } else {
        console.log('Đã Đăng hết');
    }
  }

  insertTime(d){
    this.conTentt = this.addForm.value.conTent;
    this.urlImg = this.addForm.value.urlimg;
    let linkpost = $('#linkstt').val();
    let Post_idd = $('#postid').val();
    this.getloaifb = this.addForm.value.getLoaisTT;

    this.getpg.filter((item)=>{
      if(item.id_Page === d){
        this.tenpage = item.tenPage;
      }
    })
    this.layloaifb.filter((item)=>{
      if(item.loai === this.getloaifb){
        this.getMaloai = item.maLoai;
      }
    })
    console.log(this.conTentt);
    console.log(this.urlImg);
    console.log(this.tenpage);
    console.log(this.getloaifb);
    console.log(this.getMaloai);
    // console.log(linkpost);
    // console.log(Post_idd);

  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
