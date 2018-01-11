import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'

import { ProfileService } from '../../../services/profile.service';
import { ConversationService } from '../../../services/conversation.service';
import { VoteService } from '../../../services/vote.service';
import { TourService } from '../../shared/tour.service';
import { Profile } from '../../../models/profile';
import { Tour } from '../../shared/tour-model';
import { Conversation } from '../../../models/conversation';
import { Comment } from '../../../comments/shared/comment.model';

@Component({
  selector: 'app-step-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  providers: [ ConversationService, VoteService ],
})
export class VoteComponent implements OnInit {
  profile: Profile;
  conversation: Conversation;
  comment: Comment;
  amountVotes = 0;
  
  constructor( private profileService: ProfileService, private conversationService: ConversationService, 
    private voteService: VoteService, private tourService: TourService) { 
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());

    //FIXME Replace by random() when we have a random conversation endpoint
    conversationService.list().subscribe(conversations => {
      this.conversation = conversations[0];
      conversationService.getNextUnvotedComment(conversations[0].id).subscribe(comment => {
        this.comment = comment;
      }, error => {
        this.comment = null;
      });
    });
  }

  ngOnInit() {
  }

  saveNextStepOnProfile(){
    this.profile.tour_step = this.tourService.nextStep(this.profile.tour_step)
    this.profileService.save(this.profile).subscribe( profile => {
      this.profileService.setProfile(profile);
      this.amountVotes = 0;
    }, error => {
      console.log(error);
    });
  }

  vote(comment, action) {
    this.voteService[action](comment).subscribe(vote => {
      this.amountVotes += 1;
      if(this.profile.tour_step == Tour.STEP_FIVE && (this.amountVotes == 2)){
        this.saveNextStepOnProfile();
      }else if((this.profile.tour_step != Tour.STEP_FIVE) && (this.profile.tour_step != Tour.STEP_TEN)){
        this.saveNextStepOnProfile();
      }else if(this.profile.tour_step == Tour.STEP_TEN && (this.amountVotes == 2)){
          this.saveNextStepOnProfile();
      }else{
        this.conversationService.getNextUnvotedComment(this.conversation.id).subscribe(comment => {
          this.comment = comment;
        }, error => {
          this.comment = null;
        });
      }
    });

    // FIXME encapsulate this call to polis for every vote computed
    // Send this vote to the polis backend also
  //   let votePolisValue;
  //   switch (action) {
  //     case 'agree': {
  //       votePolisValue = -1;
  //       break;
  //     }
  //     case 'disagree': {
  //       votePolisValue = 1;
  //       break;
  //     }
  //     default: {
  //       votePolisValue = 0;
  //       break;
  //     }
  //  }
  //  this.voteService.polisSave(votePolisValue, comment.polis_id, this.conversation.polis_slug, this.profile.id).subscribe();
  }

}
