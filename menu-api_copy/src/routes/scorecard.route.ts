import { Router } from 'express';
import { createScorecard, deleteScorecard, getAllScorecards, getScorecard, updateScorecard } from '../controllers/scorecard.controller';
import { checkJwt } from '../middleware/authz.middleware';
import { checkPermissions } from '../middleware/permissions.middleware';
import { ItemPermission } from '../items/item-permission';

const scorecardRoute = () => {
  const router = Router();
  router.use(checkJwt);
  console.log('Permissions', (ItemPermission.ReadScorecards), (ItemPermission.UpdateScorecard));

  router.post('/',checkPermissions(ItemPermission.CreateScorecard), createScorecard);

  router.get('/',checkPermissions(ItemPermission.ReadScorecards),getAllScorecards);

  router.get('/:id', checkPermissions(ItemPermission.ReadScorecards), getScorecard);

  router.put('/:id', checkPermissions(ItemPermission.UpdateScorecard), updateScorecard);

  router.delete('/:id', checkPermissions(ItemPermission.DeleteScorecard), deleteScorecard);

  return router;
};

export { scorecardRoute };

