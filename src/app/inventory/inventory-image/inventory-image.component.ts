import { Component, OnInit } from '@angular/core'
import { ImageService } from '../../services/image.service'
import { Image } from '../../resources/image/image'

@Component({
             selector: 'app-inventory-image',
             templateUrl: './inventory-image.component.html',
             styleUrls: ['./inventory-image.component.scss'],
           })
export class InventoryImageComponent implements OnInit {

  images: Image[]

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    console.log('safd')
    this.imageService.images$.subscribe(
      (images) => {
        console.log(images)
        this.images = images
      },
    )
  }

}
