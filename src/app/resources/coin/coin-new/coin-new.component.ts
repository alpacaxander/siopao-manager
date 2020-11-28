import { Coin } from './../coin'
import { Component, Input, OnInit } from '@angular/core'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { InventoryService } from '../../../services/inventory.service'
import { Product } from '../../product/product'
import { ImageService } from '../../../services/image.service'

@Component({
             selector: 'app-coin-new',
             templateUrl: './coin-new.component.html',
             styleUrls: ['./coin-new.component.scss'],
           })
export class CoinNewComponent implements OnInit {

  public closeResult = ''

  public bundles: File[][] = []

  @Input()
  public product: Product

  public coin: Coin

  constructor(
    private inventoryService: InventoryService,
    private imageService: ImageService,
    private modalService: NgbModal,
  ) {
    this.reset()
  }

  ngOnInit(): void {
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
    console.log(this.bundles)
    for (let bundle of this.bundles) {
      this.imageService.new.files$(bundle).forEach(
        (image$) => {
          image$.subscribe(
            (image) => {
              this.inventoryService.new.coin$(this.product, this.coin).subscribe()
            },
          )
        },
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
    }
  }

}
