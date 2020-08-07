import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chude1Component } from './components/content/chudelophocphan/list-chude/chude1/chude1.component';
import { Chude2Component } from './components/content/chudelophocphan/list-chude/chude2/chude2.component';
import { Chude3Component } from './components/content/chudelophocphan/list-chude/chude3/chude3.component';
import { Chude4Component } from './components/content/chudelophocphan/list-chude/chude4/chude4.component';
import { PageTrangchuComponent } from './pages/page-trangchu/page-trangchu.component';
import { NavbarTrangchuComponent } from './components/navbar/navbar-trangchu/navbar-trangchu.component';
import { NavbarHocphanComponent } from './components/navbar/navbar-hocphan/navbar-hocphan.component';
import { PageLophocphanComponent } from './pages/page-lophocphan/page-lophocphan.component';
import { NavbarNoneComponent } from './components/navbar/navbar-none/navbar-none.component';
import { PageBaigiangComponent } from './pages/page-baigiang/page-baigiang.component';
import { PageMoinguoiComponent } from './pages/page-moinguoi/page-moinguoi.component';
import { PageChudelophocphanComponent } from './pages/page-chudelophocphan/page-chudelophocphan.component';
import { PageCotodiemComponent } from './pages/page-cotdiem/page-cotdiem.component';
import { PageHuongdanComponent } from './pages/page-huongdan/page-huongdan.component';
import { PageBaitapgiaovienComponent } from './pages/page-baitapgiaovien/page-baitapgiaovien.component';
import { PageCaidatComponent } from './pages/page-caidat/page-caidat.component';
import { PageTrangcanhansvComponent } from './pages/page-trangcanhansv/page-trangcanhansv.component';
import { PageTrangcanhangvComponent } from './pages/page-trangcanhangv/page-trangcanhangv.component';


const routes: Routes = [
  {
    path: '',
    component: PageTrangchuComponent,
  },
  {
    path: 'hososv',
    component: PageTrangcanhansvComponent,
  },
  {
    path: 'hosogv',
    component: PageTrangcanhangvComponent,
  },
  {
    path: 'caidat',
    component: PageCaidatComponent,
  },
  {
    path: 'lophocphan/:id',
    component: PageLophocphanComponent,
    
  },
  {
    path: 'baigiang/:id',
    component: PageBaigiangComponent,
    children: [
      { path: '', component: PageChudelophocphanComponent },
      { path: 'all', component: PageChudelophocphanComponent },
      {
        path: 'chude1',
        component: Chude1Component,
      },
      {
        path: 'chude1',
        component: Chude1Component,
      },
      {
        path: 'chude2',
        component: Chude2Component,
      },
      {
        path: 'chude3',
        component: Chude3Component,
      },
      {
        path: 'chude4',
        component: Chude4Component,
      },
    ],
  },
  {
    path: 'moinguoi/:id',
    component: PageMoinguoiComponent,
  },
  {
    path: 'cotdiem/:id',
    component: PageCotodiemComponent,
  },
  {
    path: 'huongdan/:id',
    component: PageHuongdanComponent,
  },
  {
    path: 'baitapgv/:id',
    component: PageBaitapgiaovienComponent,
  },
  {
    path: '',
    component: NavbarTrangchuComponent,
    outlet: 'navbar',
  },
  {
    
    path: 'lophocphan/:id',
    component: NavbarHocphanComponent,
    outlet: 'navbar',
  },
  {
    path: 'hoso',
    component: NavbarNoneComponent,
    outlet: 'navbar',
  },
  {
    path: '**',
    component: NavbarNoneComponent,
    outlet: 'navbar',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
