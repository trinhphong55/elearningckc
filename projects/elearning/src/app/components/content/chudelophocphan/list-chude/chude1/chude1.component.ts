import { Component, OnInit, Input } from '@angular/core';
import { ChuDe } from '../../../../../models/chu-de.interface';

@Component({
  selector: 'app-chude1',
  templateUrl: './chude1.component.html',
  styleUrls: ['./chude1.component.css']
})
export class Chude1Component implements OnInit {
  @Input() dsChuDe: ChuDe[];

  constructor() { }

  ngOnInit(): void {
  }

}
