import { LopHocService } from './../../../../services/lop-hoc.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../../services/modal.service';
import { GroupfbService } from '../../../../services/groupfb.service';
import { NganhNgheService } from '../../../../services/NganhNghe.service';
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
    this.openDetail();
    this.loadAPIGroup();
  }

  getAll() {
    this.groupFBService.getAll().subscribe( 
      data=> {
      this.data = data;
      console.log(this.data);
    });
  }

  getbac() {
    this.bacservice.getBac().subscribe(
      (bac) => {
        this.bac = bac;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getNganh() {
    this.nganhngheservice.getNgangnghe().subscribe(
      (nganhs) => {
        this.nganhs = nganhs;
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
      console.log(lop);
    });
  }

  openDetail() {
    this.modalService.open('detail-groupfb');
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

 // GROUPFB API

    //Lấy số member group
    getMemberCountGr() {
      window['FB'].api('/410650836564717',{fields: 'member_count'},function (response){
        console.log(response.member_count);
        var memCount=response.member_count;
        document.getElementById('memCount').innerHTML =memCount;
      })
    }
    //Lấy số member request
     getMemberRequestCountGr() {
      window['FB'].api('/410650836564717',{fields: 'member_request_count'},function (response){
        console.log(response.member_request_count);
        var memRes=response.member_request_count
        document.getElementById('memRes').innerHTML =memRes;
      })
    }
    //Lấy privacy group
     getPrivacyGr() {
      window['FB'].api('/410650836564717',{fields: 'privacy'},function (response){
        console.log(response.privacy);
        var priva=response.privacy;
        document.getElementById('privacyGr').innerHTML =priva;
      })
    }
    //Lấy các feed đã post
    // function getFeedPostedGr() {
    //   FB.api('/410650836564717/',{fields: 'feed'},function (response){
    //     console.log(response.feed.data.message);
    //     console.log(response.story);
    //     console.log(response.updated_time);
    //     console.log(response.id);
    //     mess=response.message;
    //     story=response.story;
    //     updatedTime=response.updated_time;
    //     idpost=response.id;
    //     document.getElementById('feed/message').innerHTML =mess;
    //     document.getElementById('feed/story').innerHTML =story;
    //     document.getElementById('feed/updatedtime').innerHTML =updatedTime;
    //     document.getElementById('feed/idpost').innerHTML =idpost;
    //   })
    // }
    //Lấy Descripsion Group
    getDescripsionGr() {
      window['FB'].api('/410650836564717',{fields: 'description'},function (response){
        console.log(response.description);
        var descrip=response.description;
        document.getElementById('descriptionGr').innerHTML =descrip;
      })
    }
    //Lấy ngày tạo Group
     getGroupCreatedDay() {
      window['FB'].api('/410650836564717',{fields: 'created_time'},function (response){
        console.log(response.created_time);
        var grcreatedday=response.created_time;
        document.getElementById('groupCreatedDay').innerHTML =grcreatedday;
      })
    }
     loadAPIGroup(){
      this.getMemberCountGr();
      this.getMemberRequestCountGr();
      this.getPrivacyGr();
      // getFeedPostedGr();
      this.getDescripsionGr();
      this.getGroupCreatedDay();
    } 
}
