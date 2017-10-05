import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './services/posts.service';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Define the routes
const appRoutes: Routes = [
  {
    path: 'posted',
    component: PostsComponent
  },
  {
    path: 'tester',
    component: TestComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    TestComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
