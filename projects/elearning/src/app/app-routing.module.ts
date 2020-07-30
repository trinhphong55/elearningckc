import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LophocComponent } from './pages/list-menu/menu-main/lophoc/lophoc.component';
import { CaidatComponent } from './pages/list-menu/menu-main/caidat/caidat.component';
import { LophocContentGvComponent } from './components/content/lophoc-content-gv/lophoc-content-gv.component';
import { LuongComponent } from './components/content/lophoc-content-gv/luong/luong.component';
import { BaitaptrenlopComponent } from './components/content/lophoc-content-gv/baitaptrenlop/baitaptrenlop.component';
import { MoinguoiComponent } from './components/content/lophoc-content-gv/moinguoi/moinguoi.component';
import { SodiemComponent } from './components/content/lophoc-content-gv/sodiem/sodiem.component';
import { AllchudeComponent } from './components/content/lophoc-content-gv/baitaptrenlop/allchude/allchude.component';
import { Chude1Component } from './components/content/lophoc-content-gv/baitaptrenlop/list-chude/chude1/chude1.component';
import { Chude2Component } from './components/content/lophoc-content-gv/baitaptrenlop/list-chude/chude2/chude2.component';
import { Chude3Component } from './components/content/lophoc-content-gv/baitaptrenlop/list-chude/chude3/chude3.component';
import { Chude4Component } from './components/content/lophoc-content-gv/baitaptrenlop/list-chude/chude4/chude4.component';
import { HuongdanComponent } from './components/content/lophoc-content-gv/huongdan/huongdan.component';
import { BaitapgvComponent } from './components/content/lophoc-content-gv/baitapgv/baitapgv.component';
import { TrangcanhanComponent } from './pages/list-menu/menu-main/trangcanhan/trangcanhan.component';
import { ThongtinsvComponent } from './components/content/trangcanhan-content/thongtinsv/thongtinsv.component';
import { ThoikhoabieusvComponent } from './components/content/trangcanhan-content/thoikhoabieusv/thoikhoabieusv.component';
import { DiemsosvComponent } from './components/content/trangcanhan-content/diemsosv/diemsosv.component';
const routes: Routes = [
  {
    path: '',
    component: LophocComponent
  },
  {
    path: 'lophoc',
    component: LophocComponent
  },
  {
    path: 'trangcanhan',
    component: TrangcanhanComponent,
    children: [
      { path: '', component: ThongtinsvComponent },
      { path: 'thongtinsv', component: ThongtinsvComponent },
      { path: 'thoikhoabieusv', component: ThoikhoabieusvComponent },
      { path: 'diemsosv', component: DiemsosvComponent }
    ]
  },
  {
    path: 'caidat',
    component: CaidatComponent
  }
  , {
    path: 'gv/:id',
    component: LophocContentGvComponent,
    children: [
      { path: 'luong', component: LuongComponent },
      {
        path: 'baitaptrenlop', component: BaitaptrenlopComponent,
        children: [
          { path: 'all', component: AllchudeComponent },
          { path: 'chude1', component: Chude1Component },
          { path: 'chude2', component: Chude2Component },
          { path: 'chude3', component: Chude3Component },
          { path: 'chude4', component: Chude4Component },
          {
            path: '',
            component: AllchudeComponent
          }
        ]
      },
      { path: 'moinguoi', component: MoinguoiComponent },
      { path: 'huongdan', component: HuongdanComponent },
      { path: 'baitapgv', component: BaitapgvComponent },
      { path: 'sodiem', component: SodiemComponent },
      {
        path: '',
        component: LuongComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
