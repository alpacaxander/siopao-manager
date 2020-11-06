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
      links: {
        self: string,
        related: string
      },
      data: {
        type: 'product'
        id: string,
      }
    }
  };
  links: {
    self: string
  };
}
