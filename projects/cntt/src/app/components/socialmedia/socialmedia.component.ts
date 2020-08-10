import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.css'],
})
export class SocialmediaComponent implements OnInit {
  @Input() facebook: any;
  @Input() youtube: any;
  constructor() {}

  ngOnInit(): void {}
}
