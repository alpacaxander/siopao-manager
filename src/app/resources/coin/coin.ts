import { Product } from '../product/product'
import { Image } from '../image/image'

export class Coin {
  type: 'coin'
  id: string

  attributes: {
    status: string
    location: string
    condition: string
    craigslistLink: string
    facebookLink: string
  }

  relationships: {
    product: {
      links: {
        self: string
        related: string
      }
      data: Product
    }
    images: {
      links: {
        self: string
        related: string
      }
      data: Image[]
    }
  }

  links: {
    self: string
  }

}
