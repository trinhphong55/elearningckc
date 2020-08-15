import { BaiDangfbService } from './../../../../services/baidangfb.service';
import { LoaifbService } from './../../../../services/loaifb.service';
import { ChangeDetialFB } from './../../../../services/changeDetailFB.service';
import { LopHocService } from './../../../../services/lop-hoc.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BacService } from '../../../../services/Bac.service';
import { DetailGroupfacebookComponent } from '../details/detail-groupfacebook/detail-groupfacebook.component';

@Component({
  selector: 'app-modal-groupfacebook',
  templateUrl: './modal-groupfacebook.component.html',
  styleUrls: ['./modal-groupfacebook.component.css'],
})
export class ModalGroupfacebookComponent implements OnInit {
  @ViewChild(DetailGroupfacebookComponent) myDetailGrp: DetailGroupfacebookComponent;
  datatmp: any;
  data: any;
  bac: any;
  nganhs: any;
  lop: any;
  lopTam: [];
  editting = false;
  currentIndex = -1;
  currentLop = null;
  addForm: FormGroup;
  statusElementList = {};
  isDone = false;
  text = '';
  mss: any;
  getloai:any;
  loaistt :any;
  idgroup :any;
  messa :any;
  urlImg :any;
  MaLoai :any;
  tengroup:any;
  //Khai báo list
  public bactamlist = [];
  public bacList: any;
  public lopTams: any;
  public nganhtamlist = {};
  public nganhList = {};
  public nganhTam = [];
  constructor(
    private modalService: ModalService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService,
    private lopService: LopHocService,
    private _changeDetailFB: ChangeDetialFB,
    private loaifbService: LoaifbService,
    private baiDangFBService: BaiDangfbService,


  ) {}
  searchGroup;
  ngOnInit(): void {
    this.getAll();
    this.getNganh();
    this.getbac();
    this.getLop();
    this.getLoai();
    this.addForm = new FormGroup({
      maBac: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      maNganh: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      khoa: new FormControl({ value: '', disabled: true }, Validators.required),
      tenLop: new FormControl(
        { value: '', disabled: true },
        Validators.required
      ),
      TenB: new FormControl(),
      TenN: new FormControl(),
      IDGroup: new FormControl(),
      linkGroup: new FormControl(),
      tenGroup: new FormControl(),
      getLoaisttGrp: new FormControl(),
      getURLimgGrp: new FormControl(),
      getMessageGrp: new FormControl()
    });
    this._changeDetailFB.setTitleFormGroupFB(this.text);
  }
  //Validator
  get maBac() {
    return this.addForm.get('maBac');
  }
  get maNganh() {
    return this.addForm.get('maNganh');
  }
  get khoa() {
    return this.addForm.get('khoa');
  }
  get tenLop() {
    return this.addForm.get('tenLop');
  }
  get TenB() {
    return this.addForm.get('maBac');
  }
  get TenN() {
    return this.addForm.get('maNganh');
  }
  get IDGroup() {
    return this.addForm.get('IDGroup');
  }
  get linkGroup() {
    return this.addForm.get('linkGroup');
  }
  get tenGroup() {
    return this.addForm.get('tenGroup');
  }
  get getLoaisttGrp(){
    return this.addForm.get('getLoaisttGrp');
  }
  get getURLimgGrp(){
    return this.addForm.get('getURLimgGrp');
  }

  get getMessageGrp(){
    return this.addForm.get('getMessageGrp');
  }

  getAll() {
    this.lopService.getAll().subscribe((data) => {
      this.data = data;
    });
  }

  getbac() {
    this.bacservice.getBac().subscribe((bac) => {
      this.bac = bac;
      this.bactamlist = this.bac;
    });
  }
  getNganh() {
    this.nganhngheservice.getNganhnghe().subscribe((nganhs) => {
      this.nganhs = nganhs;
      this.nganhtamlist = this.nganhs;
    });
    return this.data;
  }

  getLop() {
    this.lopService.getAll().subscribe((lop) => {
      this.lop = lop;
      this.lopTams = this.lop;
    });
  }

  getLoai() {
    this.loaifbService.getAll().subscribe((getloai) => {
      this.getloai = getloai;
    });
  }

  //bắt sự kiện show lop theo bac
  changedBac(e) {
    this.lopTams = [];
    if (this.addForm.value.maBac !== '') {
      this.lop.forEach((element) => {
        if (element.maBac == this.addForm.value.TenB) {
          this.lopTams.push(element);
        }
      });
    } else {
      this.lopTams = this.lop;
    }
  }
  //bắt sự kiện show lop theo nganh
  changedNganh(e) {
    this.lopTams = [];
    if (this.addForm.value.maNganh !== '') {
      this.lop.forEach((element) => {
        if (element.maNganh == this.addForm.value.TenN) {
          this.lopTams.push(element);
        }
      });
    } else {
      this.lopTams = this.lop;
    }
  }

  insertDateforForm(data) {
    this.datatmp = data;
    this.editting = true;
    this.currentIndex = data._id;
    this.currentLop = data;
    let Bac;
    this.bac.filter((item) => {
      if (data.maBac == item.maBac) {
        Bac = item.tenBac;
      }
    });
    this.maBac.setValue(Bac);
    this.TenB.setValue(Bac);

    let tenNganh;
    this.nganhs.filter((item) => {
      if (data.maNganh === item.maNganhNghe) {
        tenNganh = item.tenNganhNghe;
      }
    });
    this.maNganh.setValue(tenNganh);
    this.TenN.setValue(tenNganh);

    this.khoa.setValue(data.khoa);
    this.tenLop.setValue(data.tenVietTat);
    this.IDGroup.setValue(data.IDGroupFB);
    this.tenGroup.setValue(data.tenGroupFB);
    this.linkGroup.setValue(data.linkGroupFB);
  }
  update() {
    this.lopService
      .updateFB(this.datatmp.maLopHoc, {
        tenGroupFB: this.addForm.value.tenGroup,
        IDGroupFB: this.addForm.value.IDGroup,
        linkGroupFB: this.addForm.value.linkGroup,
      })

      .subscribe((res:any) => {
        this.mss = res.msg;
        alert(this.mss);
      }

      );
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

  insertTobdGrp(){
    this.delay(4000).then(any=>{
      //your task after delay.
      this.loaistt = this.addForm.value.getLoaisttGrp;
      this.idgroup = $('#getidGrp').val();
      this.messa = this.addForm.value.getMessageGrp;
      this.urlImg = this.addForm.value.getURLimgGrp;
      this.data.filter((item)=>{
        if(item.IDGroupFB === this.idgroup){
          this.tengroup = item.tenGroupFB;
        }
      })
      this.getloai.filter((item)=>{
        if(item.loai === this.loaistt){
          this.MaLoai = item.maLoai;
        }
      })
      let linkpost = $('#linksttGrp').val();
      let Post_idd = $('#postidGrp').val();
      console.log(linkpost);
      console.log(Post_idd);
      console.log(this.idgroup);
      console.log(this.loaistt);
      console.log(this.messa);
      console.log(this.urlImg);
      console.log(this.tengroup);
      console.log(this.MaLoai);
      if(this.messa == '' || this.loaistt == ''){
        alert('Không được để trống Nội dunng và Loại bài viết');
      }else{

        this.baiDangFBService.create({
          ID: this.idgroup,
          postID: Post_idd,
          link: linkpost,
          message: this.messa,
          url: this.urlImg,
          maLoai: this.MaLoai,
          loai: this.loaistt,
          thuoc: this.tengroup
        }).subscribe((ress:any)=>{
          this.mss = ress.msg;
          alert(this.mss);
          console.log(ress);
        })
        this.delay(1000).then(any=>{

          this.getMessageGrp.setValue('');
          this.getLoaisttGrp.setValue('');
          this.getURLimgGrp.setValue('');
        });
      }
    });

  }
  insertDraftGrp(){
    this.loaistt = this.addForm.value.getLoaisttGrp;
    this.getloai.filter((item)=>{
      if(item.loai === this.loaistt){
        this.MaLoai = item.maLoai;
      }
    })

    this.idgroup = $('#getidGrp').val();
    this.messa = this.addForm.value.getMessageGrp;
    this.urlImg = this.addForm.value.getURLimgGrp;
    this.data.filter((item)=>{
      if(item.IDGroupFB === this.idgroup){
          this.tengroup = item.tenGroupFB;
      }
    })
    console.log(this.loaistt);
    console.log(this.MaLoai);
    console.log(this.messa);
    console.log(this.urlImg);
    console.log(this.tengroup);
    console.log(this.idgroup);

    if(this.messa == '' || this.loaistt == ''){
       alert('Không được để trống Nội dunng và Loại bài viết');
    }else{

      this.baiDangFBService.createDraw({
        ID: this.idgroup,
        message: this.messa,
        url: this.urlImg,
        maLoai: this.MaLoai,
        loai: this.loaistt,
        thuoc: this.tengroup
      }).subscribe((ress:any)=>{
        this.mss = ress.msg;
        alert(this.mss);
        console.log(ress);
      })
      this.delay(1000).then(any=>{

        this.getMessageGrp.setValue('');
        this.getLoaisttGrp.setValue('');
        this.getURLimgGrp.setValue('');
      });
    }
  }
  openDetail(detail) {
    console.log(detail);
    this.modalService.open('detail-groupfb');
    this.text = detail.tenGroupFB;
    this._changeDetailFB.setTitleFormGroupFB(this.text);
    this.myDetailGrp.selectBaiDangGrp(detail.IDGroupFB);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
}
