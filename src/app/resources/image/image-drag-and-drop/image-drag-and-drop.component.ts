import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
             selector: 'app-image-drag-and-drop',
             templateUrl: './image-drag-and-drop.component.html',
             styleUrls: ['./image-drag-and-drop.component.scss'],
           })
export class ImageDragAndDropComponent implements OnInit {

  @Output() bundleEmitter = new EventEmitter<any[]>()

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  filesUploaded(files: any[]) {
    this.bundleEmitter.emit(files)
  }
}
