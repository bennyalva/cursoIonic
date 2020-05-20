import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemsService } from '../services/items.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  items: Item[] = [];

  constructor(private itemsService: ItemsService, private router: Router) {
  }

  ionViewWillEnter() {
    this.itemsService.setIsloading(true);
    this.itemsService.getItems().subscribe(res => {
      console.log('>>> RES CONSULTA', res);
      this.items = res;
      this.itemsService.setIsloading(false);
    }, err => {
      this.itemsService.setIsloading(false);
      alert(err);
    });
  }

  ngOnInit() {
  }

  new() {
    this.itemsService.currentItem = null;
    this.router.navigate(['item']);
  }

  edit(item: Item) {
    this.itemsService.currentItem = item;
    // this.router.navigate(['item']);
    this.router.navigateByUrl('/item?id=' + item._id);
  }
}
