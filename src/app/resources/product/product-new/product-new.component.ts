import { Component, OnInit } from '@angular/core'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { InventoryService } from '../../../services/inventory.service'
import { Product } from '../product'

@Component({
             selector: 'app-product-new',
             templateUrl: './product-new.component.html',
             styleUrls: ['./product-new.component.scss'],
           })
export class ProductNewComponent implements OnInit {

  public closeResult = ''

  public product: Product

  constructor(
    private inventoryService: InventoryService,
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
    this.inventoryService.product(this.product).create$().subscribe(() => {
      this.reset()
    })
  }

  private reset(): void {
    // @ts-ignore
    this.product = {
      attributes: {
        name: '',
        description: '',
        currency: '',
        nation: '',
        era: '',
        denomination: 0,
        unit: '',
      },
      id: '',
      type: 'product',
    }
  }
}
