export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
};

export type ErrorWithStatus = {
  status: number;
  message: string;
};