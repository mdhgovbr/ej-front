import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { By } from '@angular/platform-browser';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import * as helpers from '../../spec/helpers';
import { ProfileComponent } from './profile.component';
import { ImageUploadComponent } from '../shared/image-upload/image-upload.component';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';


describe('ProfileComponent', () => {

  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  const mocks = helpers.getMocks();

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      imports: [ TranslateModule.forRoot(), FormsModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ ProfileComponent, ImageUploadComponent ],
      providers: [
        { provide: ProfileService, useValue: mocks.profileService },
        { provide: NotificationService, useValue: mocks.notificationService },        
        { provide: AuthService, useValue: mocks.authService },
      ],
      schemas: [NO_ERRORS_SCHEMA]

    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
