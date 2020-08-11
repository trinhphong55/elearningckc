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
    path: 'tai-lieu',
    component: PageDocumentComponent,
    data: {
      breadcrumb: 'Tài liệu',
    },
  },
  {
    path: 'viec-lam',
    component: PageJobComponent,
    data: {
      breadcrumb: 'Việc làm',
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
    path: '**',
    component: PageNotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
