import { Component, Input, OnInit } from '@angular/core'

@Component({
             selector: 'app-image-icon',
             templateUrl: './image-icon.component.html',
             styleUrls: ['./image-icon.component.scss'],
           })
export class ImageIconComponent implements OnInit {

  @Input()
  data: string

  constructor() { }

  ngOnInit(): void {
  }

}
