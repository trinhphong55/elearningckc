import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FooterComponent } from './components/footer/footer.component';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ChiaseComponent } from './components/content/pagelophocphan/chiase/chiase.component';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TaochudeComponent } from './components/content/chudelophocphan/taochude/taochude.component';
import { Chude1Component } from './components/content/chudelophocphan/list-chude/chude1/chude1.component';
import { Chude2Component } from './components/content/chudelophocphan/list-chude/chude2/chude2.component';
import { Chude3Component } from './components/content/chudelophocphan/list-chude/chude3/chude3.component';
import { Chude4Component } from './components/content/chudelophocphan/list-chude/chude4/chude4.component';
import { TaobaiktraComponent } from './components/content/chudelophocphan/taobaiktra/taobaiktra.component';
import { TaocauhoiComponent } from './components/content/chudelophocphan/taocauhoi/taocauhoi.component';
import { TaotailieuComponent } from './components/content/chudelophocphan/taotailieu/taotailieu.component';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MoigvComponent } from './components/content/pageMoinguoi/moigv/moigv.component';
import { MoisvComponent } from './components/content/pageMoinguoi/moisv/moisv.component';
import { NoidungbaitapComponent } from './components/content/pagelophocphan/noidungbaitap/noidungbaitap.component';
import { NoidungtaileuComponent } from './components/content/pagelophocphan/noidungtaileu/noidungtaileu.component';
import { XembaitapgvComponent } from './components/content/chudelophocphan/allchude/xembaitapgv/xembaitapgv.component';
import { XemtailieugvComponent } from './components/content/chudelophocphan/allchude/xemtailieugv/xemtailieugv.component';
import { NoidungbaitapsvComponent } from './components/content/pagelophocphan/noidungbaitapsv/noidungbaitapsv.component';
import { NoidungtailieusvComponent } from './components/content/pagelophocphan/noidungtailieusv/noidungtailieusv.component';
import { XembaitapsvComponent } from './components/content/chudelophocphan/allchude/xembaitapsv/xembaitapsv.component';
import { XemtailieusvComponent } from './components/content/chudelophocphan/allchude/xemtailieusv/xemtailieusv.component';
import { NavbarTrangchuComponent } from './components/navbar/navbar-trangchu/navbar-trangchu.component';
import { NavbarHocphanComponent } from './components/navbar/navbar-hocphan/navbar-hocphan.component';
import { PageTrangchuComponent } from './pages/page-trangchu/page-trangchu.component';
import { PageLophocphanComponent } from './pages/page-lophocphan/page-lophocphan.component';
import { NavbarNoneComponent } from './components/navbar/navbar-none/navbar-none.component';
import { PageBaigiangComponent } from './pages/page-baigiang/page-baigiang.component';
import { PageMoinguoiComponent } from './pages/page-moinguoi/page-moinguoi.component';
import { PageChudelophocphanComponent } from './pages/page-chudelophocphan/page-chudelophocphan.component';
import { TaobaitapComponent } from './components/content/chudelophocphan/taobaitap/taobaitap.component';
import { PageCotodiemComponent } from './pages/page-cotdiem/page-cotdiem.component';
import { PageTongdiemComponent } from './pages/page-tongdiem/page-tongdiem.component';
import { PageChamdiemComponent } from './pages/page-chamdiem/page-chamdiem.component';
import { PageCaidatComponent } from './pages/page-caidat/page-caidat.component';
import { PageTrangcanhansvComponent } from './pages/page-trangcanhansv/page-trangcanhansv.component';
import { PageTrangcanhangvComponent } from './pages/page-trangcanhangv/page-trangcanhangv.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChiaseComponent,
    TaobaitapComponent,
    TaochudeComponent,
    Chude1Component,
    Chude2Component,
    Chude3Component,
    Chude4Component,
    TaobaiktraComponent,
    TaocauhoiComponent,
    TaotailieuComponent,
    MoigvComponent,
    MoisvComponent,
    NoidungbaitapComponent,
    NoidungtaileuComponent,
    XembaitapgvComponent,
    XemtailieugvComponent,
    NoidungbaitapsvComponent,
    NoidungtailieusvComponent,
    XembaitapsvComponent,
    XemtailieusvComponent,
    NavbarTrangchuComponent,
    NavbarHocphanComponent,
    PageTrangchuComponent,
    PageLophocphanComponent,
    NavbarNoneComponent,
    PageBaigiangComponent,
    PageMoinguoiComponent,
    PageChudelophocphanComponent,
    PageCotodiemComponent,
    PageTongdiemComponent,
    PageChamdiemComponent,
    PageCaidatComponent,
    PageTrangcanhansvComponent,
    PageTrangcanhangvComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    FontAwesomeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
  ],
  entryComponents: [
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
