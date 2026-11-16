import { inject, Service, signal } from '@angular/core';
import { Game } from '../application/models/game';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const URL ="http://localhost:3000/games";

@Service()
export class GameService {
    private readonly _games = signal<Game[]>([]);
    games =this._games.asReadonly();
    private readonly _http =inject(HttpClient);

    getGame (): Observable <Game[]>{
        return this._http.get<Game[]>(URL).pipe(
            tap(allGames => this._games.set(allGames))
        );
    }

    addGame (g : Game): Observable <Game>{
        return this._http.post<Game>(URL,g).pipe(
            tap(
                gameAdded => this._games.update(jeux =>[...jeux,gameAdded])
            )
        );
    }
}
