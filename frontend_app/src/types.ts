// src/types.ts

// Possíveis regiões (Type Alias)
export type Region = "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";

// Alternativa com Enum
export enum RegionEnum {
  Africa = "Africa",
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

// Estrutura dos flags retornados pela API
export interface IFlags {
  png: string;
  svg: string;
  alt?: string;
}

// Estrutura principal do país
export interface ICountry {
  name: {
    common: string;
    official: string;
  };
  region: Region;
  capital?: string[];
  population: number;
  flags: IFlags;
}
