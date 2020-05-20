import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemPageRoutingModule } from './item-routing.module';

import { ItemPage } from './item.page';
import { HttpClientModule } from '@angular/common/http';
import { Camera} from '@ionic-native/camera/ngx';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ItemPage],
  providers:[ Camera]
})
export class ItemPageModule {}
