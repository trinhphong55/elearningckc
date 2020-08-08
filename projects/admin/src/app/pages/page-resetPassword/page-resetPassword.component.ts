import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../../app/services/auth/auth.service';
@Component({
  selector: 'app-page-resetPassword',
  templateUrl: './page-resetPassword.component.html',
  styleUrls: ['./page-resetPassword.component.css']
})
export class PageResetPasswordComponent implements OnInit {

  constructor(private el: ElementRef, private authService: AuthService) { }

  resetForm = new FormGroup({
    email: new FormControl()
  });

  ngOnInit(): void {
    this.effectLoadPage()
  }

  onResetPassword(): void{
    console.log('reset password');
  }

  effectLoadPage(): void {
    const element = this.el.nativeElement;
    var opacity = parseInt(element.querySelector('.loadpage_effect').style.opacity);
    const setOpacity = setInterval(() => {
      opacity += 0.01;
      element.querySelector('.loadpage_effect').style.opacity = opacity;
      if (opacity >= 1) {
        clearInterval(setOpacity)
      }
    }, 10)
  }

}
