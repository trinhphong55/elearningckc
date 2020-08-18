import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';
import { DataTablesModule } from 'angular-datatables';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TintucCnttService } from './services/cntt/tintuc-cntt.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadModule } from 'ng2-file-upload';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPrintModule } from 'ngx-print';
import { NgApexchartsModule } from "ng-apexcharts";

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivityComponent } from './components/activity/activity.component';
import { SidebarChuongtrinhdaotaoComponent } from './components/sidebar/sidebar-chuongtrinhdaotao/sidebar-chuongtrinhdaotao.component';
import { SidebarCnttComponent } from './components/sidebar/sidebar-cntt/sidebar-cntt.component';
import { SidebarDiemComponent } from './components/sidebar/sidebar-diem/sidebar-diem.component';
import { SidebarElearningComponent } from './components/sidebar/sidebar-elearning/sidebar-elearning.component';
import { SidebarBaocaoquyetdinhComponent } from './components/sidebar/sidebar-baocaoquyetdinh/sidebar-baocaoquyetdinh.component';
import { SidebarFacebookComponent } from './components/sidebar/sidebar-facebook/sidebar-facebook.component';
import { PageFacebookComponent } from './pages/page-facebook/page-facebook.component';
import { PageBaocaoquyetdinhComponent } from './pages/page-baocaoquyetdinh/page-baocaoquyetdinh.component';
import { PageElearningComponent } from './pages/page-elearning/page-elearning.component';
import { PageCnttComponent } from './pages/page-cntt/page-cntt.component';
import { PageDiemComponent } from './pages/page-diem/page-diem.component';
import { PageResetPasswordComponent } from "./pages/page-resetPassword/page-resetPassword.component";
import { PageChuongtrinhdaotaoComponent } from './pages/page-chuongtrinhdaotao/page-chuongtrinhdaotao.component';
import { PageDashboardComponent } from './pages/page-dashboard/page-dashboard.component';
import { ModalLichdaotaoComponent } from './components/modal/chuongtrinhdaotao/modal-lichdaotao/modal-lichdaotao.component';
import { ModalKehoachdaotaoComponent } from './components/modal/chuongtrinhdaotao/modal-kehoachdaotao/modal-kehoachdaotao.component';
import { ModalChitieudaotaoComponent } from './components/modal/chuongtrinhdaotao/modal-chitieudaotao/modal-chitieudaotao.component';
import { ModalNganhngheComponent } from './components/modal/chuongtrinhdaotao/modal-nganhnghe/modal-nganhnghe.component';
import { ModalKhoabomonComponent } from './components/modal/chuongtrinhdaotao/modal-khoabomon/modal-khoabomon.component';
import { ModalMonhocComponent } from './components/modal/chuongtrinhdaotao/modal-monhoc/modal-monhoc.component';
import { ModalGiaovienComponent } from './components/modal/chuongtrinhdaotao/modal-giaovien/modal-giaovien.component';
import { ModalNopdiemComponent } from './components/modal/diem/modal-nopdiem/modal-nopdiem.component';
import { ModalThongkediemComponent } from './components/modal/diem/modal-thongkediem/modal-thongkediem.component';
import { ModalDiemchinhthucComponent } from './components/modal/diem/modal-diemchinhthuc/modal-diemchinhthuc.component';
import { ModalLophocComponent } from './components/modal/diem/modal-lophoc/modal-lophoc.component';
import { ModalLophocphanComponent } from './components/modal/diem/modal-lophocphan/modal-lophocphan.component';
import { ModalGiaovienlophocphanComponent } from './components/modal/chuongtrinhdaotao/modal-giaovienlophocphan/modal-giaovienlophocphan.component';
import { ModalCotdiemlophocphanComponent } from './components/modal/diem/modal-cotdiemlophocphan/modal-cotdiemlophocphan.component';
import { ModalDiemtongketlophocphanComponent } from './components/modal/diem/modal-diemtongketlophocphan/modal-diemtongketlophocphan.component';
import { ModalDiemquatrinhlophocphanComponent } from './components/modal/diem/modal-diemquatrinhlophocphan/modal-diemquatrinhlophocphan.component';
import { ModalBaocaoquyetdinhComponent } from './components/modal/baocaoquyetdinh/modal-baocaoquyetdinh/modal-baocaoquyetdinh.component';
import { ModalPhanconggiangdayComponent } from './components/modal/elearning/modal-phanconggiangday/modal-phanconggiangday.component';
import { ModalQuanlykhaosatComponent } from './components/modal/elearning/modal-quanlykhaosat/modal-quanlykhaosat.component';
import { ModalTracuuthongtinComponent } from './components/modal/elearning/modal-tracuuthongtin/modal-tracuuthongtin.component';
import { ModalBaidangfacebookComponent } from './components/modal/facebook/modal-baidangfacebook/modal-baidangfacebook.component';
import { ModalGroupfacebookComponent } from './components/modal/facebook/modal-groupfacebook/modal-groupfacebook.component';
import { ModalPagefacebookComponent } from './components/modal/facebook/modal-pagefacebook/modal-pagefacebook.component';
import { ModalComponent } from './components/modal/modal.component';
import { ModalQuanlyheadercnttComponent } from './components/modal/cntt/modal-quanlyheadercntt/modal-quanlyheadercntt.component';
import { ModalImportExcelMonhocComponent } from './components/modal/chuongtrinhdaotao/import-excel/modal-import-excel-monhoc/modal-import-excel-monhoc.component';
import { ModalImportExcelNganhNgheComponent } from './components/modal/chuongtrinhdaotao/import-excel/modal-import-excel-nganhnghe/modal-import-excel-nganhnghe.component';

import { PageTtthComponent } from './pages/page-ttth/page-ttth.component';
import { SidebarTtthComponent } from './components/sidebar/sidebar-ttth/sidebar-ttth.component';
import { ModalLogoComponent } from './components/modal/ttth/modal-logo/modal-logo.component';
import { ModalQuanlyfootercnttComponent } from './components/modal/cntt/modal-quanlyfootercntt/modal-quanlyfootercntt.component';
import { ModalBannerComponent } from './components/modal/ttth/modal-banner/modal-banner.component';
import { ModalDangkikhoahocComponent } from './components/modal/ttth/modal-dangkikhoahoc/modal-dangkikhoahoc.component';
import { ModalHomeCamonComponent } from './components/modal/ttth/modal-home-camon/modal-home-camon.component';
import { ModalHomeTienichComponent } from './components/modal/ttth/modal-home-tienich/modal-home-tienich.component';
import { ModalKhoahocComponent } from './components/modal/ttth/modal-khoahoc/modal-khoahoc.component';
import { ModalLienheComponent } from './components/modal/ttth/modal-lienhe/modal-lienhe.component';
import { ModalQuanlyslideshowcnttComponent } from './components/modal/cntt/modal-quanlyslideshowcntt/modal-quanlyslideshowcntt.component';
import { ModalQuanlytintuccnttComponent } from './components/modal/cntt/modal-quanlytintuccntt/modal-quanlytintuccntt.component';
import { ModalThemtintuccnttComponent } from './components/modal/cntt/modal-themtintuccntt/modal-themtintuccntt.component';
import { ModalChinhsuatintuccnttComponent } from './components/modal/cntt/modal-chinhsuatintuccntt/modal-chinhsuatintuccntt.component';
import { ModalImportExcelKhoabomonComponent } from './components/modal/chuongtrinhdaotao/modal-import-excel-khoabomon/modal-import-excel-khoabomon.component';
import { DetailGroupfacebookComponent } from './components/modal/facebook/details/detail-groupfacebook/detail-groupfacebook.component';
import { DetailPagefacebookComponent } from './components/modal/facebook/details/detail-pagefacebook/detail-pagefacebook.component';
import { ModalTintucComponent } from './components/modal/ttth/modal-tintuc/modal-tintuc.component';
import { ModalQuanlyloaibaivietcnttComponent } from './components/modal/cntt/modal-quanlyloaibaivietcntt/modal-quanlyloaibaivietcntt.component';
import { ModalCrawlingComponent } from './components/modal/cntt/modal-crawling/modal-crawling.component';
import { ModalNoidungtrangchuComponent } from './components/modal/cntt/modal-noidungtrangchu/modal-noidungtrangchu.component';
import { ModalQuanlytienichcnttComponent } from './components/modal/cntt/modal-quanlytienichcntt/modal-quanlytienichcntt.component';
import { ModalDanhmucbaivietComponent } from './components/modal/cntt/modal-danhmucbaiviet/modal-danhmucbaiviet.component';
import { ModalQuanlybosuutapcnttComponent } from './components/modal/cntt/modal-quanlybosuutapcntt/modal-quanlybosuutapcntt.component';
import { ModalThongtinchungComponent } from './components/modal/cntt/modal-thongtinchung/modal-thongtinchung.component';
import { ModalTtthLophocComponent } from './components/modal/ttth/modal-ttth-lophoc/modal-ttth-lophoc.component';
import { ModelTtthDotthiComponent } from './components/modal/ttth/model-ttth-dotthi/model-ttth-dotthi.component';
import { ModalDangkidotthiComponent } from './components/modal/ttth/modal-dangkidotthi/modal-dangkidotthi.component';
import { ModalDiemthiComponent } from './components/modal/ttth/modal-diemthi/modal-diemthi.component';
import { ModalTtthQuanlidiemthiComponent } from './components/modal/ttth/modal-ttth-quanlidiemthi/modal-ttth-quanlidiemthi.component';
import { ModalTtthchudeComponent } from './components/modal/ttth/modal-ttthchude/modal-ttthchude.component';
import { ModalThoikhoabieuComponent } from './components/modal/chuongtrinhdaotao/modal-thoikhoabieu/modal-thoikhoabieu.component';
import { ModalPhonghocComponent } from './components/modal/chuongtrinhdaotao/modal-phonghoc/modal-phonghoc.component';
import { ModalLichphonghocComponent } from './components/modal/chuongtrinhdaotao/modal-lichphonghoc/modal-lichphonghoc.component';
import { ModalBaivietComponent } from './components/modal/cntt/modal-baiviet/modal-baiviet.component';
import { AuthInterceptor } from './helper/auth.interceptor';
import { ModalNhapdiemlophocComponent } from './components/modal/ttth/modal-nhapdiemlophoc/modal-nhapdiemlophoc.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ActivityComponent,
    SidebarChuongtrinhdaotaoComponent,
    SidebarCnttComponent,
    SidebarDiemComponent,
    SidebarElearningComponent,
    SidebarBaocaoquyetdinhComponent,
    SidebarFacebookComponent,
    PageResetPasswordComponent,
    PageFacebookComponent,
    PageBaocaoquyetdinhComponent,
    PageElearningComponent,
    PageCnttComponent,
    PageDiemComponent,
    PageChuongtrinhdaotaoComponent,
    PageDashboardComponent,
    ModalLichdaotaoComponent,
    ModalKehoachdaotaoComponent,
    ModalChitieudaotaoComponent,
    ModalNganhngheComponent,
    ModalKhoabomonComponent,
    ModalMonhocComponent,
    ModalGiaovienComponent,
    ModalNopdiemComponent,
    ModalThongkediemComponent,
    ModalDiemchinhthucComponent,
    ModalLophocComponent,
    ModalLophocphanComponent,
    ModalGiaovienlophocphanComponent,
    ModalCotdiemlophocphanComponent,
    ModalDiemtongketlophocphanComponent,
    ModalDiemquatrinhlophocphanComponent,
    ModalBaocaoquyetdinhComponent,
    ModalPhanconggiangdayComponent,
    ModalQuanlykhaosatComponent,
    ModalTracuuthongtinComponent,
    ModalBaidangfacebookComponent,
    ModalGroupfacebookComponent,
    ModalPagefacebookComponent,
    ModalComponent,
    ModalQuanlyheadercnttComponent,
    ModalImportExcelMonhocComponent,
    ModalImportExcelNganhNgheComponent,
    PageTtthComponent,
    SidebarTtthComponent,
    ModalLogoComponent,
    ModalQuanlyfootercnttComponent,
    ModalBannerComponent,
    ModalDangkikhoahocComponent,
    ModalHomeCamonComponent,
    ModalHomeTienichComponent,
    ModalKhoahocComponent,
    ModalLienheComponent,
    ModalQuanlyslideshowcnttComponent,
    ModalQuanlytintuccnttComponent,
    ModalThemtintuccnttComponent,
    ModalChinhsuatintuccnttComponent,
    ModalImportExcelKhoabomonComponent,
    DetailGroupfacebookComponent,
    DetailPagefacebookComponent,
    ModalImportExcelKhoabomonComponent,
    ModalTintucComponent,
    ModalCrawlingComponent,
    ModalQuanlyloaibaivietcnttComponent,
    ModalNoidungtrangchuComponent,
    ModalQuanlytienichcnttComponent,
    ModalDanhmucbaivietComponent,
    ModalQuanlybosuutapcnttComponent,
    ModalThongtinchungComponent,
    ModalTtthLophocComponent,
    ModelTtthDotthiComponent,
    ModalDangkidotthiComponent,
    ModalDiemthiComponent,
    ModalTtthQuanlidiemthiComponent,
    ModalTtthchudeComponent,
    ModalThoikhoabieuComponent,
    ModalPhonghocComponent,
    ModalLichphonghocComponent,
    ModalBaivietComponent,
    ModalNhapdiemlophocComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CKEditorModule,
    Ng2SearchPipeModule,
    NgxSkeletonLoaderModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    FileUploadModule,
    NgxPrintModule,
    NgApexchartsModule,
    NgSelectModule,
  ],
  providers: [ApiService, TintucCnttService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
