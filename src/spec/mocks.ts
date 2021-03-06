import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Output, EventEmitter } from '@angular/core';


export function getMocks() {
    const mocks = {
        commentService: {
            list: () => {
                return {};
            },
            reports: () => {
                return {};
            },
        },
        commentReportService: {
            list: () => {
                return {};
            },
            reports: () => {
                return {};
            },
        },
        conversationService: {
            list: () => {
                return Observable.of([]);
            },
        },
        toastService: {
            success: () => {
                return "";
            },
        },
        tourService: {
            success: () => {
                return "";
            },
        },
        badgeService: {
            list: () => {
                return Observable.of([]);
            },
            success: () => {
                return "";
            },
            //FIXME this code will not be necessary after backend works properly
            wasSeen: () => {
                return true;
            }
        },
        bsModalService: {
            show: () => {
                return "";
            },
        },
        ngbActiveModal: {
            close: () => {
                return "";
            },
        },
        authService: {
            signIn: () => {
                return {};
            },
            signOut: () => {
                return Observable.of({});
            },
        },
        socialFacebookService: {
            login: () => {
                return {};
            },
        },
        localStorageService: {
            storage: {},
            clear: (key: string) => { delete mocks.localStorageService.storage[key]; },
            retrieve: (key: string) => mocks.localStorageService.storage[key],
            store: (key: string, value: any) => { mocks.localStorageService.storage[key] = value; }
        },
        sessionService: {
            currentProfile: () => {
                return { "id": 1, "name": "admin", "email": "admin@localhost.com" };
            },
            getTourConversation: () => {
                return {};
            },
            destroyTourStep: () => {},
            destroy: () => {
            },
            setToken: (token: string) => {
                return '';
            },
            sessionChangeEvent: {
                subscribe: (fn: Function) => { },
            },
        },
        categoryService: {
            get: (id: number) => {
                return Observable.of({});
            },
            getCurrent: () => {
                return null;
            },
            setCurrent: () => {
                return null;
            },
            categoryChangeEvent: {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
        },
        profileService: {
            get: (id: number) => {
                return Observable.of({});
            },
            getProfile: () => {
                return { "id": 1, "name": "admin", "email": "admin@localhost.com" };
            },
            setProfile: () => {
                return { };
            },
            list: () => {
                return Observable.of([{}]);
            },
            profileChangeEvent: {
                subscribe: (fn: Function) => { },
                next: (param: any) => { }
            },
        },
        analyticsService: {
            settings: {
                pageTracking: {}
              },
              eventTrack: () => {}
        },
        globalState: {
            subscribe: () => Observable.of({}),
        },
    };
    return mocks;
};

