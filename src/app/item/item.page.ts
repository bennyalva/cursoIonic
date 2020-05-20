import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.model';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {
  formItem: FormGroup;
  id: string;
  dataImg: string;
  constructor(private fb: FormBuilder,
              private router: Router, private itemsService: ItemsService, 
              private route: ActivatedRoute, private camera: Camera) {
    this.formItem = this.fb.group({
      title: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });

    console.log('ITEM DE SERVICE', this.itemsService.currentItem);

    this.route.queryParams.subscribe(params => {
      console.log('QUERY PARAMS', params);
      if (params.id) {
        this.id = params.id;
        this.itemsService.getSingleItem(params.id).subscribe(item => {
          this.formItem.get('title').setValue(item.title);
          this.formItem.get('quantity').setValue(item.quantity);
          this.dataImg = item.image;
        });
      }
    });

    // if (this.itemsService.currentItem) {
    //   this.itemsService.getSingleItem(this.itemsService.currentItem._id).subscribe(item => {
    //     this.formItem.get('title').setValue(item.title);
    //     this.formItem.get('quantity').setValue(item.quantity);
    //   });
    // }
  }

  ngOnInit() {
  }

  save() {
    this.itemsService.setIsloading(true);
    let item = new Item();
    item.title = this.formItem.get('title').value;
    item.quantity = this.formItem.get('quantity').value;
    if(this.dataImg){
      item.image = this.dataImg;
    }
    if (this.id) {
      item._id = this.id;
      this.itemsService.updateItem(item).subscribe(res => {
        console.log('>>> RESULTADO UPDATE', res);
        this.router.navigate(['list']);
        this.itemsService.setIsloading(false);
      }, err => {
        console.log(err);
        alert('Ocurrió un error al actualizar el item');
        this.itemsService.setIsloading(false);
      });
    } else {
      this.itemsService.saveItem(item).subscribe(res => {
        console.log('>>> RESULTADO SAVE', res);
        this.router.navigate(['list']);
        this.itemsService.setIsloading(false);
      }, err => {
        console.log(err);
        alert('Ocurrió un error al guardar el item');
        this.itemsService.setIsloading(false);
      });
    }
  }

  delete(){
    this.itemsService.setIsloading(true);
    this.itemsService.deleteItem(this.id).subscribe(dataDelete =>{
      console.log('delete data:', dataDelete);
      this.itemsService.setIsloading(false);
      alert('se eliminó correctamente')
      this.router.navigate(['list']);
    }, err => {
      this.itemsService.setIsloading(true);
      console.log('error delete: ', err)
    });
  }

  addPhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
    //this.dataImg = 'data:image/jpeg;base64,' + imageData;
    this.dataImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAAHdElNRQfkBRQRMB8ZME7NAAABuklEQVRIx6XVv2vTQRzG8VfCN2nS1CgtGm3RwUVBXAQr2gqCW6VQoYM/BlEEl06K4KBL/wwHSyhYQRwK4qBCFSyipSgR4yClHRwUhFLQRpuUONgGKfGb5JtnOTg+9777PNxzR5uKbYw5mRZX/vRtE3DVuO1+twhIWXbHPS5aNCDe8tnjBi05z3tDutxwSRyBK65JghFjukIhZ7xjTY+7XvjsMm76YN44Rnzx0mQooMdaIKEsp6Aih16flPRirwWvDIQCyhJUZR3w2IQsdntk2j50mTTjSCggq/oXEFVZ1QDTKhEBAQEmlCIC0k613ULrF2iLGgNOO9Qe4JbD4QX1PYgZlUDMsv0SRmu53eJBfUDKlII0DvouplPBlFSzJvZ4qttJJfR7o2rVCRkzcs140GdOwZAVcNQc+OGsea/1NQasq+iozfd7W6vsULHejIndZjy3A0m/7ALbPDFrZ7MmJuUVdeq3ADKK8hvPTFMAGBYYMwUCw3VrGsY577owbcT5/3pmVkO1ncayRGRAQjmu6FhkwHEfuWDRQN2ohCtm0JJzgfs6PYzwtXVYcduDzZ33SLcIWPU1cuv/6g/ay3A3X3i0JAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wNS0yMFQxNzo0ODozMSswMDowMI2go4AAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDUtMjBUMTc6NDg6MzErMDA6MDD8/Rs8AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==';
     //console.log('data photo: ', imageData)
    }, (err) => {
     // Handle error
    });
  }
}
