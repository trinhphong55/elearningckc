import { LopHocService } from './../../../../services/lop-hoc.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { GroupfbService } from '../../../../services/groupfb.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BacService } from '../../../../services/Bac.service';

@Component({
  selector: 'app-modal-groupfacebook',
  templateUrl: './modal-groupfacebook.component.html',
  styleUrls: ['./modal-groupfacebook.component.css'],
})
export class ModalGroupfacebookComponent implements OnInit {
  data: any;
  bac: any;
  nganhs: any;
  lop: any;
  editting= false;
  currentIndex=-1;
  currentLop=null;
  addForm: FormGroup;
  statusElementList = {};
  isDone = false;
  //Khai báo list
  public bactamlist = [];
  public bacList: any;
  public lopTam = [];
  public nganhtamlist={};
  public nganhList={};
  public nganhTam=[];
  constructor(
    private modalService: ModalService,
    private groupFBService: GroupfbService,
    private nganhngheservice: NganhNgheService,
    private bacservice: BacService,
    private lopService: LopHocService
  ) {}
  searchGroup;
  ngOnInit(): void {
    this.getAll();
    this.getNganh();
    this.getbac();
    this.getLop();
    this.addForm = new FormGroup({
      maBac: new FormControl(),
      maNganh: new FormControl(),
      khoa: new FormControl(),
      tenLop: new FormControl(),
    });
  
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



  getAll() {
    this.lopService.getAll().subscribe(
      data=> {
      this.data = data;
      console.log(this.data);
    });
  }

  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bacList = bac;
        this.bactamlist = this.bacList;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getNganh() {
    this.nganhngheservice.getNganhnghe().subscribe(
      (nganhs) => {
        this.nganhList = nganhs;
        this.nganhtamlist=this.nganhList;
      },
      (error) => {
        console.log(error);
      }
    );
    return this.data;
  }

  getLop() {
    this.lopService.getAll().subscribe((lop) => {
      this.lop = lop;
      this.lopTam  = this.lop;
    });
  }
  

  insertDateforForm(data) {
    this.editting = true;
    this.currentIndex = data._id;
    this.currentLop = data;
    
    this.maBac.setValue(data.maBac);
    this.maNganh.setValue(data.maNganh);
    this.khoa.setValue(data.khoa);
    this.tenLop.setValue(data.tenLop);
    console.log(data)
  }

  public changedBac(e) {
   
    this.lopTam = [];
    if (this.addForm.value.maBac !== '') {
      this.lop.forEach((element) => {
        console.log(this.addForm.value.maBac);  
        console.log(element.maBac);
        if (element.maBac == this.addForm.value.maBac) {
          this.lopTam.push(element);
        }
      });
    } else {
      this.lopTam = this.lop;
    }
  }
  public changedNganh(e) {
   
    this.nganhTam = [];
    if (this.addForm.value.maNganh !== '') {
      this.lop.forEach((element) => {
        console.log(this.addForm.value.maNganh);  
        console.log(element.maNganh);
        if (element.maBac == this.addForm.value.maNganh) {
          this.lopTam.push(element);
        }
      });
    } else {
      this.lopTam = this.lop;
    }
  }
  

  openDetail(id_fb: number) {
    this.modalService.open('detail-groupfb');
    
      console.log(id_fb);
    
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
