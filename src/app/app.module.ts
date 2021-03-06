import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InlineEditorModule } from '@qontu/ngx-inline-editor';
import { GlobalState } from './global.state';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpsRequestInterceptor } from './interceptor.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { NgPipesModule } from 'ngx-pipes';
import { ShareButtonsModule } from 'ngx-sharebuttons';
import { HttpModule } from '@angular/http';

// Bootstrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// ngx-facebook
import { FacebookModule } from 'ngx-facebook';

// ngx-cookie-service
import { CookieService } from 'ngx-cookie-service';

// angulartics2
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';

// Application Modules
import { CommentsReportModule } from './comments_report/comments-report.module';
import { SharedModule } from './shared/shared.module';
import { GamificationModule } from './gamification/gamification.module';

// Application imports
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { EmbedComponent } from './embed/embed.component';
import { ParticipateComponent } from './participate/participate.component';
import { rootRouterConfig } from './app.routes';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationComponent } from './notification/notification.component';
// import { CommentsComponent } from './comments/comments.component';
import { ConversationsComponent } from './conversations/conversations.component';
import { ConversationComponent } from './conversation/conversation.component';
import { LoginComponent } from './login/login.component';
import { SliderModalComponent } from './home-slider/slider-modal/slider-modal.component';
import { NudgeComponent } from './nudge/nudge.component';
import { RegistrationComponent } from './registration/registration.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { LogoutComponent } from './logout/logout.component';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
import { AuthService } from './services/auth.service';
import { ProfileService } from './services/profile.service';
import { CategoryService } from './services/category.service';
import { SocialFacebookService } from './services/social-facebook.service';
import { ToastService } from './services/toast.service';
import { SessionService } from './services/session.service';
import { BadgeService } from './gamification/shared/badge.service';
import { SafePipe } from './shared/pipes/safe.pipe';
import { ValidationMessageComponent } from './shared/validation-message/validation-message.component';
import { ValidateOnBlurDirective } from './shared/validation-message/validate-onblur.directive';
import { HomeSliderComponent } from './home-slider/home-slider.component';
import { CategoryComponent } from './category/category.component';

import { TourInterceptor } from './gamification/shared/tour.interceptor';
import { BadgeInterceptor } from './gamification/shared/badge.interceptor';
import { BadgeComponent } from './gamification/badge/badge.component';
import { environment } from '../environments/environment';

import * as Raven from 'raven-js';

if (environment.sentryDSN) {
  Raven.config(environment.sentryDSN)
       .install();
}

export class RavenErrorHandler implements ErrorHandler {
  handleError(err: any): void {
    console.error(err);
    // If an HttpErrorResponse has been thrown, an event has already been sent to Sentry
    // Therefore, the usual error handling must be bypassed on that case
    if (!(err instanceof HttpErrorResponse)) {
      Raven.captureException(err.originalError || err);
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    EmbedComponent,
    ParticipateComponent,
    NavigationBarComponent,
    HeaderComponent,
    FooterComponent,
    NotificationsComponent,
    NotificationComponent,
    ConversationsComponent,
    ConversationComponent,
    HomeSliderComponent,
    LoginComponent,
    SliderModalComponent,
    NudgeComponent,
    RegistrationComponent,
    RecoverPasswordComponent,
    LogoutComponent,
    ImageUploadComponent,
    SafePipe,
    ValidationMessageComponent,
    ValidateOnBlurDirective,
    CategoryComponent
  ],
  imports: [
    CommentsReportModule,
    GamificationModule,
    SharedModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    InlineEditorModule,
    NgProgressModule,
    BrowserAnimationsModule,
    NgPipesModule,
    ToastrModule.forRoot(),
    FacebookModule.forRoot(),
    Ng2Webstorage.forRoot({ prefix: 'empurrandojuntos', caseSensitive: true }) ,
    NgbModule.forRoot(),
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    HttpModule,
    ShareButtonsModule.forRoot(),
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
  ],
  providers: [GlobalState,
    AuthService,
    SessionService,
    BadgeService,
    ProfileService,
    CategoryService,
    SocialFacebookService,
    ToastService,
    CookieService,
    { provide: ErrorHandler, useClass: RavenErrorHandler },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TourInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: BadgeInterceptor, multi: true },

  ],
  entryComponents: [LoginComponent,
                    RegistrationComponent,
                    NudgeComponent,
                    SliderModalComponent,
                    RecoverPasswordComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
