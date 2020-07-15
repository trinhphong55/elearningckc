import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageTrangchuComponent } from './pages/page-trangchu/page-trangchu.component';
import { PageNotfoundComponent } from './pages/page-notfound/page-notfound.component';
import { PagePostComponent } from './pages/page-post/page-post.component';
import { PageContactComponent } from './pages/page-contact/page-contact.component';
import { PageSearchComponent } from './pages/page-search/page-search.component';
import { PageDocumentComponent } from './pages/page-document/page-document.component';
import { PageJobComponent } from './pages/page-job/page-job.component';
import { PageJobDetailComponent } from './pages/page-job-detail/page-job-detail.component';

const routes: Routes = [
  {
    path: '', component: PageTrangchuComponent, pathMatch: 'full'
  },
  {
    path: 'post', component: PagePostComponent
  },
  {
    path: 'contact', component: PageContactComponent
  },
  {
    path: 'search', component: PageSearchComponent
  },
  {
    path: 'document', component: PageDocumentComponent
  },
  {
    path: 'job', component: PageJobComponent
  },
  {
    path: 'job-detail', component: PageJobDetailComponent
  },
  {
    path: '**', component: PageNotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
