import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Score } from 'src/app/models/score';
import { forkJoin, Subscription } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { ScoresService } from 'src/app/services/scores.service';
import { Match } from 'src/app/models/match';
import { map } from 'rxjs/operators';
import { MatchesService } from 'src/app/services/matches.service';

@Component({
  selector: 'app-member-block',
  templateUrl: './member-block.component.html',
  styleUrls: ['./member-block.component.css'],
})
export class MemberBlockComponent implements OnInit, OnDestroy {
  private subscription1: Subscription;
  private subscription2: Subscription;
  @Output() public updatewhoisplaying = new EventEmitter();
  public members: Member[];
  public scores: any[] = [];
  @Output() public pairings: any[] = [];
  queryString: String;
  @Input() public match: Match; // Model Match contains populated scorecard which is not valid
  score: Score = new Score();
  players: number = 0;

  constructor(
    private _membersService: MembersService,
    private _scoresService: ScoresService,
    private _matchesService: MatchesService
  ) {
    this.players = 0;
  }

  // This component uses a Score record to determine if a Member is playing.
  //  If the Member is playing, the score record is created.
  //  If the Member is not playing, the score record is deleted.

  ngOnInit(): void {
    this.queryString = '';
    if (this.match._id) {
      //Merge the Member and Scores collections for the match into a new Members collection
      //Since Scores are added last, its _id overrides the Member._id.
      //Use the duplicate Member.id property for Members
      //Use the Member._id property for Scores.
      this.subscription1 = forkJoin({
        members: this._membersService.getMembers(), //Get all members
        scores: this._scoresService.getScoresByMatch(this.match._id), //Get only Scores for this match
      })
        .pipe(
          map((response) => {
            const members = <Array<Member>>response.members;
            const scores = <Array<Score>>response.scores;
            const memberBlock: any[] = [];
            members.map((member: any) => {
              memberBlock.push({
                //Where member and score are related, merge properties
                ...member,
                ...scores.find((score: any) => score.memberId === member._id),
              });
            });
            return memberBlock;
          })
        )
        .subscribe((data) => {
          console.log('this.members', data);
          this.members = data;
          this.whosPlaying();
        });
    }
  }
  // Count the number of players in the match.  Name property only exists in Scores collection
  // So if the merged Memeber collection has a name property, member is playing.
  whosPlaying() {
    (this.members as any[]).forEach((member) => {
      member.scorecard = {};
    });
    for (let j = 0; j < this.members.length; j++) {
      this.members[j].scorecard = this.whichTees(this.members[j]);
      if (this.members[j].hasOwnProperty('name')) {
        this.members[j].isPlaying = true;
        this.players++;
        this.pairings.push(this.members[j]);
        this.sendEmployeeDetail(this.pairings);
        console.log('Member', this.members[j], this.pairings);
      }
    }
    this.updatewhoisplaying.emit(this.pairings);
  }
  sendEmployeeDetail(member) {
    this._matchesService.sendEmployeeDetail(member);
  }

  playerinMatch(member) {
    member.isPlaying = !member.isPlaying;
    if (member.isPlaying) {
      (member as any).scorecard = {};

      //Create a new Score record
      this.players++;
      this.score.matchId = this.match._id;
      this.score.memberId = member.id;
      this.score.usgaIndex = member.usgaIndex;
      // Course handicap = Handicap Index X Slope Rating/113 + (Course Rating-Par) divided by 113

      this.score.user = '**' + this.match.user;
      member.scorecard = this.whichTees(member);
      this.score.coursePlayerHandicap = Math.round(
        (member.usgaIndex * member.scorecard.slope) / 113 +
        (member.scorecard.rating - 72) );
      this.score.name =
        this.match.name + ' ' + member.firstName + ' ' + member.lastName;
      console.log('score', this.score, member);
      this.pairings.push(member);
      this.updatewhoisplaying.emit(this.pairings);
      this.sendEmployeeDetail(this.pairings);
      console.log('score', this.score, member);
      this.subscription2 = this._scoresService
        .createScore(this.score)
        .subscribe();
    } else {
      this.players--;
      this.subscription2 = this._scoresService
        .deleteScore(member._id)
        .subscribe(); //Actually the original score _id

      for (let i = 0; i < this.pairings.length; i++) {
        if (this.pairings[i]._id === member._id) {
          this.pairings.splice(i, 1);
        }
      }
      this.updatewhoisplaying.emit(this.pairings);
      this.sendEmployeeDetail(this.pairings);
    }
  }

  whichTees(member) {
    for (let i = 0; i < member.scorecards.length; i++) {
      if (member.scorecards[i].groupName === this.match.scorecard.groupName) {
        
        console.log('whichTees', i, member.scorecards[i]);
        console.log('whichTees', member.scorecards[i].name);
        return member.scorecards[i];
      }
    }
    return { name: 'No Course' };
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();
    // this.subscription3.unsubscribe();
  }
}
