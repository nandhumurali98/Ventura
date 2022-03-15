import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from './../../_services/order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/_models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders?:Order[];
  currentOrder:Order={
    name:'',
    address:'',
    total_price:0
  };
  currentIndex=-1;
  constructor(private orderService:OrderService,
              private route:ActivatedRoute) { }

  ngOnInit():void{
    this.getOrder(this.route.snapshot.params.id);
  }
  getOrder(id:string):void{
    this.orderService.get(id)
      .subscribe(
          data => {
            this.currentOrder = data;
            console.log(data);
          },
          error => {
            console.log(error);
          });
  }
  deleteOrder():void{
    this.orderService.delete(this.currentOrder.id)
      .subscribe(
        response=>{
          console.log(response);
        },
        error=>{
          console.log(error);
        });
  }

}
