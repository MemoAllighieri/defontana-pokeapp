export interface IPokemon {
  count: number;
  next?:string;
  previous?:string;
  results:IPokemonList[];
}
export interface IPokemonList{
    name:string;
    url:string;
}
export interface IPokedex{
  abilities: any[];
  base_experience:number;
  forms:any[];
  game_indices:any[];
  height:number;
  held_items:any[];
  id:number;
  is_default: boolean;
  location_area_encounters:string;
  moves:any[];
  name:string;
  order:number;
  past_types:any[];
  species:any[];
  sprites:ISprites;
  stats:any[];
  types:any[];
  weight:number;
}
export interface ISprites {
  back_default:       string;
  back_female:        string;
  back_shiny:         string;
  back_shiny_female:  string;
  front_default:      string;
  front_female:       string;
  front_shiny:        string;
  front_shiny_female: string;
  other?:             IOther;
  versions?:          any;
  animated?:          ISprites;
}
export interface IOther {
  dream_world:        any;
  home:               any;
  'official-artwork': IOfficialArtwork;
}
export interface IOfficialArtwork {
  front_default: string;
  front_shiny:   string;
}