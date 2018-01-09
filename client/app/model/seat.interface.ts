import {Match} from "./match.interface";

export interface Seat {
  seat: number,
  price?: number,
  sector: string,
  slug: string,
  match: Match
}