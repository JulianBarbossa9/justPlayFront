import { CityInterface } from "./city.interface";
import { SportInteface } from "./sport.interface";

export interface GameInterface {
  // id?: string;
  name: string;
  description: string | null;
  startTime: Date | string;
  endTime: Date | string;
  createdAt: Date;
  updatedAt: Date;
  cityId: number;
  sportId: number
}

export interface GameShowAllInterface {
    // id?: number;
    name: string;
    description?: string | null;
    startTime: Date;
    endTime: Date;
    city: CityInterface;
    sport: SportInteface;
    createdAt?: Date;
    updatedAt?: Date;
}

