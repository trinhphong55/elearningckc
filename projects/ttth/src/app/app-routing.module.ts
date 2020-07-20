import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageLienheComponent } from './pages/page-lienhe/page-lienhe.component';
import { PageChitiettintucComponent } from './pages/page-chitiettintuc/page-chitiettintuc.component';
import { PageDangkikhoahocComponent } from './pages/page-dangkikhoahoc/page-dangkikhoahoc.component';
import { PageTintucComponent } from './pages/page-tintuc/page-tintuc.component';


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
    path: 'chitiettintuc', component: PageChitiettintucComponent
  },
  {
    path: 'dangkikhoahoc', component: PageDangkikhoahocComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
