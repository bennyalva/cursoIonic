import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  //endpoint = 'https://crudcrud.com/api/7a66a261c25b469cbc16c8ac9672a9db/items';
  endpoint = 'https://supermarket-rest.herokuapp.com/test/benny';
  items: Item[] = [];
  currentItem: Item;
  private isLoading: Subject<boolean> = new Subject<boolean>();
  constructor(private httpClient: HttpClient) { }
  setIsloading(loading: boolean){
    this.isLoading.next(loading);
  }

  getIsLoading(){
    return this.isLoading.asObservable();
  }
  saveItem(item: Item) {
    let itemForService = {
      title: item.title,
      quantity: item.quantity.toString(),
      image: item.image
    };
    return this.httpClient.post(this.endpoint, itemForService);
  }

  getItems() {
    return this.httpClient.get<[Item]>(this.endpoint);
  }

  getSingleItem(id: string) {
    return this.httpClient.get<Item>(this.endpoint + '/' + id);
  }

  updateItem(item: Item) {
    let itemForService = {
      title: item.title,
      quantity: item.quantity.toString(),
      image: item.image
    };
    return this.httpClient.put(this.endpoint + '/' + item._id, itemForService);
  }

  deleteItem(idItem: string){
   return this.httpClient.delete(this.endpoint + '/' + idItem);
  }
}
