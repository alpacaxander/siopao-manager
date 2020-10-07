import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../services/inventory.service';
import {Coin} from '../resources/coin';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {


  constructor( private coinService: InventoryService) { }

  ngOnInit(): void {}

}
