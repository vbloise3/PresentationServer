import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';

import { PostsService } from './services/posts.service';
import { ElementsService } from './services/elements.service';
import { TestComponent } from './test/test.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Test2ComponentComponent } from './test2-component/test2-component.component';
import { ElementsComponent } from './elements/elements.component';
import {TableDataService} from './services/table-data.service';
import {MdButtonModule, MdCheckboxModule, MdTableModule} from '@angular/material';

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
    path: 'tester2',
    component: Test2ComponentComponent
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'elements',
    component: ElementsComponent
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
    PageNotFoundComponent,
    Test2ComponentComponent,
    ElementsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MdButtonModule, MdCheckboxModule, MdTableModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [PostsService, ElementsService, TableDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
