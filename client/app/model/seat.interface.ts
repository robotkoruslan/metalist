import {Match} from "./match.interface";

export interface Seat {
  _id: string;
  seat: number,
  price?: number,
  row: number,
  sector: string,
  slug: string,
  match: Match,
  reservedUntil: string,
  tribune?: string
}
