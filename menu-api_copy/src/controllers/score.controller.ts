import { Request, Response } from 'express';
import { Score, ScoreInput } from '../models/score.model';
import mongoose, { Schema, Model, Document, isValidObjectId } from 'mongoose';
import { ObjectId } from 'mongoose';
import { checkObjectId } from '../middleware/not-found.middleware';

const createScore = async (req: Request, res: Response) => {
  const {
    name,
    score,
    scores,
    scoresToPost,
    matchId,
    scorecardId,
    scSlope,
    scRating,
    scPars,
    scHCaps,
    scName,
    lineupIds,
    usgaIndex,
    usgaIndexForTodaysScore,
    handicap,
    postedScore,
    wonTwoBall,
    wonOneBall,
    wonIndo,
    isPaired,
    isScored,
    memberId,
    foursomeIds,
    partnerIds,
    datePlayed,
    user,
    // scoreId
  } = req.body;
  console.log('Create score request', req.body);
  if (!name) {
    console.log(
      'ScoreController - The fields  are required - create1',
      req.body
    );
    return res.status(422).json({
      message: 'The fields  are required - create2',
    });
  }
  const scoreInput: ScoreInput = {
    name,
    score,
    scores,
    scoresToPost,
    matchId,
    scorecardId,
    scSlope,
    scRating,
    scPars,
    scHCaps,
    scName,
    lineupIds,
    usgaIndex,
    usgaIndexForTodaysScore,
    handicap,
    postedScore,
    wonTwoBall,
    wonOneBall,
    wonIndo,
    isPaired,
    isScored,
    memberId,
    foursomeIds,
    partnerIds,
    datePlayed,
    user,
    // scoreId
  };
  const scoreCreated = await Score.create(scoreInput);
  console.log('ScoreController - Post a score - Success', scoreCreated);
  return res.status(201).json({ scoreCreated });
};

const getAllScores = async (req: Request, res: Response) => {
  await Score.find()
    .sort('lastName')
    .exec(function (err, scores) {
      console.log('Get request for all scores');
      if (err) {
        console.log('Error retrieving scores');
      } else {
        return res.status(200).json(scores);
      }
    });
};

const getScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  const score = await Score.findOne({ _id: id });
  if (!score) {
    console.log('Score with id ', id, ' not found - get.');
    return res
      .status(404)
      .json({ message: `Score with id "${id}" not found - get.` });
  }
  console.log('Get request for a single score - success');
  return res.status(200).json({ score });
};

const updateScore = async (req: Request, res: Response) => {
 Score.findByIdAndUpdate(
    req.params.id,
    req.body,
    { upsert: true, new: true },
    function (err: any, score: any) {
      if (err) {
        res.send(err);
        console.log('Error updating score', err);
      } else {
        console.log('Update request for a single score - success ', score._id, res);
        res.json(score);
      }
    }
  );
};

const deleteScore = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Score.findByIdAndDelete(id);
  console.log('Delete request for a single score - success', id);
  return res.status(200).json({ message: 'Score deleted successfully.' });
};

const getMatchScores = async (req: Request, res: Response) => {
  // const {id} = req.params;  // The id of the match is a string with spaces added by Angular???  Hack below seems to fix it.
  const id = req.params.id.trim();
  if (!isValidObjectId(id)) {
    console.log('Invalid id', id);
    return res.status(404).json({ message: 'Invalid id' });
  }
  var query = { matchId: id };
  console.log('Request scores for a match', query);
  await Score.find(query)
    .then((scores) => {
      res.status(200).json(scores);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateMatchScores = async (req: Request, res: Response) => {
};

const deleteMatchScores = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!isValidObjectId(id)) {
    console.log('Invalid id', id);
    return res.status(404).json({ message: 'Invalid id' });
  }
  var query = { matchId: id };
  console.log('Request scores for a match', query);
  await Score.deleteMany(query);
  console.log('Delete request for a matchId - success', id);
  return res
    .status(200)
    .json({ message: 'Score(s) deleted successfully. Match is clean' });
};

export {
  createScore,
  deleteScore,
  getAllScores,
  getScore,
  updateScore,
  getMatchScores,
  updateMatchScores,
  deleteMatchScores,
};
