import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-test2-component',
  templateUrl: './test2-component.component.html',
  styleUrls: ['./test2-component.component.css']
})
export class Test2ComponentComponent implements OnInit {
// instantiate posts to an empty array
  posts: any = [];
  displayedColumns = ['Title', 'Body'];

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // Retrieve posts from the API
    this.postsService.getTest2Post().subscribe(posts => {
      this.posts = posts;
    });
  }

  getTestPost() {
    // Retrieve posts from the API
    this.postsService.getTest2Post().subscribe(posts => {
      this.posts = posts;
    });
  }

}
