import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import saveAs from 'file-saver';

//Services
import { FileService } from '../../../../services/file.service';
import { BaiTapService } from '../../../../services/bai-tap.service';

//Interfaces
import { BaiTap } from '../../../../interfaces/BaiTap.inteface';

interface LHP {
  tenLopHocPhan: string,
  maLopHocPhan: string,
}

interface ChuDe {
  maChuDe: string,
  tenChuDe: string,
}

const uri = 'https://localhost:4100/api/baitap/uploads';

@Component({
  selector: 'app-taobaitap',
  templateUrl: './taobaitap.component.html',
  styleUrls: ['./taobaitap.component.css'],
  providers: [FileService, BaiTapService]
})
export class TaobaitapComponent implements OnInit {

  public baitap: BaiTap = {
    tieuDe: "test tieuDe",
    huongDan: "test huongDan",
    deadLine: "null",
    diem: 10,
    lopHocPhan: [],
    file: [],
    chuDe: "null",
  }

  dsLHP: LHP[] = [
    { tenLopHocPhan: "lhp haha", maLopHocPhan: "1223" },
    { tenLopHocPhan: "lhp baba", maLopHocPhan: "1234" },
    { tenLopHocPhan: "lhp zaza", maLopHocPhan: "1235" },
    { tenLopHocPhan: "lhp gaga", maLopHocPhan: "1236" },
    { tenLopHocPhan: "lhp vava", maLopHocPhan: "1237" },
  ];

  dsChuDe: ChuDe[] = [
    { tenChuDe: "chu de baba", maChuDe: "789" },
    { tenChuDe: "chu de dada", maChuDe: "759" },
    { tenChuDe: "chu de tata", maChuDe: "729" },
    { tenChuDe: "chu de nana", maChuDe: "989" },
    { tenChuDe: "chu de lala", maChuDe: "791" },
  ];


  checked: boolean = false;

  toppings = new FormControl();

  EndDateChange(today: any) {
    let dd = String(today.value.getDate()).padStart(2, '0');
    let mm = String(today.value.getMonth() + 1).padStart(2, '0');
    let yyyy = today.value.getFullYear();
    this.baitap.deadLine = mm + '/' + dd + '/' + yyyy;
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }



  saveBaiTap() {
    if (this.uploader.queue.length !== 0) {
      this.uploader.uploadAll();
    } else {
      this._baiTapService.addBaiTap(this.baitap).subscribe(data => {
        alert(data.message);
        // if (data.status === 200) {

        // }
      })
    }
  }

  // Upload file

  uploader: FileUploader = new FileUploader({
    url: uri,
    maxFileSize: 2048, // Max 2kB
    queueLimit: 3, // Max files can upload
  });

  attachmentList: string[] = [];

  download() {
    // var filename = this.attachmentList[index].uploadname;
    this._fileService.downloadFile("yasuo.png")
      .subscribe(
        data => saveAs(data, "yasuo.png"),
        error => console.error(error)
      );
  }

  constructor(
    private _fileService: FileService,
    private _baiTapService: BaiTapService) {
  }

  ngOnInit(): void {
    this.uploader.onCompleteAll = () => {
      this.baitap.file = this.attachmentList;
      this._baiTapService.addBaiTap(this.baitap).subscribe(data => {
        alert(data.message);
        if (data.status === 200) {
          alert('Chuan bi cap nhat chuc nang sau khi them thanh cong se clear du lieu cu');
        }
      })
    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response));
    }

    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }
}

