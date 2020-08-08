import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLienheComponent } from './pages/page-lienhe/page-lienhe.component';
import { PageTintucComponent } from './pages/page-tintuc/page-tintuc.component';
import { PageChitiettintucComponent } from './pages/page-chitiettintuc/page-chitiettintuc.component';
import { PageDangkikhoahocComponent } from './pages/page-dangkikhoahoc/page-dangkikhoahoc.component';
import { HttpClientModule } from '@angular/common/http';
import { PageDanhsachlophocComponent } from './pages/page-danhsachlophoc/page-danhsachlophoc.component';
import { PageDangkidotthiComponent } from './pages/page-dangkidotthi/page-dangkidotthi.component';
import { PageTimkiemComponent } from './pages/page-timkiem/page-timkiem.component';
import { PageTracuudiemComponent } from './pages/page-tracuudiem/page-tracuudiem.component';
import { PageChitietkhoahocComponent } from './pages/page-chitietkhoahoc/page-chitietkhoahoc.component';
import { PageDanhsachbaivietcuakhoahocComponent } from './pages/page-danhsachbaivietcuakhoahoc/page-danhsachbaivietcuakhoahoc.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    PageHomeComponent,
    PageLienheComponent,
    PageTintucComponent,
    PageChitiettintucComponent,
    PageDangkikhoahocComponent,
    PageDanhsachlophocComponent,
    PageDangkidotthiComponent,
    PageTimkiemComponent,
    PageTracuudiemComponent,
    PageChitietkhoahocComponent,
    PageDanhsachbaivietcuakhoahocComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
