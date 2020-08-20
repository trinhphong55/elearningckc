import { BaiDangfbService } from './../../../services/baidangfb.service';
import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-sidebar-facebook',
  templateUrl: './sidebar-facebook.component.html',
  styleUrls: ['./sidebar-facebook.component.css']
})
export class SidebarFacebookComponent implements OnInit {

  data:any;
  constructor(
    private modalService: ModalService,
    private baidang: BaiDangfbService
    ) { }

  ngOnInit(): void {
    // this.fbLibrary();
  }
  baidangfb(){
    this.baidang.getAll().subscribe(data=>{
      this.data = data;
    });
  }
  openModal(id: string) {
    this.modalService.open(id);
    if(id=='fb_quanlybaidangfacebook'){
      this.baidangfb();
    }
  }
  // fbLibrary(){
  //   var AppId='726531241502023';
  //   (window as any).fbAsyncInit = function () {
  //     window['FB'].init({
  //       appId: AppId,
  //       cookie: true,
  //       xfbml: true,
  //       version: 'v7.0'
  //     });
  //     window['FB'].AppEvents.logPageView();
  //   };
  //   (function (d, s, id) {
  //     var js, fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) { return; }
  //     js = d.createElement(s); js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   }(document, 'script', 'facebook-jssdk'));

  //   this.getStatusloginFB();
  // }
  //  //Lấy ra tình trạng đăng nhập hiện tại của tài khoản
  //   getStatusloginFB(){
  //     window['FB'].getLoginStatus(function(response) {
  //       console.log(response.status);
  //     this.statusChangeCallback(response);
  //   });
  //   }
  // //Yêu cầu đăng nhập facebook
  //   RequestLoginFB() {
  //   (window as any).location = 'http://graph.facebook.com/oauth/authorize?client_id=726531241502023&scope=pages_manage_posts,pages_manage_engagement,pages_manage_ads,pages_manage_metadata,pages_read_engagement,pages_read_user_content,pages_show_list,public_profile,email,user_likes,user_birthday,user_posts,user_photos,user_location,publish_to_groups&redirect_uri=https://localhost:4200/facebook/';
  //     }
  // // Xử lý trạng thái đăng nhập
  //   statusChangeCallback(response:any) {
  //     //User đã login facebook và login ứng dụng
  //     if (response.status === 'connected') {
  //       this.showWelcome();
  //       this.getAvatarProf();
  //     }
  //     //User đã login facebook nhưng chưa login ứng dụng hoặc chưa login facebook
  //     else if (response.status ==='not_authorized '){
  //       this.ShowLoginButton();
  //     } else {
  //       this.ShowLoginButton();
  //     }

  //   };

  // // Hiển thị nút đăng nhập
  //   ShowLoginButton() {
  //           document.getElementById('btnLoginFB').setAttribute('style', 'display:block');
  //           document.getElementById('status').setAttribute('style', 'display:none');
  //       }

  // //Hàm welcome sử dụng API sau khi login
  //   showWelcome() {
  //     window['FB'].api('/me', function(response) {
  //       console.log(response)
  //       document.getElementById('btnLoginFB').setAttribute('style', 'display:none');
  //       console.log(response.name + ' access granted');
  //       document.getElementById('username').innerHTML =response.name;
  //       document.getElementById('status').setAttribute('style', 'display:block');
  //     });
  //   }

  // //Get profile's avatar
  //   getAvatarProf(){
  //     window['FB'].api('/me',{fields: 'picture'},function (response){
  //         var source = response.picture.data.url;
  //         console.log(source);
  //         $('#avatar').attr("src",source);
  //     })
  //   };


}




