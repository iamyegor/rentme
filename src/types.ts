export type Car = {
  id: string;
  make: string;
  model: string;
  color: string;
  year: number;
  minutePriceCents: number;
  imageUrl: string;
  location: Location;
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

export type SearchParam = {
  key: string;
  value: string;
};
