import { AfterViewInit, Component, ElementRef, Inject, OnInit, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  
  
  
  title = 'hotelinventoryapp';
  role:string='Admin';
  //role:string='User';
  //role:string='Users';


  @ViewChild('name',{static:true})name!:ElementRef;

  constructor(@Optional() private loggerSerrvice:LoggerService,
  @Inject(localStorageToken)private localStorage:any,
  private initService:InitService,
  private configService:ConfigService,
  private router:Router,
  ){
    console.log(initService.config);
  }
  ngOnInit(): void {
      // this.router.events.subscribe((event)=>{
      //   console.log(event);
      // });


      this.router.events.pipe(
        filter((event)=>event instanceof NavigationStart)
      ).subscribe((event)=>{
        console.log("Navigation Started");
      });

      this.router.events.pipe(
        filter((event)=>event instanceof NavigationEnd)
      ).subscribe((event)=>{
        console.log("Navigation Completed");
      });

      this.loggerSerrvice?.log('AppComponent.ngOnInit()');
      this.name.nativeElement.innerText="Khans Hotel";
      this.localStorage.setItem('name','Emran');
  }

  // @ViewChild('user',{read:ViewContainerRef})vcr!:ViewContainerRef;

  // ngAfterViewInit(): void {
  //   const componentRef=this.vcr.createComponent(RoomsComponent);
  //   componentRef.instance.numberOfRooms=200;
  // }


  
}
