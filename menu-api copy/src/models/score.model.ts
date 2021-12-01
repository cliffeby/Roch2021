import mongoose, { Schema, Model, Document } from 'mongoose';

type ScoreDocument = Document & {
  name: string;
  scorecardId: string;
  lineupIds: string[];
  memberIds: string[];
  partnerIds: string[];
  foursomeIds: string[];
  score: number;
  handicap: number;
  wonTwoBall: Boolean;
  wonOneBall: Boolean;
  wonIndo: Boolean;
  matchId: string;
  datePlayed: Date;
  user: string;
};

type ScoreInput = {
  name: ScoreDocument['name'];
  scorecardId: ScoreDocument['scorecardId'];
  lineupIds: ScoreDocument['lineupIds'];
  memberIds: ScoreDocument['memberIds'];
  partnerIds: ScoreDocument['partnerIds'];
  foursomeIds: ScoreDocument['foursomeIds'];
  score: ScoreDocument['score'];
  handicap: ScoreDocument['handicap'];
  wonTwoBall: ScoreDocument['wonTwoBall'];
  wonOneBall: ScoreDocument['wonOneBall'];
  wonIndo: ScoreDocument['wonIndo'];
  matchId: ScoreDocument['matchId'];
  datePlayed: ScoreDocument['datePlayed'];
  user: ScoreDocument['user'];
};

const ScoreSchema = new Schema(
  {
    name: String,
    handicap: Number,
    score: Number,
    wonTwoBall: Boolean,
    wonOneBall: Boolean,
    wonIndo: Boolean,
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

//TODO Add modified date to Score
// ScoreSchema.pre('save', function(next){
//   now = new Date();
//   modified = now;
// })

const Score: Model<ScoreDocument> = mongoose.model<ScoreDocument>(
  'Score',
  ScoreSchema
);
export { Score, ScoreInput, ScoreDocument };