import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageTrangchuComponent } from './pages/page-trangchu/page-trangchu.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';
import { PagePostComponent } from './pages/page-post/page-post.component';
import { PageContactComponent } from './pages/page-contact/page-contact.component';
import { PageSearchComponent } from './pages/page-search/page-search.component';
import { PageDocumentComponent } from './pages/page-document/page-document.component';
import { PageJobComponent } from './pages/page-job/page-job.component';
import { PageJobDetailComponent } from './pages/page-job-detail/page-job-detail.component';
import { SocialmediaComponent } from './components/socialmedia/socialmedia.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { TienichsvComponent } from './components/tienichsv/tienichsv.component';
import { DonvilienketComponent } from './components/donvilienket/donvilienket.component';
import { SlidersinhvienComponent } from './components/slidersinhvien/slidersinhvien.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageTrangchuComponent,
    PageNotfoundComponent,
    PagePostComponent,
    PageContactComponent,
    PageSearchComponent,
    PageDocumentComponent,
    PageJobComponent,
    PageJobDetailComponent,
    SocialmediaComponent,
    BreadcrumbComponent,
    TienichsvComponent,
    DonvilienketComponent,
    SlidersinhvienComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
