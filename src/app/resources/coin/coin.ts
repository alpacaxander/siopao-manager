export interface Coin {
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
      data: {
        type: 'product'
        id: string,
      }
    }
  };
}
