import { Request, Response } from 'express';
import { Scorecard, ScorecardInput } from '../models/scorecard.model';

const createScorecard = async (req: Request, res: Response) => {
  const {
    groupName,
    name,
    rating,
    slope,
    parInputString,
    par,
    pars,
    yardsInputString,
    hCapInputString,
    user,
  } = req.body;
  if (!name || !rating) {
    console.log(
      'ScorecardController - The fields name and rating are required - create',
      req.body
    );
    return res.status(422).json({
      message: 'The fields name and rating are required - create',
    });
  }
  const scorecardInput: ScorecardInput = {
    groupName,
    name,
    rating,
    slope,
    user,
    parInputString,
    par,
    pars,
    yardsInputString,
    hCapInputString,
  };
  const scorecardCreated = await Scorecard.create(scorecardInput);
  console.log('ScorecardController - Post a scorecard - Success');
  return res.status(201).json({ scorecardCreated });
};

const getAllScorecards = async (req: Request, res: Response) => {
  await Scorecard.find()
    .sort('groupName')
    .exec(function (err, scorecards) {
      console.log('Get request for all scorecards', scorecards);
      if (err) {
        console.log('Error retrieving scorecards');
      } else {
        return res.status(200).json(scorecards);
      }
    });
};

// const getAllScorecardGroups = async (req: Request, res: Response) => {
//   await Scorecard.find()
//     .distinct('groupName')
//     .exec(function (err, scorecards) {
//       console.log('Get request for all scorecard groupss', scorecards);
//       if (err) {
//         console.log('Error retrieving scorecard groups');
//       } else {
//         return res.status(200).json(scorecards);
//       }
//     });
// };

const getScorecard = async (req: Request, res: Response) => {
  const { id } = req.params;
  const scorecard = await Scorecard.findOne({ _id: id });
  if (!scorecard) {
    console.log('Scorecard with id ', id, ' not found - get.');
    return res
      .status(404)
      .json({ message: `Scorecard with id "${id}" not found - get.` });
  }
  console.log('Get request for a single scorecard - success');
  return res.status(200).json({ scorecard });
};
//
const updateScorecard = async (req: Request, res: Response) => {
  Scorecard.findByIdAndUpdate(
    req.params.id,
    req.body,
    { upsert: true, new: true },
    function (err: any, scorecard: any) {
      if (err) {
        res.send(err);
        console.log('Error updating scorecard', err);
      } else {
        console.log('Update request for a single scorecard - success ', scorecard._id);
        res.json(scorecard);
      }
    }
  );
};
//   console.log('REQ', req.body);
//   const { id } = req.params;
//   const {
//     groupName,
//     name,
//     rating,
//     slope,
//     user,
//     parInputString,
//     par,
//     pars,
//     yardsInputString,
//     hCapInputString,
//   } = req.body;
//   const scorecard = await Scorecard.findOne({ _id: id });
//   if (!scorecard) {
//     return res
//       .status(404)
//       .json({ message: `Scorecard with id "${id}" not found -update.` });
//   }
//   if (!name || !rating) {
//     return res.status(422).json({
//       message: 'The fields name and rating are required - update',
//     });
//   }
//   await Scorecard.updateOne(
//     { _id: id },
//     {
//       groupName,
//       name,
//       rating,
//       slope,
//       user,
//       parInputString,
//       par,
//       pars,
//       yardsInputString,
//       hCapInputString,
//     }
//   );
//   const scorecardUpdated = await Scorecard.findById(id, {
//     groupName,
//     name,
//     rating,
//     slope,
//     user,
//     parInputString,
//     par,
//     pars,
//     yardsInputString,
//     hCapInputString,
//   });
//   console.log('ScorecardController - Update a scorecard - Success');
//   return res.status(200).json({ scorecardUpdated });
// };

const deleteScorecard = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Scorecard.findByIdAndDelete(id);
  console.log('Delete request for a single scorecard - success', id);
  return res.status(200).json({ message: 'Scorecard deleted successfully.' });
};

export {
  createScorecard,
  deleteScorecard,
  getAllScorecards,
  getScorecard,
  updateScorecard,
};
