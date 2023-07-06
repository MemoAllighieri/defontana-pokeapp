import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Pokedex } from '../../entities/classes/Pokemon';
import { IPokedex, IPokemonList } from '../../entities/interfaces/IPokemon';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  ListPokemon: IPokemonList[] = [];
  ListPokemonTMP: IPokemonList[] = [];
  filteredPokemonList: IPokemonList[] = [];

  page: number = 1;
  count: number = 0;
  totalPages: number = 0;
  tableSize: number = 10;

  PokemonDetails: IPokedex = new Pokedex();
  pokemonNameFilter: string = '';
  searchControl = new FormControl();
  filteredPokemonListView: boolean = true;

  typeColors: { [key: string]: string } = {
    normal: '#9ca3af', //'bg-gray-400',
    fire: '#dc2626', //'bg-red-600',
    water: '#3b82f6', //'bg-blue-500',
    electric: '#facc15', //'bg-yellow-400',
    grass: '#22c55e', //'bg-green-500',
    ice: '#bfdbfe', //'bg-blue-200',
    fighting: '#991b1b', //'bg-red-800',
    poison: '#a955f7', //'bg-purple-500',
    ground: '#854d0e', //'bg-yellow-800',
    flying: '#6365f1', //'bg-indigo-500',
    psychic: '#f472b5', //'bg-pink-400',
    bug: '#16a34a', //'bg-green-600',
    rock: '#4b5563', //'bg-gray-600',
    ghost: '#6b3fa8', //'bg-purple-800',
    dragon: '#3730a3', //'bg-indigo-800',
    dark: '#111827', //'bg-gray-900',
    steel: '#6b7280', //'bg-gray-500',
    fairy: '#db2777', //'bg-pink-600',
  };

  pokemonCountByLetter: { letter: string; count: number }[] = [];

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.GetAllPokemon();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        if (value == '') {
          this.filteredPokemonList = [];
          this.GetAllPokemon();
          return;
        }
        this.filteredPokemonList = this.ListPokemon.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 10);
      });
  }

  GetAllPokemon() {
    this.ListPokemon = [];
    this.ListPokemonTMP = [];
    this.pokeapiService.GetAllPokemon(100000, 0).subscribe((r) => {
      this.ListPokemon = r.results;
      this.changePages();
      this.calculatePokemonCountByLetter();
    });
  }

  calculatePokemonCountByLetter(): void {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.pokemonCountByLetter = [];

    for (let i = 0; i < alphabet.length; i++) {
      const letter = alphabet[i];
      const count = this.ListPokemon.filter((pokemon) =>
        pokemon.name.startsWith(letter)
      ).length;
      this.pokemonCountByLetter.push({ letter, count });
    }
  }

  Filter() {
    this.PokemonDetails = new Pokedex();
    this.ListPokemonTMP = this.ListPokemon.filter((elemento) => {
      return elemento.name.toLowerCase().includes(this.pokemonNameFilter);
    });
  }

  selectPokemon(name: string) {
    this.pokeapiService.GetPokemon(name).subscribe((r) => {
      this.PokemonDetails = r;
      let bg = document.body;
      const firstColor =
        this.typeColors[this.PokemonDetails.types[0].type.name];
      const secondColor =
        this.PokemonDetails.types.length > 1
          ? this.typeColors[this.PokemonDetails.types[1].type.name]
          : firstColor;
      bg.style.background = `linear-gradient(to right, ${firstColor}, ${secondColor})`;
    });
  }

  selectPokemonFilter(name: string) {
    this.filteredPokemonList = [];
    this.page = 1;
    this.searchControl.setValue(name);
    this.filteredPokemonListView = false;
    this.changePages();
  }

  onFocusFilterControl() {
    this.filteredPokemonListView = true;
  }

  changePages() {
    let templist = [];
    if (this.searchControl.value != '' && this.searchControl.value != null)
      templist = this.ListPokemon.filter((elemento) => {
        return elemento.name.toLowerCase().includes(this.searchControl.value);
      });
    else templist = this.ListPokemon;
    this.totalPages = Math.ceil(templist.length / this.tableSize);
    const offset = (this.page - 1) * this.tableSize;
    this.ListPokemonTMP = templist.slice(offset, offset + this.tableSize);
  }

  getStatByName(name: string): number {
    let stat = this.PokemonDetails.stats.find(
      (x) => x.stat.name == name
    ).base_stat;
    const statRescale = parseInt(stat) / 2;
    return statRescale;
  }

  getColorByType(type: string): string {
    const color = this.typeColors[type];
    return color;
  }

  changePage(page: number): void {
    this.page = page;
    this.changePages();
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.changePages();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.changePages();
    }
  }

  firstPage(): void {
    this.page = 1;
    this.changePages();
  }

  lastPage(): void {
    this.page = this.totalPages;
    this.changePages();
  }
}
