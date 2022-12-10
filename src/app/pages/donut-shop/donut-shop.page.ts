import { Component, OnInit } from '@angular/core';
import { DonutShop } from 'src/app/models/donut-shop';
import { DonutShopService } from 'src/app/services/donut-shop.service';

@Component({
  selector: 'app-donut-shop',
  templateUrl: './donut-shop.page.html',
  styleUrls: ['./donut-shop.page.scss'],
})
export class DonutShopPage implements OnInit {
  id: string = "0";
  currentDonutShop: DonutShop = new DonutShop();
  
  constructor(private donutShopService: DonutShopService) { }

  ngOnInit(): void {
    const randomDonutShop = Math.floor(Math.random() * 12) + 1;
    const randomDonutShopId = randomDonutShop.toString();
    this.id = randomDonutShopId;

    this.donutShopService.getDonutShopById(this.id).subscribe(foundDonutShop => {
      this.currentDonutShop = foundDonutShop;
      console.log(this.currentDonutShop.donutShopWebsite)
    })
  }
  
}

