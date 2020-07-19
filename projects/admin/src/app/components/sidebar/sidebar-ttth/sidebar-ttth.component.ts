import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
@Component({
  selector: 'app-sidebar-ttth',
  templateUrl: './sidebar-ttth.component.html',
  styleUrls: ['./sidebar-ttth.component.css']
})
export class SidebarTtthComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }
  openModal(id: string) {
    this.modalService.open(id)
  }
}
