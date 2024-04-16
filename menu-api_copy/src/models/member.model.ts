import mongoose, { Schema, Model, Document, SchemaType } from 'mongoose';

type MemberDocument = Document & {
  firstName: string;
  lastName: string | null;
  usgaIndex: number;
  lastDatePlayed: string;
  scorecardsId: [];
  // scorecardId: {};
  user: string;
  email: string;
};

type MemberInput = {
  firstName: MemberDocument['firstName'];
  lastName: MemberDocument['lastName'];
  usgaIndex: MemberDocument['usgaIndex'];
  lastDatePlayed: MemberDocument['lastDatePlayed'];
  scorecardsId: MemberDocument['scorecardsId'];
  // scorecardId: MemberDocument['scorecardId'];
  user: MemberDocument['user'];
  email: MemberDocument['email'];
};

const MemberSchema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      required: true,
      unique: false,
    },
    lastName: {
      type: Schema.Types.String,
      required: true,
      unique: false,
    },
    usgaIndex: {
      type: Schema.Types.Number,
      required: false,
      unique: false,
    },
    lastDatePlayed: {
      type: Schema.Types.String,
      required: false,
      unique: false,
    },
    scorecardsId: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        unique: false,
        ref: 'Scorecard',
      },
    ],
    email: {
      type: Schema.Types.String,
      required: false,
      unique: false,
    },
    user: {
      type: Schema.Types.String,
      required: false,
      unique: false,
    },
  },
  {
    collection: 'members',
    timestamps: true,
  }
);
// Duplicate the ID field.
//  This provides a workaround for the _id collision with the Scores collection in Member-Block
MemberSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id; // _id is not defined until execution
});
MemberSchema.virtual('fullName')
  .get(function () {
    //@ts-ignore
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (v: string) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    //@ts-ignore
    this.set({ firstName, lastName });
  });
MemberSchema.virtual('fullNameR')
  .get(function () {
    //@ts-ignore
    return `${this.lastName}, ${this.firstName}`;
  })
  .set(function (v: string) {
    const lastName = v.substring(0, v.indexOf(' '));
    const firstName = v.substring(v.indexOf(' ') + 1);
    //@ts-ignore
    this.set({ lastName, firstName });
  });

// Ensure virtual fields are serialised.
MemberSchema.set('toJSON', {
  virtuals: true,
});

const Member: Model<MemberDocument> = mongoose.model<MemberDocument>(
  'Member',
  MemberSchema
);

export { Member, MemberInput, MemberDocument };
