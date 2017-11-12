import { Component, OnInit } from '@angular/core';

import { CommentService } from './shared/comment.service';
import { Comment } from './shared/comment.model';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService],
})
export class CommentsComponent implements OnInit {

  // profile: Profile;
  comments: Comment[];

  constructor(private commentService: CommentService, private profileService: ProfileService) {
    // this.profile = this.profileService.getProfile();
    
  
    // this.profileService.profileChangeEvent.subscribe(profile => {
    //   this.profile = profile;
    // });
  }

  ngOnInit() {
      // FIXME get the comment of user
      this.commentService.reports().subscribe((comments: Comment[]) => {
        this.comments = comments;
      });
  }

}
