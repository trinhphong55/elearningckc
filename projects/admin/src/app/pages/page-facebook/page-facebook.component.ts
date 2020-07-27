import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-page-facebook',
  templateUrl: './page-facebook.component.html',
  styleUrls: ['./page-facebook.component.css']
})
export class PageFacebookComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.effectLoadPage()
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
