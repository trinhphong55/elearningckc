import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LayoutModule} from '@angular/cdk/layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { HeaderMainComponent } from './components/header/header-main/header-main/header-main.component';
import { MenuMainComponent } from './pages/list-menu/menu-main/menu-main.component';
import { LophocComponent } from './pages/list-menu/menu-main/lophoc/lophoc.component';
import { LichComponent } from './pages/list-menu/menu-main/lich/lich.component';
import { GiangdayComponent } from './pages/list-menu/menu-main/giangday/giangday.component';
import { DadangkyComponent } from './pages/list-menu/menu-main/dadangky/dadangky.component';
import { LophocdaluutruComponent } from './pages/list-menu/menu-main/lophocdaluutru/lophocdaluutru.component';
import { CaidatComponent } from './pages/list-menu/menu-main/caidat/caidat.component';
import { FooterComponent } from './components/footer/footer.component';
import { TaoOrThamgiaLophocComponent } from './pages/list-menu/menu-main/tao-or-thamgia-lophoc/tao-or-thamgia-lophoc.component';
import { MatMenuModule} from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThamgialophocComponent } from './pages/list-menu/menu-main/tao-or-thamgia-lophoc/thamgialophoc/thamgialophoc.component';
import { TaolophocComponent } from './pages/list-menu/menu-main/tao-or-thamgia-lophoc/taolophoc/taolophoc.component';
import {MatDialogModule} from '@angular/material/dialog';
import { TaolophocContentComponent } from './pages/list-menu/menu-main/tao-or-thamgia-lophoc/taolophoc/taolophoc-content/taolophoc-content.component';
import { ThamgialophocContentComponent } from './pages/list-menu/menu-main/tao-or-thamgia-lophoc/thamgialophoc/thamgialophoc-content/thamgialophoc-content.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormTaolophocContentComponent } from './pages/list-menu/menu-main/tao-or-thamgia-lophoc/taolophoc/taolophoc-content/form-taolophoc-content/form-taolophoc-content.component';
import { SidebarModule } from 'ng-sidebar';
import { LophocContentComponent } from './components/content/lophoc-content/lophoc-content.component';
import {MatCardModule} from '@angular/material/card';
import { LophocContentGvComponent } from './components/content/lophoc-content-gv/lophoc-content-gv.component';
import { LuongComponent } from './components/content/lophoc-content-gv/luong/luong.component';
import { BaitaptrenlopComponent } from './components/content/lophoc-content-gv/baitaptrenlop/baitaptrenlop.component';
import { MoinguoiComponent } from './components/content/lophoc-content-gv/moinguoi/moinguoi.component';
import { SodiemComponent } from './components/content/lophoc-content-gv/sodiem/sodiem.component';
import { ChiaseComponent } from './components/content/lophoc-content-gv/luong/chiase/chiase.component';
import {MatSelectModule} from '@angular/material/select';
import { ChonlopComponent } from './components/content/lophoc-content-gv/luong/chonlop/chonlop.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { TaobaitapComponent } from './components/content/lophoc-content-gv/baitaptrenlop/taobaitap/taobaitap.component';
import {MatDatepickerModule } from '@angular/material/datepicker';
import { TaochudeComponent } from './components/content/lophoc-content-gv/baitaptrenlop/taochude/taochude.component';
import { AllchudeComponent } from './components/content/lophoc-content-gv/baitaptrenlop/allchude/allchude.component';
import { Chude1Component } from './components/content/lophoc-content-gv/baitaptrenlop/list-chude/chude1/chude1.component';
import { Chude2Component } from './components/content/lophoc-content-gv/baitaptrenlop/list-chude/chude2/chude2.component';
import { Chude3Component } from './components/content/lophoc-content-gv/baitaptrenlop/list-chude/chude3/chude3.component';
import { Chude4Component } from './components/content/lophoc-content-gv/baitaptrenlop/list-chude/chude4/chude4.component';
import { ThoikhoabieuComponent } from './pages/list-menu/menu-main/thoikhoabieu/thoikhoabieu.component';
import { TaobaiktraComponent } from './components/content/lophoc-content-gv/baitaptrenlop/taobaiktra/taobaiktra.component';
import { TaocauhoiComponent } from './components/content/lophoc-content-gv/baitaptrenlop/taocauhoi/taocauhoi.component';
import { TaotailieuComponent } from './components/content/lophoc-content-gv/baitaptrenlop/taotailieu/taotailieu.component';
import {MatTableModule} from '@angular/material/table';
import { AccountComponent } from './pages/list-menu/menu-main/tao-or-thamgia-lophoc/account/account.component';
import { HuongdanComponent } from './components/content/lophoc-content-gv/huongdan/huongdan.component';
import { BaitapgvComponent } from './components/content/lophoc-content-gv/baitapgv/baitapgv.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MoigvComponent } from './components/content/lophoc-content-gv/moinguoi/moigv/moigv.component';
import { MoisvComponent } from './components/content/lophoc-content-gv/moinguoi/moisv/moisv.component';
import { ThoikhoabieuctComponent } from './components/content/thoikhoabieuct/thoikhoabieuct.component';
import { ThoikhoabieuchitietComponent } from './components/content/thoikhoabieuct/thoikhoabieuchitiet/thoikhoabieuchitiet.component';
import { NoidungbaitapComponent } from './components/content/lophoc-content-gv/luong/noidungbaitap/noidungbaitap.component';
import { NoidungtaileuComponent } from './components/content/lophoc-content-gv/luong/noidungtaileu/noidungtaileu.component';
import { XembaitapgvComponent } from './components/content/lophoc-content-gv/baitaptrenlop/allchude/xembaitapgv/xembaitapgv.component';
import { XemtailieugvComponent } from './components/content/lophoc-content-gv/baitaptrenlop/allchude/xemtailieugv/xemtailieugv.component';
import { NoidungbaitapsvComponent } from './components/content/lophoc-content-gv/luong/noidungbaitapsv/noidungbaitapsv.component';
import { NoidungtailieusvComponent } from './components/content/lophoc-content-gv/luong/noidungtailieusv/noidungtailieusv.component';
import { XembaitapsvComponent } from './components/content/lophoc-content-gv/baitaptrenlop/allchude/xembaitapsv/xembaitapsv.component';
import { XemtailieusvComponent } from './components/content/lophoc-content-gv/baitaptrenlop/allchude/xemtailieusv/xemtailieusv.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderMainComponent,
    MenuMainComponent,
    LophocComponent,
    LichComponent,
    GiangdayComponent,
    DadangkyComponent,
    LophocdaluutruComponent,
    CaidatComponent,
    FooterComponent,
    TaoOrThamgiaLophocComponent,
    ThamgialophocComponent,
    TaolophocComponent,
    TaolophocContentComponent,
    ThamgialophocContentComponent,
    FormTaolophocContentComponent,
    LophocContentComponent,
    LophocContentGvComponent,
    LuongComponent,
    BaitaptrenlopComponent,
    MoinguoiComponent,
    SodiemComponent,
    ChiaseComponent,
    ChonlopComponent,
    TaobaitapComponent,
    TaochudeComponent,
    AllchudeComponent,
    Chude1Component,
    Chude2Component,
    Chude3Component,
    Chude4Component,
    ThoikhoabieuComponent,
    TaobaiktraComponent,
    TaocauhoiComponent,
    TaotailieuComponent,
    AccountComponent,
    HuongdanComponent,
    BaitapgvComponent,
    MoigvComponent,
    MoisvComponent,
    ThoikhoabieuctComponent,
    ThoikhoabieuchitietComponent,
    NoidungbaitapComponent,
    NoidungtaileuComponent,
    XembaitapgvComponent,
    XemtailieugvComponent,
    NoidungbaitapsvComponent,
    NoidungtailieusvComponent,
    XembaitapsvComponent,
    XemtailieusvComponent
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
    SidebarModule.forRoot(),
    MatCardModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule
   
  ],
  entryComponents:[TaolophocContentComponent,
                    ThamgialophocContentComponent,TaobaitapComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent,TaobaitapComponent]
})


export class AppModule { }
