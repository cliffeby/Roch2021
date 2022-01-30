import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatchPairService } from 'src/app/services/match-pair.service';
import { MatchLockService } from 'src/app/services/match-lock.service';
import { MatchesService } from 'src/app/services/matches.service';
import { Member, Team, LineUps } from 'src/app/models/member';
import { Match } from 'src/app/models/match';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-match-pair',
  templateUrl: './match-pair.component.html',
  styleUrls: ['./match-pair.component.css'],
})
export class MatchPairComponent implements OnInit {
  matchPairings: any;
  todaysLineUp = [];
  index = 0;
  lineUpLocked = false;
  @Output() public lockMatchEvent = new EventEmitter();
  @Input() public match: Match;

  constructor(
    public _matchesService: MatchesService,
    private _matchpairService: MatchPairService,
    private _matchlockService: MatchLockService,
    private _router: Router){
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
    return false;
  };
}

  ngOnInit(): void {
    this._matchesService.getShapedPlayers().subscribe((data) => {
      this.matchPairings = data;
    });
    this._matchpairService.generateLineUps(this.matchPairings).then((data) => {
      this.todaysLineUp = data;
    });
  }

  onSelect() {
    this.index++;
    console.log(this.index);
  }
  onLock() {
    this._matchlockService.lockLineUps(this.todaysLineUp[this.index]);
    this.match = { ...this.match, lineUps: this.todaysLineUp[this.index], status: 'locked' };
      this._matchesService
        .updateMatch(this.match)
        .subscribe((resUpdatedMatch) => (this.match = resUpdatedMatch));
    this.lockMatchEvent.emit(this.match);
    this.lineUpLocked = true;
  }
  onUnLock() {
    this.lineUpLocked = false;
    this._matchlockService.unLockLineUps(this.todaysLineUp[this.index]);
  }
}
