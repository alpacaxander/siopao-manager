import { Component, EventEmitter, OnInit, Output } from '@angular/core'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { InventoryService } from '../../../services/inventory.service'
import { Product } from '../product'
import { PrimaryData } from '../../../services/json-api-types/primary-data'

@Component({
             selector: 'app-product-new',
             templateUrl: './product-new.component.html',
             styleUrls: ['./product-new.component.scss'],
           })
export class ProductNewComponent implements OnInit {

  @Output()
  public onCreate: EventEmitter<Product> = new EventEmitter<Product>()

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
    this.inventoryService.create(this.product).then(
      (product: Product) => {
        this.onCreate.emit(product)
        this.reset()
      }
    )
  }

  private reset(): void {
    // @ts-ignore
    this.product = {
      type: 'product',
      id: '',
      attributes: {
        name: '',
        description: '',
        currency: '',
        nation: '',
        era: '',
        denomination: 0,
        unit: '',
      },
    }
  }
}
