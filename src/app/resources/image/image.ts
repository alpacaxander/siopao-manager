export interface Image {
  type: 'image';
  id: string;
  attributes: {
    index: number;
    name: string;
    data: string;
  };
}
