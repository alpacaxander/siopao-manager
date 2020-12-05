import { Coin } from '../coin/coin'

export interface Product {
  type: 'product'
  id: string

  attributes: {
    name: string
    description: string
    currency: string
    nation: string
    era: string
    denomination: number
    unit: string
  }

  relationships: {
    coins: {
      links: {
        self: string
        related: string
      }
      data: Coin[]
    }
  }

  links: {
    self: string
  }
}
