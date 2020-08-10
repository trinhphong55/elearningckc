import { Component, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'ttth';
  ngAfterViewInit(): void {
    $(document).ready(function () {
      $('.ttth__select2').select2();
    });
  }
}
