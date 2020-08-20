import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalService } from '../../../../services/modal.service';
import { SlideshowService } from '../../../../services/cntt/slideshow.service';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-modal-quanlyslideshowcntt',
  templateUrl: './modal-quanlyslideshowcntt.component.html',
  styleUrls: ['./modal-quanlyslideshowcntt.component.css'],
})
export class ModalQuanlyslideshowcnttComponent
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(
    private modalService: ModalService,
    private slideShowService: SlideshowService,
    private toastrService: ToastrService
  ) {}

  private _images: any = [];

  tenSlide = new FormControl('');
  maSlide = new FormControl('');
  danhSachSlideShow: any = [];

  ngOnInit(): void {
    this.getDanhSachSlideShow();
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      // $('.fancybox').fancybox({
      //   openEffect: 'elastic',
      //   closeEffect: 'none',
      // });
      // $('.datatable__slideshow').DataTable({
      //   responsive: {
      //     details: {
      //       type: 'column',
      //     },
      //   },
      //   columnDefs: [
      //     {
      //       className: 'dtr-control',
      //       orderable: false,
      //       targets: 0,
      //     },
      //   ],
      //   order: [1, 'asc'],
      // });
    });
  }

  ngOnDestroy(): void {
    // $('.fancybox').off();
    // $('.datatable__slideshow').off();
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  getDanhSachSlideShow() {
    this.slideShowService.getDanhSachSlideShow().subscribe((data) => {
      this.danhSachSlideShow = data.data;
      // console.log(this.danhSachSlideShow);
      this.getMaSlideShowCuoiCung();
    });
  }

  getMaSlideShowCuoiCung() {
    let maSlideShow: string;
    const obj = this.danhSachSlideShow;
    if (obj.length > 0) {
      maSlideShow = obj[obj.length - 1].maSlide;
      const index = parseInt(maSlideShow.substr(5, maSlideShow.length));
      if (index < 10) {
        maSlideShow = 'slide0' + (index + 1);
      } else {
        maSlideShow = 'slide' + (index + 1);
      }
    } else {
      maSlideShow = 'slide00';
    }
    this.maSlide.setValue(maSlideShow);
    // console.log(this.maSlide.value);
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      this._images = event.target.files;
    }
  }

  onSubmit() {
    const formData = new FormData();
    for (const image of this._images) {
      formData.append('photos', image);
    }
    formData.append('maSlide', this.maSlide.value);
    formData.append('tenSlide', this.tenSlide.value);
    this.slideShowService.saveNewSlideShow(formData).subscribe((data) => {
      this.getDanhSachSlideShow();
      // alert('Thêm slide mới thành công');
      this.toastrService.success('Thêm slide mới thành công', 'Thông báo', {
        timeOut: 4000,
      });
    });
  }
}
