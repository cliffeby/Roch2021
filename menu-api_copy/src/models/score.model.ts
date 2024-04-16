import mongoose, { Schema, Model, Document } from 'mongoose';

type ScoreDocument = Document & {
  name: string;
  score: number;
  scores: number[];
  scoresToPost: number[];
  scorecardId: string;
  scSlope: number;
  scRating: number;
  scPars: number[],
  scHCaps: number[],
  scName: string,
  lineupIds: string[];
  memberId: string;
  partnerIds: string[];
  foursomeIds: string[];
  postedScore: number;
  usgaIndex: number;
  usgaIndexForTodaysScore: number;
  handicap: number;
  wonTwoBall: Boolean;
  wonOneBall: Boolean;
  wonIndo: Boolean;
  isPaired: Boolean;
  isScored: Boolean;
  matchId: string;
  datePlayed: Date;
  user: string;
};

type ScoreInput = {
  name: ScoreDocument['name'];
  score: ScoreDocument['score'];
  scores: ScoreDocument['scores'];
  scoresToPost: ScoreDocument['scoresToPost'];
  scorecardId: ScoreDocument['scorecardId'];
  scSlope: ScoreDocument['scSlope'];
  scRating: ScoreDocument['scRating'];
  scPars: ScoreDocument['scPars'];
  scHCaps: ScoreDocument['scHCaps'];
  scName: ScoreDocument['scName'];
  lineupIds: ScoreDocument['lineupIds'];
  memberId: ScoreDocument['memberId'];
  partnerIds: ScoreDocument['partnerIds'];
  foursomeIds: ScoreDocument['foursomeIds'];
  postedScore: ScoreDocument['postedScore'];
  usgaIndex: ScoreDocument['usgaIndex'];
  usgaIndexForTodaysScore: ScoreDocument['usgaIndexForTodaysScore'];
  handicap: ScoreDocument['handicap'];
  wonTwoBall: ScoreDocument['wonTwoBall'];
  wonOneBall: ScoreDocument['wonOneBall'];
  wonIndo: ScoreDocument['wonIndo'];
  isPaired: ScoreDocument['isPaired'];
  isScored: ScoreDocument['isScored'];
  matchId: ScoreDocument['matchId'];
  datePlayed: ScoreDocument['datePlayed'];
  user: ScoreDocument['user'];
};

const ScoreSchema = new Schema(
  {
    name: String,
    score: Number,
    postedScore: Number,
    scores: [Number],
    scoresToPost: [Number],
    usgaIndex: Number,
    usgaIndexForTodaysScore: Number,
    handicap: Number,
    wonTwoBall: { type: Boolean, default: false },
    wonOneBall: { type: Boolean, default: false },
    wonIndo: { type: Boolean, default: false },
    isPaired: { type: Boolean, default: false },
    isScored: { type: Boolean, default: false },
    matchId: {
      type: Schema.Types.ObjectId,
      ref: 'Match',
    },
    memberId: {
      type: Schema.Types.ObjectId,
      ref: 'Member',
    },
    scorecardId: {
      type: Schema.Types.ObjectId,
      ref: 'Scorecard',
    },
    scSlope: Number,
    scRating: Number,
    scPars: [Number],
    scHCaps: [Number],
    scName: String,
    datePlayed: Date,
    foursomeIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    partnerIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Member',
      },
    ],
    user: {
      type: String,
    },
  },
  {
    collection: 'scores',
    timestamps: true,
  }
);

const Score: Model<ScoreDocument> = mongoose.model<ScoreDocument>(
  'Score',
  ScoreSchema
);
export { Score, ScoreInput, ScoreDocument };
