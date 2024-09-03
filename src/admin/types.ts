// types.ts
export interface Coordinates {
  lat: string;
  lng: string;
}

export interface FormData {
  name: string;
  category: string;
  coordinates: Coordinates;
  rating: number;
}
