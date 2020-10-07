import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../services/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})

export class InventoryComponent implements OnInit {

  constructor( private inventoryService: InventoryService) { }

  ngOnInit(): void {}

}
