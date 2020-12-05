import { Coin } from '../coin/coin'

export interface Image {
  type: 'image'
  id: string

  attributes: {
    index: number
    name: string
    data: string
  }

  relationships: {
    coin: {
      links: {
        self: string
        related: string
      }
      data: Coin
    }
  }

  links: {
    self: string
  }
}
