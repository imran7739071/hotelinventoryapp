import { AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms';
import { HeaderComponent } from '../header/header.component';
import { RoomsService } from './services/rooms.service';
import { Observable, Subject, Subscription, catchError, map, observable, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import { ConfigService } from '../services/config.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit,DoCheck,AfterViewInit{

  hotelName:String="Imri";
  numberOfRooms:number=30;

  hideRooms:boolean=true;
  selectedRoom!:RoomList;

  rooms:Room={
    totalRooms:20,
    availableRooms:15,
    bookedRooms:5
  }
  roomList:RoomList[]=[];
  title:string='Room List';

  stream=new Observable(observer=>{
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.next('user4');
    observer.complete();
    observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!:HeaderComponent;
  
  @ViewChildren(HeaderComponent)headerChildrenComponent!:QueryList<HeaderComponent>;

  //roosService=new RoomsService()//New instance of class

  totalBytes=0;

  subscription!:Subscription;

  error$=new Subject<string>();
  getError$=this.error$.asObservable();

  rooms$=this.roomsService.getRooms$.pipe(
    catchError((err)=>{
      //console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  priceFilter= new FormControl(0);
  
  roomsCount$=this.roomsService.getRooms$.pipe(
    map((rooms)=>rooms.length)
  );


  constructor(@SkipSelf() private roomsService:RoomsService,private configService:ConfigService) { }
  

  ngOnInit(): void {
    this.roomsService.getPhotos().subscribe((event)=>{
      switch(event.type){
        case HttpEventType.Sent:{
          console.log('Request has been made');
          break;
        }
        case HttpEventType.ResponseHeader:{
          console.log('Request Success!');
          break;
        }
        case HttpEventType.DownloadProgress:{
          this.totalBytes+=event.loaded;
          break;
        }
        case HttpEventType.Response:{
          console.log(event.body);
          break;
        }
      }
    })

    this.stream.subscribe({
      next:(value)=>console.log(value),
      complete:()=>console.log('complete'),
      error:(err)=>console.log(err)

    });
    this.stream.subscribe((data)=>console.log(data));
    //this.roomList=this.roomsServic.getRooms(); 

    // this.roomsService.getRooms$.subscribe(rooms=>{
    //   this.roomList=rooms;
    // });

    

  }
  ngDoCheck(): void {
    console.log('ng doCheck is called');
  }

  ngAfterViewInit(): void {
    //console.log(this.headerComponent);
    this.headerComponent.title='Rooms View';

    this.headerChildrenComponent.last.title='Last Title';

  }
  
  toggle(){
    this.hideRooms=!this.hideRooms;
    this.title='Rooms List';
  }

  selectRoom(room:RoomList){
    this.selectedRoom=room;
    console.log(room);
  }
  addRoom():void {
    const room:RoomList={
      roomNumber:'4',
      roomType:'Delux Room',
      amenities:'Air conditioner, Free Wi-Fi, TV, Bathroom, kitchen',
      price:15000,
      photos:'https://www.istockphoto.com/photos/modern-hotel-room',
      checkinTime:new Date('07-11-2023'),
      checkoutTime:new Date('09-11-2023'),
      rating:4.0
    };
    //this.roomList.push(room);
    //this.roomList=[...this.roomList,room];

    this.roomsService.addRoom(room).subscribe((data)=>{
      this.roomList=data;
    });
  }

  editRoom() {
    const room:RoomList={
      roomNumber:'2',
      roomType:'Delux Room',
      amenities:'Air conditioner, Free Wi-Fi, TV, Bathroom, kitchen',
      price:12300,
      photos:'https://www.istockphoto.com/photos/modern-hotel-room',
      checkinTime:new Date('07-11-2023'),
      checkoutTime:new Date('09-11-2023'),
      rating:5,
    };

    this.roomsService.editRoom(room).subscribe((data)=>{
      this.roomList=data;
    });
    
  }
  deleteRoom(){
    this.roomsService.delete('2').subscribe((data)=>{
      this.roomList=data;
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
