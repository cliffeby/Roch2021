import { Component, Input, OnInit } from '@angular/core';
import { FormArray, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
// import { from, of, Subscription } from 'rxjs';
// import { filter, map } from 'rxjs/operators';
import { Match } from 'src/app/models/match';
import { Results } from 'src/app/models/results';
import { Score } from 'src/app/models/score';
import { Scorecard } from 'src/app/models/scorecard';
import { ScorecardsService } from 'src/app/services/scorecards.service';
import { ScoresService } from 'src/app/services/scores.service';

@Component({
  selector: 'app-results-mat-adjust',
  templateUrl: './results-mat-adjust.component.html',
  styleUrls: ['./results-mat-adjust.component.css'],
})
export class ResultsMatAdjustComponent implements OnInit {
  // subscription: Subscription;
  public scores:Score[] = [];
  public scorecard: Scorecard;
  dataSource: MatTableDataSource<Score[]>;
  paginator: any;
  @Input() public match: Match;
  results: Results[] = [new Results()];
  frontTot:number[] = [];
  backTot:number[] = [];
  resultsForm: UntypedFormGroup;
  arr: UntypedFormArray = new FormArray([]);;
  constructor(
    private fb: UntypedFormBuilder,
    private _scoresService: ScoresService,
    private _scorecardsService: ScorecardsService
  ) {}

  ngOnInit(): void {
    this._scoresService
      .getScoresByMatch(this.match._id)
      .subscribe(
        (data) => {
          this.scores = data;
          this.resultsForm = this.fb.group({
            arr: this.fb.array([]),
          });
          this.createDataSource(this.scores);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  loadItem(player:any, i:number) {
    let name_Index = player.name + '-' + player.usgaIndex.toString();
    console.log('loadItem', player);
    return this.fb.group({
      name: new UntypedFormControl({ value: name_Index, disabled: true }),
      // front: new FormControl({ value: this.frontTot, disabled: true }),
      // back: new FormControl({ value: this.backTot, disabled: true }),
      score: player.score,
      scores: new UntypedFormArray(this.loadScoreControls(player, i)),
    });
  }
  loadScoreControls(person:any, i:number) {
    let y = [];
    let s:string = "";
        this.frontTot[i] = this.backTot[i] = 0;
    for (let ii = 0; ii < 18; ii++) {
      if (person.hasOwnProperty('scores')) {
        y.push(new UntypedFormControl({ value: person.scores[ii], disabled: true }));
        if (ii < 9) {
          this.frontTot[i] = this.frontTot[i] + person.scores[ii];
        } else {
          this.backTot[i] = this.backTot[i] + person.scores[ii];
        }
      } else {
        y.push(new UntypedFormControl({ value: null, disabled: true }));
      }
    }
    console.log('loadScoreControls', y, person);
    return y;
  }
  createDataSource(scores:any) {
    console.log('scores', scores);
    for (let i = 0; i < scores.length; i++) {
      this._scorecardsService
        .getScorecard(scores[i].scorecardId)
        .subscribe((data) => {
          this.scorecard = data;
          this.results[i] = new Results();
          this.results[i].scores = scores[i].scores;
          this.results[i]._id = scores[i].playerId;
          this.results[i].name = scores[i].name;
          this.results[i].score = scores[i].score;
          this.results[i].course = data.scorecard.courseTeeName;
          this.results[i].rating = data.scorecard.rating;
          this.results[i].slope = data.scorecard.slope;
          this.results[i].pars = [];
          this.results[i].pars = stringToNumArray(
            data.scorecard.parInputString
          );
          this.results[i].handicaps = [];
          this.results[i].handicaps = stringToNumArray(
            data.scorecard.hCapInputString
          );
          this.results[i].usgaIndex = scores[i].usgaIndex;
          this.results[i].handicap = scores[i].handicap;
          console.log('createDataSource', this.results[i]);
          this.arr = this.resultsForm.get('arr') as UntypedFormArray;
          this.arr.push(this.loadItem(this.results[i], i));
          // this.loadItem(this.results[i], i);
        });
    }

    // this.dataSource = new MatTableDataSource<Score[]>(data);
  }
  scores1(index: number): UntypedFormArray {
    return this.arr.at(index).get('scores') as UntypedFormArray;
  }
  onClose() {
    this.resultsForm.reset();
  }
}
function stringToNumArray(aString: any) {
  let aNumArray = [];
  let bb = aString.split(',');
  for (let i = 0; i < bb.length; i++) {
    aNumArray.push(Number(bb[i]));
  }
  return aNumArray;
}
