import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import * as helpers from '../../spec/helpers';

import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { ProfileService } from './profile.service';

describe('AuthService', () => {

    const mocks = helpers.getMocks();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService,
                { provide: SessionService, useValue: mocks.sessionService },
                { provide: ProfileService, useValue: mocks.profileService },
            ]
        });
    });

    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

});
