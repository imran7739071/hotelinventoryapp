import { Component, OnInit } from '@angular/core';
import { RoomList } from '../rooms';
import { RoomsService } from '../services/rooms.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-rooms-add',
  templateUrl: './rooms-add.component.html',
  styleUrls: ['./rooms-add.component.css']
})
export class RoomsAddComponent implements OnInit {

  room:RoomList={
    //roomNumber?:string;
    roomType:'',
    amenities:'',
    price:0,
    photos:'',
    checkinTime: new Date(),
    checkoutTime: new Date(),
    rating:0
  };

  successMessage:string="";
  constructor(private roomsService:RoomsService) { }

  ngOnInit(): void {
  }

  // addRoom(roomsForm:NgForm){
  //   this.roomsService.addRoom(this.room).subscribe((data)=>{
  //     this.successMessage='Room Added Successfuly';
  //     roomsForm.reset();
  //   });
  // }

  addRoom(roomsForm:NgForm){
    this.roomsService.addRoom(this.room).subscribe((data)=>{
      this.successMessage='Room Added Successfuly';
      roomsForm.reset({
        roomType:'',
        amenities:'',
        price:0,
        photos:'',
        checkinTime: new Date(),
        checkoutTime: new Date(),
        rating:0
      });
      
    });
  }

}
