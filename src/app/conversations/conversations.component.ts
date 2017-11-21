import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash'

import { ConversationService } from '../services/conversation.service';
import { Conversation } from '../models/conversation';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  providers: [ConversationService],
})
export class ConversationsComponent implements OnInit {

  conversations: Conversation[];
  @Input() profile: Profile;

  constructor(private conversationService: ConversationService,
              private profileService: ProfileService) {

    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
  }

  ngOnInit() {
    this.conversationService.list().subscribe((conversations: Conversation[]) => {
      this.conversations = _.sortBy(conversations, ['position']);
    });
  }

  groupConversations(){
    return [this.conversations];
  }

  amount(){
    _.size(this.conversations);
  }

  backgroundImage(conversation: Conversation): string{
    const imagem_path = (_.isNil(conversation.background_image)) ? '/assets/images/card-bg.jpg' : conversation.background_image;
    return imagem_path;
  }

  ratio(conversation: Conversation){
    let ratio = conversation.user_participation_ratio;
    if(!ratio){
      ratio = 0;
    }
    return ratio;
  }

  toPercentage(value){
    return Math.floor(value * 100);
  }

  parserDate(strDate: string){
    strDate = this.convertDate(strDate);
    const newDate = new Date(strDate);
    return newDate;
  }

  convertDate(date){
    let dateArray = date.split("-");
    let newDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0];

    return newDate;
  }

  hexToRGBA(hex){
    var c;
    c= hex.substring(1).split('');
    if(c.length== 3){
        c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+', 0.66)';
  }


}

