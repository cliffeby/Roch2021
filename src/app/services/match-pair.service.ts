import { Injectable } from '@angular/core';
import { Member, Team, LineUps } from 'src/app/models/member';
@Injectable({
  providedIn: 'root',
})
export class MatchPairService {
  APlayers: Member[];
  BPlayers: Member[];
  possibleTeams: Team[] = [];
  A: Member;
  B: Member;
  team: Team;

  constructor() {}

  async createRandomPairingswithCombinedIndex(rPlaying: Member[]) {
    const pairings: Team[] = [];
    const randomPlayers: Member[] = rPlaying.sort(() => Math.random() - 0.5);
    for (let j = 0; j < randomPlayers.length; j = j + 2) {
      this.A = { ...randomPlayers[j] };
      this.B = { ...randomPlayers[j + 1] };
      if (this.A.usgaIndex > this.B.usgaIndex) { //Make Player A the low handicap
        this.team = {
          playerA: this.B,
          playerB: this.A,
          combinedIndex: null,
        };
      } else {
        this.team = {
          playerA: this.A,
          playerB: this.B,
          combinedIndex: null,
        };
      }
      pairings.push(this.team);
    }
    for (let i = 0; i < pairings.length; i++) {  //Add combinedIndex property to Team
      let combinedIndex =
        pairings[i].playerA.usgaIndex + pairings[i].playerB.usgaIndex;
      pairings[i] = { ...pairings[i], combinedIndex };
    }
    return pairings;
  }

  async generateLineUps(rPlaying: Member[]) {
    let sd: number;
    let foursomeUSGAIndex: number[] = [];
    let combos: LineUps[] = [];
    let combo:Team[] = [];

    for (let i = 0; i < 100; i++) {
      combo = await this.createRandomPairingswithCombinedIndex(rPlaying);
      for (let j = 0; j < 4; j++) {
        if (combo[j]) {
          foursomeUSGAIndex.push(combo[j].combinedIndex);
        }
      }
      sd = this.standardDeviation(foursomeUSGAIndex);
      combos.push({ ...combo, lineUpSD: sd });
      foursomeUSGAIndex = [];
    }

    combos.sort((a, b) => (a.lineUpSD > b.lineUpSD ? 1 : -1));
    combos = this.removeItemsWithDuplicateSD(combos);
    combos = this.removeSDproperty(combos);
    // combos = this.addDummy4SomePlaceholders(combos);
    console.log('Combo', combos.slice(0, 4));
    return combos.slice(0, 4);
  }

  removeItemsWithDuplicateSD(items: LineUps[]) {
    for (let i = 1; i < items.length; i++) {
      if (items[i].lineUpSD === items[i - 1].lineUpSD) {
        items.splice(i--, 1);
      }
    }
    return items;
  }

  removeSDproperty(items: LineUps[]) {
    for (let i = 0; i < items.length; i++) {
      // if (Number.isNaN(items[i].lineUpSD)) {
        delete items[i]['lineUpSD'];
      // }
      
    }
    console.log('items', items.slice(0,4))
    return items;
  }

  addDummy4SomePlaceholders(items) {
    const keys = Object.keys(items[0]);
    if (keys.length % 2 == 0) return items;
    console.log('Size', keys, keys.length % 4, items[0]);
    if (keys.length % 2 == 1) {
      // let playerZ = items[0][0].playerA;
      let playerZ = new Member();
      // playerZ.fullName = 'Empty'
      console.log('playerZ', playerZ);
      items[0][3] = { ...items[0][3], playerA: [playerZ] };
    }
    return items;
  }
  standardDeviation(arr: number[]) {
    // Creating the mean with Array.reduce
    let mean =
      arr.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / arr.length;

    // Assigning (value - mean) ^ 2 to every array item
    arr = arr.map((k) => {
      return (k - mean) ** 2;
    });

    // Calculating the sum of updated array
    let sum = arr.reduce((acc, curr) => acc + curr, 0);

    // Calculating the variance
    //  let variance = sum / arr.length

    // Returning the Standered deviation
    return Math.sqrt(sum / arr.length);
  }
  regenerateLineUp(players) {
    const lineUp: any[] = [];
    for (let j = 0; j < players.length; j++) {
      this.A = { ...players[j][0] };
      this.B = { ...players[j][1] };
      if (this.A.usgaIndex > this.B.usgaIndex) {
        this.team = {
          playerA: this.B,
          playerB: this.A,
          // combinedIndex: j,
        };
      } else {
        this.team = {
          playerA: this.A,
          playerB: this.B,
          // combinedIndex: null,
        };
      }
      console.log('team', this.team, j, 'players', players);
      lineUp.push(this.team);
    }
    return lineUp;
  }
}
