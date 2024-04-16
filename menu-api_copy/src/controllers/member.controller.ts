import { Request, Response } from 'express';
import { Member, MemberInput } from '../models/member.model';
import { Score } from '../models/score.model';

const createMember = async (req: Request, res: Response) => {
  const { firstName, lastName, usgaIndex, lastDatePlayed, scorecardId, scorecardsId, email, user } = req.body;
  if (!firstName || !lastName) {
    console.log(
      'MemberController - The fields firstName and lastName are required - create',
      req.body
    );
    return res.status(422).json({
      message: 'The fields firstName and lastName are required - create',
    });
  }
  const memberInput: MemberInput = {
    firstName,
    lastName,
    usgaIndex,
    lastDatePlayed,
    // scorecardId,
    scorecardsId,
    email,
    user,
  };
  const memberCreated = await Member.create(memberInput);
  console.log('MemberController - Post a member - Success');
  return res.status(201).json({ memberCreated });
};

const getAllMembers = async (req: Request, res: Response) => {
  await Member.find()
    .sort('lastName')
    // .populate({path:'scorecardId', select: 'name groupName', model: 'Scorecard'})
    .exec(function (err, members) {
      console.log('Get request for all members');
      if (err) {
        console.log('Error retrieving members');
      } else {
        return res.status(200).json(members);
      }
    });
};

const getMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  const member = await Member.findOne({ _id: id })
  // .populate(
    // 'scorecard',
    // 'groupName',
    // 'name',
  // );
  if (!member) {
    console.log('Member with id ', id, ' not found - get.');
    return res
      .status(404)
      .json({ message: `Member with id "${id}" not found - get.` });
  }
  console.log('Get request for a single member - success');
  return res.status(200).json({ member });
};

const updateMember = async (req: Request, res: Response) => {
  Member.findByIdAndUpdate(req.params.id, req.body,  {upsert: true, new: true}, function (
    err: any,
    member: any
  ) {
    if (err) {
      res.send(err);
      console.log('Error updating member', err);}
      else {
        res.json(member);
      }
  });
}

// const updateMember = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { firstName, lastName, usgaIndex, scorecardsId, email, user } = req.body;
//   console.log('Update member request', req.params, req.body);
//   const member = await Member.findOne({ _id: id });
//   if (!member) {
//     return res
//       .status(404)
//       .json({ message: `Member with id "${id}" not found -update.` });
//   }
//   // if (!firstName || !lastName) {
//   //   return res.status(422).json({
//   //     message: 'The fields firstName and lastName are required - update',
//   //   });
//   // }
//   console.log('member findOne', member);
//   await Member.updateOne(
//     { _id: id },
//     { firstName, lastName, usgaIndex,   scorecardsId, email, user },

//   );
//   const memberUpdated = await Member.findById(id, {
//     firstName,
//     lastName,
//     usgaIndex,
//     // scorecardId,
//     scorecardsId,
//     email,
//     user,
//   });
//   console.log(
//     'MemberController - Update a member - Success',
//     memberUpdated
//   );
//   return res.status(200).json({ memberUpdated });
// };

const updateMemberScorecard = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('Update request params', req.params, id);
  const { firstName, lastName, usgaIndex, lastDatePlayed, scorecardId, scorecardsId, email, user } = req.body;
  const member = await Member.findOne({ _id: id });
  if (!member) {
    return res
      .status(404)
      .json({ message: `Member with id "${id}" not found -update.` });
  }
  if (!firstName || !lastName) {
    return res.status(422).json({
      message: 'The fields firstName and lastName are required - update',
    });
  }
  await Member.updateOne(
    { _id: id },
    { firstName, lastName, usgaIndex, lastDatePlayed, email, scorecardId, scorecardsId, user },
    // {
    //   $set: {
    //     'scorecards.$.rating': updateOne.rating,
    //     'items.$.value': updateOne.value,
    //   },
    // }
  );
  const memberUpdated = await Member.findById(id, {
    firstName,
    lastName,
    usgaIndex,
    lastDatePlayed,
    scorecardsId,
    scorecardId,
    email,
    user,
  });
  console.log(
    'MemberController - Update a member - FindById - Success',
    memberUpdated
  );
  return res.status(200).json({ memberUpdated });
};

const deleteMember = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Member.findByIdAndDelete(id);
  console.log('Delete request for a single member - success', id);
  return res.status(200).json({ message: 'Member deleted successfully.' });
};

export { createMember, deleteMember, getAllMembers, getMember, updateMember, updateMemberScorecard };
