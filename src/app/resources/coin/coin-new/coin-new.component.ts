import { Coin } from './../coin'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { InventoryService } from '../../../services/inventory.service'
import { Product } from '../../product/product'
import { Image } from '../../image/image'

@Component({
             selector: 'app-coin-new',
             templateUrl: './coin-new.component.html',
             styleUrls: ['./coin-new.component.scss'],
           })
export class CoinNewComponent implements OnInit {

  public closeResult = ''

  public bundles: Image[][] = []

  @Input()
  public product: Product

  @Output()
  public onCreate: EventEmitter<void> = new EventEmitter<void>()

  public coin: Coin

  constructor(
    private inventoryService: InventoryService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.reset()
  }

  open(content): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC'
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop'
    } else {
      return `with: ${reason}`
    }
  }

  private send(): void {
    for (let bundle of this.bundles) {
      this.inventoryService.create(this.coin).then(
        (coin: Coin) => {
          for (const image of bundle) {
            image.relationships = {
              // @ts-ignore
              coin: {
                data: coin
              }
            }
            this.inventoryService.create(image).then()
          }
          this.reset()
          this.onCreate.emit()
        }
      )
    }
  }

  private reset(): void {
    // @ts-ignore
    this.coin = {
      type: 'coin',
      id: '',
      attributes: {
        status: '',
        location: '',
        condition: '',
        craigslistLink: '',
        facebookLink: '',
      },
      relationships: {
        // @ts-ignore
        images: {
          data: []
        },
        // @ts-ignore
        product: {
          data: this.product
        }
      }
    }
  }

}
