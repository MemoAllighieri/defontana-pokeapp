import { IPokedex } from "../interfaces/IPokemon";

export class Pokedex implements IPokedex {
    abilities!: any[];
    base_experience!:number;
    forms!:any[];
    game_indices!:any[];
    height!:number;
    held_items!:any[];
    id!:number;
    is_default!: boolean;
    location_area_encounters!:string;
    moves!:any[];
    name!:string;
    order!:number;
    past_types!:any[];
    species!:any[];
    sprites!:Sprites;
    stats!:any[];
    types!:any[];
    weight!:number;
    // constructor(){
    //     this.abilities = [];
    //     this.base_experience = 0;
    //     this.forms = [];
    //     this.game_indices = [];
    //     this.height = 0;
    //     this.held_items = [];
    //     this.is_default = false;
    //     this.location_area_encounters = "";
    //     this.moves = [];
    //     this.name = "";
    //     this.order = 0;
    //     this.past_types = [];
    //     this.species = [];
    //     this.stats = [];
    //     this.types = [];
    //     this.weight = 0;
    // }
}
export interface Sprites {
    back_default:       string;
    back_female:        string;
    back_shiny:         string;
    back_shiny_female:  string;
    front_default:      string;
    front_female:       string;
    front_shiny:        string;
    front_shiny_female: string;
    other?:             Other;
    versions?:          any;
    animated?:          Sprites;
  }
  export interface Other {
    dream_world:        any;
    home:               any;
    'official-artwork': OfficialArtwork;
  }
  export interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
  }