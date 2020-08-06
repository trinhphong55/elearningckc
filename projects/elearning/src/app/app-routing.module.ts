import { TaobaigiangComponent } from './components/content/chudelophocphan/taobaigiang/taobaigiang.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Chude2Component } from './components/content/chudelophocphan/list-chude/chude2/chude2.component';
import { PageTrangchuComponent } from './pages/page-trangchu/page-trangchu.component';
import { NavbarTrangchuComponent } from './components/navbar/navbar-trangchu/navbar-trangchu.component';
import { NavbarHocphanComponent } from './components/navbar/navbar-hocphan/navbar-hocphan.component';
import { PageLophocphanComponent } from './pages/page-lophocphan/page-lophocphan.component';
import { NavbarNoneComponent } from './components/navbar/navbar-none/navbar-none.component';
import { PageBaigiangComponent } from './pages/page-baigiang/page-baigiang.component';
import { PageMoinguoiComponent } from './pages/page-moinguoi/page-moinguoi.component';
import { PageChudelophocphanComponent } from './pages/page-chudelophocphan/page-chudelophocphan.component';
import { PageCotodiemComponent } from './pages/page-cotdiem/page-cotdiem.component';
import { PageTongdiemComponent } from './pages/page-tongdiem/page-tongdiem.component';
import { PageChamdiemComponent } from './pages/page-chamdiem/page-chamdiem.component';
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
    path: 'lophocphan',
    component: PageLophocphanComponent,
  },
  {
    path: 'baigiang',
    component: PageBaigiangComponent,
    children: [
      { path: '', component: PageChudelophocphanComponent },
      { path: 'all', component: PageChudelophocphanComponent },
      { path: 'chude/:id', component: Chude2Component },
      { path: 'taobaigiang', component: TaobaigiangComponent },
    ],
  },
  {
    path: 'moinguoi',
    component: PageMoinguoiComponent,
  },
  {
    path: 'cotdiem',
    component: PageCotodiemComponent,
  },
  {
    path: 'tongdiem',
    component: PageTongdiemComponent,
  },
  {
    path: 'chamdiem',
    component: PageChamdiemComponent,
  },
  {
    path: '',
    component: NavbarTrangchuComponent,
    outlet: 'navbar',
  },
  {
    path: 'lophocphan',
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
