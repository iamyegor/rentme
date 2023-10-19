import fordFusionHybrid from "../../../assets/images/ford_fusion_hybrid.png";
import teslaS from "../../../assets/images/tesla_s.png";
import {Category} from "../../types.ts";

export default [
  {
    id: 1,
    make: "Ford",
    model: "Fusion Hybrid",
    year: 2020,
    color: "red",
    minutePriceCents: 45,
    imageUrl: fordFusionHybrid,
    location: {
      country: "Russia",
      city: "Moscow",
    },
    category: Category.Economy,
  },
  {
    id: 2,
    make: "Tesla",
    model: "S",
    year: 2019,
    color: "blue",
    minutePriceCents: 100,
    imageUrl: teslaS,
    location: {
      country: "USA",
      city: "New York",
    },
    category: Category.Premium,
  },
];
