import { Component, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import { ConversationService } from '../services/conversation.service';
import { CategoryService } from '../services/category.service';
import { Conversation } from '../models/conversation';
import { Category } from '../models/category';
import { Profile } from '../models/profile';
import { ProfileService } from '../services/profile.service';
import { GlobalState } from '../global.state';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: '../conversations/conversations.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [ConversationService, CategoryService],
})
export class CategoryComponent implements OnDestroy {

  category: Category;
  categories: string[] = [''];
  conversations: Conversation[];
  conversationsLoaded = false;
  @Input() profile: Profile;
  styles: any = null;

  constructor(private conversationService: ConversationService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private _state: GlobalState,
    private sanitizer: DomSanitizer,
    private router: Router,
    private profileService: ProfileService) {

    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    });
    this.route.params.subscribe(params => {
      categoryService.get(params.slug).subscribe(category => {
        this.category = category;
        this.styles = (category && category.customizations) ? category.customizations.styles : null;
        this._state.notifyDataChanged('category.data', category);

        conversationService.categorized(category.id).subscribe((conversations: Conversation[]) => {
          this.conversationsLoaded = true;
          this.conversations = _.sortBy(conversations, ['position']);
        }, error => {
          // handle request errors here
        });
      }, error => {
        this.conversations = [];
        this.conversationsLoaded = true;
        this.styles = null;
        this._state.notifyDataChanged('category.data', null);
        this.router.navigate(['conversations']);
      });
    });
  }

  trustContent(html: any): SafeHtml {
    if (_.isNil(html)) {
      html = '';
    } else {
      html = this.sanitizer.bypassSecurityTrustHtml(html);
    }
    return html;
  }

  hasCategoryContent(): boolean {
    let hasContent = false;

    if (this.category && this.category.customizations && this.category.customizations.content) {
      hasContent = true;
    }

    return hasContent;

  }

  ngOnDestroy() {
    this._state.notifyDataChanged('category.data', null);
  }

  groupConversations() {
    return [this.conversations];
  }

  amount() {
    _.size(this.conversations);
  }

  backgroundImage(conversation: Conversation): string {
    const imagem_path = (_.isNil(conversation.background_image)) ? '/assets/images/card-bg.jpg' : conversation.background_image;
    return imagem_path;
  }

  ratio(conversation: Conversation) {
    let ratio = conversation.user_participation_ratio;
    if (!ratio) {
      ratio = 0;
    }
    return ratio;
  }

  toPercentage(value) {
    return Math.floor(value * 100);
  }

  parserDate(strDate: string) {
    strDate = this.convertDate(strDate);
    const newDate = new Date(strDate);
    return newDate;
  }

  convertDate(date) {
    const dateArray = date.split('-');
    const newDate = dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];

    return newDate;
  }

}
