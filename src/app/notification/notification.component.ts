import { Component, OnInit, Input, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { NotificationService } from '../services/notification.service';
import { Profile } from '../models/profile';
import { UserNotification } from '../models/user-notification';
import { GlobalState } from '../global.state';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [NotificationService],
})
export class NotificationComponent implements OnInit, AfterViewInit {

  @Input() profile: Profile;
  @Input() user_notification: UserNotification;

  search: string;
  showNotifications: string;

  alerts: UserNotification[];
  alertsLoaded = false;
  unreadCount = -1;

  constructor(private _state: GlobalState, private profileService: ProfileService, private notificationService: NotificationService,
              private route: ActivatedRoute, private _changeDetectionRef : ChangeDetectorRef) {

    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
    }, error => {
      // handle request errors here
    });

    // get user_notifications now
    this.notificationService.list().subscribe((user_notifications) => {
      this.alerts = user_notifications;
      this.alertsLoaded = true;

      let count = 0;
      this.alerts.forEach((notification) => {
        notification.notification.shorter_description = this.truncate(notification.notification.short_description);
        if (notification.status != 'read') {
          count++;
        }
      });
      this.unreadCount = count;

      this.route.params.subscribe(params => {
        this.setActive(params.id);
      });
    }, error => {
      // handle request errors here
    });
  }

  ngAfterViewInit() {
    this._changeDetectionRef.detectChanges();
  }

  ngOnInit() {
    this.search = '';
    this.showNotifications = 'all';
  }

  setActive(id) {
    id = Number(id);
    let currentNotification = this.alerts[0];
    this.alerts.forEach((notification) => {
      if (notification.id === id) {
        currentNotification = notification;
      }
    });
    if (currentNotification.status != 'read') {
      this.notificationService.markAsRead(currentNotification.id).subscribe((response) => {
        if (this.unreadCount > 0) {
          this.unreadCount--;
        }
        currentNotification.status = 'read';
      }, error => {
        // handle request errors here
      });
    }
    this.user_notification = currentNotification;
  }

  filterByString() {
    this.filter();
  }

  toggleUnread() {
    this.filter();
  }

  filter() {
    const alerts = this.alerts.slice(0);
    alerts.forEach((user_notification) => {
      user_notification['hide'] = false;

      if (!user_notification.notification.title.includes(this.search) &&
          !user_notification.notification.short_description.includes(this.search)) {
        user_notification['hide'] = true;
      }

      if (this.showNotifications === 'unread' && user_notification.status === 'read') {
        user_notification['hide'] = true;
      }
    });
    this.alerts = alerts;
  }

  truncate(str) {
    if (str.length > 100) {
      return str.substring(0, 97) + '...';
    } else {
      return str;
    }
  }
}
