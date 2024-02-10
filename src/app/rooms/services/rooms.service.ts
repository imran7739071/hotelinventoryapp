import { Inject,Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from 'src/app/AppConfig/appConfig.service';
import { AppConfig } from '../../AppConfig/appConfig.interface';
import { HttpClient, HttpHandler, HttpHeaders, HttpRequest } from '@angular/common/http';
import { shareReplay } from 'rxjs';

//import{environment}from'../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  //   roomList:RoomList[]=[
  //   {
  //     roomNumber:1,
  //     roomType:'Deluxe Room',
  //     amenities:'Air conditioner, Free Wi-Fi, TV, Bathroom, kitchen',
  //     price:500,
  //     photos:'https://www.istockphoto.com/photos/modern-hotel-room',
  //     checkinTime:new Date('07-11-2023'),
  //     checkoutTime:new Date('09-11-2023'),
  //     rating:4.5
  //   },
  //   {
  //     roomNumber:2,
  //     roomType:'Deluxe Room',
  //     amenities:'Air conditioner, Free Wi-Fi, TV, Bathroom, kitchen',
  //     price:900,
  //     photos:'https://www.istockphoto.com/photos/modern-hotel-room',
  //     checkinTime:new Date('07-11-2023'),
  //     checkoutTime:new Date('09-11-2023'),
  //     rating:3.44585
  //   },
  //   {
  //     roomNumber:3,
  //     roomType:'Private Room',
  //     amenities:'Air conditioner, Free Wi-Fi, TV, Bathroom, kitchen',
  //     price:1500,
  //     photos:'https://www.istockphoto.com/photos/modern-hotel-room',
  //     checkinTime:new Date('07-11-2023'),
  //     checkoutTime:new Date('09-11-2023'),
  //     rating:2.9
  //   }
  // ]

  roomList:RoomList[]=[];

  //headers= new HttpHeaders({token: 'imran123@'}).append('token2','kamran123@#');

  // getRooms$=this.http.get<RoomList[]>('api/rooms',{headers:this.headers}).pipe(
  //   shareReplay(1)
  // );

  getRooms$=this.http.get<RoomList[]>('api/rooms').pipe(
    shareReplay(1)
  );

  constructor(@Inject(APP_SERVICE_CONFIG)private config:AppConfig,private http:HttpClient) { 
    console.log(config.apiEndpoint);
    console.log("Rooms Service initialized...");
  }

  getRooms(){
    return this.http.get<RoomList[]>('api/rooms');
  }
  addRoom(room:RoomList){
    return this.http.post<RoomList[]>('api/rooms',room);
  }

  editRoom(room:RoomList){
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`,room);
  }

  delete(id:string){
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }
  getPhotos(){
    const request=new HttpRequest('GET','https://jsonplaceholder.typicode.com/photos',{
      reportProgress:true,
    });

    return this.http.request(request);
  }

}
