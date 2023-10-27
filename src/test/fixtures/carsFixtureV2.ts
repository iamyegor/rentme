import imagePlaceholder from "../../../assets/images/image_placeholder.jpg";
import { Car, Category } from "types";

const carsFixtureV2: Car[] = [
  {
    id: "1",
    make: "Ford",
    model: "Fusion Hybrid",
    year: 2020,
    color: "red",
    minutePriceCents: 45,
    imageUrl: imagePlaceholder,
    location: {
      country: "Russia",
      city: "Moscow",
    },
    category: Category.Economy,
  },
  {
    id: "2",
    make: "Tesla",
    model: "S",
    year: 2019,
    color: "blue",
    minutePriceCents: 110,
    imageUrl: imagePlaceholder,
    location: {
      country: "USA",
      city: "New York",
    },
    category: Category.Premium,
  },
  {
    id: "3",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    color: "black",
    minutePriceCents: 50,
    imageUrl: imagePlaceholder,
    location: {
      country: "USA",
      city: "Los Angeles",
    },
    category: Category.Economy,
  },
  {
    id: "4",
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    color: "black",
    minutePriceCents: 65,
    imageUrl: imagePlaceholder,
    location: {
      country: "United Kingdom",
      city: "London",
    },
    category: Category.Comfort,
  },
  {
    id: "5",
    make: "BMW",
    model: "X5",
    year: 2020,
    color: "black",
    minutePriceCents: 120,
    imageUrl: imagePlaceholder,
    location: {
      country: "Russia",
      city: "Moscow",
    },
    category: Category.Premium,
  },
  {
    id: "6",
    make: "Mercedes-Benz",
    model: "GLE Coupe",
    year: 2020,
    color: "black",
    minutePriceCents: 100,
    imageUrl: imagePlaceholder,
    location: {
      country: "Russia",
      city: "Moscow",
    },
    category: Category.Premium,
  },
  {
    id: "7",
    make: "Nissan",
    model: "Sentra",
    year: 2020,
    color: "black",
    minutePriceCents: 40,
    imageUrl: imagePlaceholder,
    location: {
      country: "United Kingdom",
      city: "London",
    },
    category: Category.Economy,
  },
];

export function getCarsFixture() {
  return carsFixtureV2.sort((a, b) => a.id.localeCompare(b.id));
}
