import { Request, Response } from 'express';
import { Match, MatchInput } from '../models/match.model';

const createMatch = async (req: Request, res: Response) => {
  const {
    name,
    // scorecard,
    scorecardId,
    scGroupName,
    players,
    status,
    lineUps,
    // memberIds,
    // lineupIds,
    datePlayed,
    user,
  } = req.body;
   console.log(
     'MatchController Mcreate0',
     req.body
   );
  if (!name ) {
    console.log(
      'MatchController - The fields name and scorecardId are required - Mcreate1',
      req.body
    );
    return res.status(422).json({
      message: 'The fields name and scorecardId are required - Mcreate2',
    });
  }
  const matchInput: MatchInput = {
    name,
    // scorecard,
    scorecardId,
    scGroupName,
    players,
    status,
    lineUps,
    // memberIds,
    // lineupIds,
    datePlayed,
    user,
  };
  const matchCreated = await Match.create(matchInput);
  console.log('MatchController - Post a match - Success');
  return res.status(201).json({ matchCreated });
};

const getAllMatches = async (req: Request, res: Response) => {
  await Match.find()
    // .populate('scorecard', 'groupName') // This makes scorecard an object of _id and name
    .sort({ datePlayed: 'desc' })
    .exec(function (err: any, matches: any) {
      console.log('Get request for all matches');

      if (err) {
        console.log('Error retrieving matches');
      } else {
        return res.status(200).json(matches);
      }
    });
  };

const getMatch = async (req: Request, res: Response) => {
        const { id } = req.params;
        const match = await Match.findOne({ _id: id })
          .exec(function (err, match) {
            if (!match) {
              console.log('Match with id ', id, ' not found - get.');
              return res
                .status(404)
                .json({ message: `Match with id "${id}" not found - get.` });
            }
            console.log('Get request for a single match - success');
            return res.status(200).json({ match });
          });
    };


//
const updateMatch = async (req: Request, res: Response) => {
  Match.findByIdAndUpdate(
    req.params.id,
    req.body,
    { upsert: true, new: true },
    function (err: any, match: any) {
      if (err) {
        res.send(err);
        console.log('Error updating match', err);
      } else {
        console.log('Update request for a match - success ', match._id); 
        res.json(match);
      }
    }
  );
};

const deleteMatch = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Match.findByIdAndDelete(id);
  console.log('Delete request for a single match - success', id);
  return res.status(200).json({ message: 'Match deleted successfully.' });
};

export { createMatch, deleteMatch, getAllMatches, getMatch, updateMatch };
