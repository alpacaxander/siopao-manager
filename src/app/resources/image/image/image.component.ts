import { Component, Input, OnInit } from '@angular/core'
import { ImageService } from '../../../services/image.service'
import { Image } from '../image'

@Component({
             selector: 'app-image',
             templateUrl: './image.component.html',
             styleUrls: ['./image.component.scss'],
           })
export class ImageComponent implements OnInit {

  @Input()
  image: Image

  constructor(private imageService: ImageService) { }

  ngOnInit(): void { }

}
