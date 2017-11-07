import { Component, OnInit, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { AdDirective } from '../ad.directive';
import { AdItem } from '../ad-item';
import { AdComponent} from '../ad/ad.component';
import { AdService } from '../ad.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() ads: AdItem[];
  currentAddIndex = -1;
  @ViewChild(AdDirective) adHost: AdDirective;
  subscription: any;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef,
              private adService: AdService) {
  }

  ngAfterViewInit() {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAddIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
    (<AdComponent>componentRef.instance).directory = adItem.directory;
    (<AdComponent>componentRef.instance).slide = adItem.slide;
  }

  getAds() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }

  ngOnInit(): void {
    this.ads = this.adService.getAds();
    /*this.generateData();*/
    /*this.interval = setInterval(() => {
      this.generateData();
    }, 15000); */
  }

}
