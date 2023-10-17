export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  minutePriceCents: number;
  imageUrl: string;
};

export type ErrorWithStatus = {
  status: number;
  message: string;
};

export enum PayFor {
  Hour = "hour",
  Minute = "min",
}
