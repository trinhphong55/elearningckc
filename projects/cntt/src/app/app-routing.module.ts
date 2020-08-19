import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTrangchuComponent } from './pages/page-trangchu/page-trangchu.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';
import { PagePostComponent } from './pages/page-post/page-post.component';
import { PageContactComponent } from './pages/page-contact/page-contact.component';
import { PageSearchComponent } from './pages/page-search/page-search.component';
import { PageDocumentComponent } from './pages/page-document/page-document.component';
import { PageJobComponent } from './pages/page-job/page-job.component';
import { PageDanhsachtintucComponent } from './pages/page-danhsachtintuc/page-danhsachtintuc.component';
import { PageBaivietComponent } from './pages/page-baiviet/page-baiviet.component';
import { PageThongbaoComponent } from './pages/page-thongbao/page-thongbao.component';
import { PageDanhsachthongbaoComponent } from './pages/page-danhsachthongbao/page-danhsachthongbao.component';
import { PageDanhsachtailieuComponent } from './pages/page-danhsachtailieu/page-danhsachtailieu.component';
import { PageTailieuComponent } from './pages/page-tailieu/page-tailieu.component';
import { PageThoikhoabieuComponent } from './pages/page-thoikhoabieu/page-thoikhoabieu.component';
import { PageDanhsachthoikhoabieuComponent } from './pages/page-danhsachthoikhoabieu/page-danhsachthoikhoabieu.component';
import { PageVieclamComponent } from './pages/page-vieclam/page-vieclam.component';
const routes: Routes = [
  {
    path: '',
    component: PageTrangchuComponent,
    pathMatch: 'full',
  },
  {
    path: 'lien-he',
    component: PageContactComponent,
    data: {
      breadcrumb: 'Liên hệ',
    },
  },
  {
    path: 'tim-kiem',
    component: PageSearchComponent,
    data: {
      breadcrumb: 'Tìm kiếm',
    },
  },
  {
    path: 'bai-viet',
    component: PageBaivietComponent,
    data: {
      breadcrumb: 'Bài viết',
    },
    children: [
      {
        path: '',
        component: PageDanhsachtintucComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: ':id',
        component: PagePostComponent,
        data: {
          breadcrumb: '',
        },
      },
    ],
  },
  {
    path: 'thong-bao',
    component: PageThongbaoComponent,
    data: {
      breadcrumb: 'Thông báo',
    },
    children: [
      {
        path: '',
        component: PageDanhsachthongbaoComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: ':id',
        component: PagePostComponent,
        data: {
          breadcrumb: '',
        },
      },
    ],
  },
  {
    path: 'tai-lieu',
    component: PageTailieuComponent,
    data: {
      breadcrumb: 'Tài Liệu',
    },
    children: [
      {
        path: '',
        component: PageDanhsachtailieuComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: ':id',
        component: PagePostComponent,
        data: {
          breadcrumb: '',
        },
      },
    ],
  },
  {
    path: 'thoi-khoa-bieu',
    component: PageThoikhoabieuComponent,
    data: {
      breadcrumb: 'Thời Khoá Biểu',
    },
    children: [
      {
        path: '',
        component: PageDanhsachthoikhoabieuComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: ':id',
        component: PagePostComponent,
        data: {
          breadcrumb: '',
        },
      },
    ],
  },
  {
    path: 'viec-lam',
    component: PageVieclamComponent,
    data: {
      breadcrumb: 'Cơ hội việc làm',
    },
    children: [
      {
        path: '',
        component: PageJobComponent,
        data: {
          breadcrumb: '',
        },
      },
      {
        path: ':id',
        component: PagePostComponent,
        data: {
          breadcrumb: '',
        },
      },
    ],
  },
  {
    path: '**',
    component: PageNotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
