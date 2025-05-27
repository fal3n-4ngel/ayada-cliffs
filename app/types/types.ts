export interface Accommodation {
  id: number|string;
  name: string;
  description: string;
  image: string;
  price?: string;
}

export interface Destination {
  id: number;
  name: string;
  image: string;
  description: string;
}
