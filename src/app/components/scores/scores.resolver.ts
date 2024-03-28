import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Score } from 'src/app/models/score';
import { ScoresService } from 'src/app/services/scores.service';

@Injectable({
  providedIn: 'root'
})
export class ScoresResolver  {
  constructor(private _scoresesService: ScoresService, private router : Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Score[]> {
    return this._scoresesService.getScores().pipe(
      catchError(()=>{
        this.router.navigate(['scores']);
        return EMPTY;
      }))
  }
}


