import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Member } from 'src/app/models/member'
import { MembersService } from 'src/app/services/members.service';

@Injectable({
  providedIn: 'root'
})
export class IndexResolver  {
  constructor(private _membersService: MembersService, private router : Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Member[]> {
    return this._membersService.getMembers().pipe(
      catchError(()=>{
        this.router.navigate(['members']);
        return EMPTY;
      }))
  }
}


