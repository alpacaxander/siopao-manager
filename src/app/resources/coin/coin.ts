import { Product } from '../product/product'

export class Coin {
  type: 'coin';
  id: string;

  attributes: {
    status: string;
    location: string;
    condition: string;
    craigslistLink: string;
    facebookLink: string;
  };

  relationships: {
    product: {
      data: Product
    }
  };


}
