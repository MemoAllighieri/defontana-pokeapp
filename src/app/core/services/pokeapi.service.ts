import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemon, IPokedex } from 'src/app/core/entities/interfaces/IPokemon';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})

export class PokeapiService {
    constructor(private http: HttpClient) { }
    GetAllPokemon(limit:number, offset:number): Observable<IPokemon> {
      const uri = environment.pokeServices.concat("?limit=",limit.toString(),"&offset=",offset.toString());
      return this.http.get<IPokemon>(uri);
    }
    GetPokemon(name:string): Observable<IPokedex> {
      const uri = environment.pokeServices.concat("/",name);
      return this.http.get<IPokedex>(uri);
    }
}