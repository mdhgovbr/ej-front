import { Component, OnInit, EventEmitter, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash'

import { ProfileService } from '../services/profile.service';
import { Profile } from '../models/profile';
import { RegistrationComponent } from '../registration/registration.component';
import { StepComponent } from './step/step.component';
import { Tour } from './shared/tour-model';
import { TourService } from './shared/tour.service';
import { BadgeComponent } from './badge/badge.component';
import { TipComponent } from './tip/tip.component';
import { PointComponent } from './point/point.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tour',
  template: "",
  entryComponents:[ RegistrationComponent, StepComponent, BadgeComponent, PointComponent, TipComponent ]
})
export class TourComponent implements OnInit {
  profile: Profile;
  
  constructor( private profileService: ProfileService, private modalService: NgbModal, 
    private viewContainerRef: ViewContainerRef, private factory: ComponentFactoryResolver, 
    public activeModal: NgbActiveModal, private tourService: TourService) { 
    this.profile = <Profile>{};
    this.profile = Object.assign(this.profile, this.profileService.getProfile());
    this.profileService.profileChangeEvent.subscribe(profile => {
      this.profile = profile;
      this.ngOnInit();
    });
  }

  ngOnInit() {
    if(!_.isNil(this.profile.id) && (this.profile.tour_step == '' || _.isNil(this.profile.tour_step))){
      this.profileService.me().subscribe( profile => {
        this.profile = profile;
        this.profileService.setProfile(profile);
        this.resolveComponent()
      });
      
    }else{
      this.resolveComponent()
    }
  }

  resolveComponent(){
    let componentType: any;
    componentType = this.componentByStep(_.toString(this.profile.tour_step));
    if(_.isNil(componentType)){
      this.activeModal.close()
    } else{
      let compFactory = this.factory.resolveComponentFactory(componentType);
      this.viewContainerRef.clear()
      this.viewContainerRef.createComponent(compFactory);
    }
  }

  componentByStep(step: string){
    let componentType: any;
    switch (step) {
      case '': {
        componentType = RegistrationComponent;
        break;
      }
      case Tour.STEP_ONE: {
        componentType = PointComponent;
        break;
      }
      case Tour.STEP_TWO: {
        componentType = PointComponent;
        break;
      }
      case Tour.STEP_THREE: {
        componentType = StepComponent;
        break;
      }
      case Tour.STEP_FOUR: {
        componentType = PointComponent;
        break;
      }
      case Tour.STEP_FIVE: {
        componentType = StepComponent;
        break;
      }
      case Tour.STEP_SIX: {
        componentType = BadgeComponent;
        break;
      }
      case Tour.STEP_SEVEN: {
        componentType = TipComponent;
        break;
      }
      case Tour.STEP_EIGHT: {
        componentType = StepComponent;
        break;
      }
      case Tour.STEP_NINE: {
        componentType = PointComponent;
        break;
      }
      case Tour.STEP_TEN: {
        componentType = TipComponent;
        break;
      }
      case Tour.STEP_ELEVEN: {
        componentType = StepComponent;
        break;
      }
      case Tour.STEP_TWELVE: {
        componentType = BadgeComponent;
        break;
      }
      case Tour.STEP_THIRTEEN: {
        componentType = StepComponent;
        break;
      } 
    }
    return componentType;
  }

}