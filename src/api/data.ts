import fordFusionHybrid from "../../assets/images/ford_fusion_hybrid.png";
import teslaS from "../../assets/images/tesla_s.png";
import toyotaPrius from "../../assets/images/toyota_prius.png";
import hondaAccord from "../../assets/images/honda_accord.png";
import rollsPhantom from "../../assets/images/rolls_phantom.png";

export const cars = [
  {
    id: 1,
    make: "Ford",
    model: "Fusion Hybrid",
    year: 2020,
    color: "red",
    minutePriceCents: 45,
    imageUrl: fordFusionHybrid,
  },
  {
    id: 2,
    make: "Tesla",
    model: "S",
    year: 2019,
    color: "blue",
    minutePriceCents: 100,
    imageUrl: teslaS,
  },
  {
    id: 3,
    make: "Toyota",
    model: "Prius",
    year: 2020,
    color: "white",
    minutePriceCents: 30,
    imageUrl: toyotaPrius,
  },
  {
    id: 4,
    make: "Honda",
    model: "Accord",
    year: 2020,
    color: "white",
    minutePriceCents: 30,
    imageUrl: hondaAccord,
  },
  {
    id: 5,
    make: "Rolls Royce",
    model: "Phantom",
    year: 2020,
    color: "white",
    minutePriceCents: 200,
    imageUrl: rollsPhantom,
  },
];