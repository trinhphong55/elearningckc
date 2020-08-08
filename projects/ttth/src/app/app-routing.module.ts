import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLienheComponent } from './pages/page-lienhe/page-lienhe.component';
import { PageChitiettintucComponent } from './pages/page-chitiettintuc/page-chitiettintuc.component';
import { PageDangkikhoahocComponent } from './pages/page-dangkikhoahoc/page-dangkikhoahoc.component';
import { PageTintucComponent } from './pages/page-tintuc/page-tintuc.component';
import { PageDanhsachlophocComponent } from './pages/page-danhsachlophoc/page-danhsachlophoc.component';
import { PageDangkidotthiComponent } from './pages/page-dangkidotthi/page-dangkidotthi.component';
import { PageTimkiemComponent } from './pages/page-timkiem/page-timkiem.component';
import { PageTracuudiemComponent } from './pages/page-tracuudiem/page-tracuudiem.component';
import { PageChitietkhoahocComponent } from './pages/page-chitietkhoahoc/page-chitietkhoahoc.component';
import { PageDanhsachbaivietcuakhoahocComponent } from './pages/page-danhsachbaivietcuakhoahoc/page-danhsachbaivietcuakhoahoc.component';


const routes: Routes = [
  {
    path: '', component: PageHomeComponent, pathMatch: 'full'
  },
  {
    path: 'lienhe', component: PageLienheComponent
  },
  {
    path: 'tintuc', component: PageTintucComponent
  },
  {
    path: 'chude/:id', component: PageDanhsachbaivietcuakhoahocComponent
  },
  {
    path: 'chitietkhoahoc/:id', component: PageChitietkhoahocComponent
  },
  {
    path: 'chitiettintuc/:id', component: PageChitiettintucComponent
  },
  {
    path: 'dangkikhoahoc', component: PageDangkikhoahocComponent
  },
  {
    path: 'danhsachlophoc', component: PageDanhsachlophocComponent
  },
  {
    path: 'dangkidotthi', component: PageDangkidotthiComponent
  },
  {
    path: 'timkiem', component: PageTimkiemComponent
  },
  {
    path: 'tracuudiem', component: PageTracuudiemComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
