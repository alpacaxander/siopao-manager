export interface Image {
  type: 'image';
  id: string;
  attributes: {
    name: string;
    data: string;
  };
}
