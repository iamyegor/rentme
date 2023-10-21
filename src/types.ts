export type Car = {
  id: string;
  make: string;
  model: string;
  color: string;
  year: number;
  minutePriceCents: number;
  imageUrl: string;
  location: Location;
  category: Category;
};

export type Location = {
  country: string;
  city: string;
};

export type ErrorWithStatus = {
  status: number;
  message: string;
};

export enum PayFor {
  Hour = "hour",
  Minute = "min",
}

export enum Category {
  Economy = "economy",
  Comfort = "comfort",
  Premium = "premium",
}

export type SearchParam = {
  key: string;
  value: string;
};

export type LowHighPrices = {
  low: number;
  high: number;
}
