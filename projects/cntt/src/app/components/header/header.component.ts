import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() logo: any;
  @Input() logoMobile: any;
  @Input() menu: any;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.navbarOffCanvas();
    }, 250);
  }

  //#region Navbar OffCanvas pure JS
  navbarOffCanvas() {
    // When the user clicks anywhere outside of the offcanvas, close it
    window.addEventListener('click', function (event) {
      if (event.target === document.querySelector('.offcanvas.open')) {
        CloseOffCanvas();
      }
    });

    // toggle offcanvas_nav_sub
    var offCanvasNavLink = document.querySelectorAll('.offcanvas_nav__link');
    offCanvasNavLink.forEach(function (item) {
      if (item.nextElementSibling !== null) {
        item.classList.add('has_navsub');
      }

      item.addEventListener('click', function (e) {
        // console.log(this.nextSibling) // https://www.w3schools.com/jsref/prop_node_nextsibling.asp
        // console.log(this.nextElementSibling)
        if (this.nextElementSibling !== null) {
          e.preventDefault();
          this.classList.toggle('show');
          this.nextElementSibling.classList.toggle('show');
        }
      });
    });

    document
      .querySelector('.offcanvas_button__open')
      .addEventListener('click', function (e) {
        e.preventDefault();
        OpenOffCanvas();
      });

    document
      .querySelector('.offcanvas_button__close')
      .addEventListener('click', function (e) {
        e.preventDefault();
        CloseOffCanvas();
      });

    function OpenOffCanvas() {
      document.querySelector('.offcanvas').classList.add('open');
      document.querySelector('body').classList.add('offcanvas_container');
    }

    function CloseOffCanvas() {
      document.querySelector('.offcanvas').classList.remove('open');
      document.querySelector('body').classList.remove('offcanvas_container');
    }
  }
  //#endregion
}
