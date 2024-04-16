import { Router } from 'express';
import { createMatch, deleteMatch, getAllMatches, getMatch, updateMatch } from '../controllers/match.controller';
import { checkJwt } from '../middleware/authz.middleware';
import { checkPermissions } from '../middleware/permissions.middleware';
import { ItemPermission } from '../items/item-permission';

const matchRoute = () => {
  const router = Router();
  router.use(checkJwt);
  console.log('Permissions', (ItemPermission.ReadMatches), (ItemPermission.UpdateMatch));

  router.post('/',checkPermissions(ItemPermission.CreateMatch), createMatch);

  router.get('/',checkPermissions(ItemPermission.ReadMatches),getAllMatches);

  router.get('/:id', checkPermissions(ItemPermission.ReadMatches), getMatch);

  router.put('/:id', checkPermissions(ItemPermission.UpdateMatch), updateMatch);

  router.delete('/:id', checkPermissions(ItemPermission.DeleteMatch), deleteMatch);

  return router;
};

export { matchRoute };

