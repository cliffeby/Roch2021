import mongoose, { Schema, Model, Document } from 'mongoose';

type MatchDocument = Document & {
  name: string;
  scorecardId: string;
  scGroupName: string;
  players: number;
  status: string;
  lineUps: [{}];
  // scorecard: {},
  // lineupIds: string[];
  // memberIds: string[];
  datePlayed: Date;
  user: string;
};

type MatchInput = {
  name: MatchDocument['name'];
  scorecardId: MatchDocument['scorecardId'];
  scGroupName: MatchDocument['scGroupName'];
  players: MatchDocument['players'];
  status: MatchDocument['status'];
  lineUps: MatchDocument['lineUps'];
  // scorecard: MatchDocument['scorecard'];
  // lineupIds: MatchDocument['lineupIds'];
  // memberIds: MatchDocument['memberIds'];
  datePlayed: MatchDocument['datePlayed'];
  user: MatchDocument['user'];
};

const MatchSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      default: 'Please fill Match name',
      required: true,
      trim: true,
    },
    scorecardId: {
      type: Schema.Types.ObjectId,
    },
    scGroupName: {
      type: Schema.Types.String,
    },
    players: Number,
    status: { type: Schema.Types.String, default: 'open' },
    lineUps: {},
    datePlayed: Date,
    user: {
      type: Schema.Types.String,
      required: false,
      unique: false,
    },
  },
  {
    collection: 'matches',
    timestamps: true,
  }
);

const Match: Model<MatchDocument> = mongoose.model<MatchDocument>(
  'Match',
  MatchSchema
);
export { Match, MatchInput, MatchDocument };
