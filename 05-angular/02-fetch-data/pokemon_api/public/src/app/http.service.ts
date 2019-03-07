import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private _http: HttpClientModule) {
    this.getPokemon();
  }
  getPokemon() {
    const pikachu = this._http.get('https://pokeapi.co/api/v2/pokemon/25/');
    pikachu.subscribe(data => {
      //console.log(data);
      console.log(
        `${data['name']}'s abilities are ${
          data['abilities'][0].ability.name
        } and ${data['abilities'][1].ability.name}.`
      );
      const ability = this._http.get(data['abilities'][0].ability.url);
      ability.subscribe(ability => {
        // console.log(ability);
        console.log(`There are ${ability['pokemon'].length} pokemon with the ability ${ability['name']}.`);
      });
    });
  }
}

