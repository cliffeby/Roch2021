import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Match } from 'src/app/models/match';
import { MatchesService } from 'src/app/services/matches.service';

@Injectable({
  providedIn: 'root'
})
export class MatchResolver implements Resolve<Match[]> {
  constructor(private _matchesService: MatchesService, private router : Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Match[]> {
    return this._matchesService.getMatches().pipe(
      catchError(()=>{
        this.router.navigate(['matches']);
        return EMPTY;
      }))
  }
}


