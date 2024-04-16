import { Router } from 'express';
import {
  createMember,
  deleteMember,
  getAllMembers,
  getMember,
  updateMember,
  updateMemberScorecard,
} from '../controllers/member.controller';
import { checkJwt } from '../middleware/authz.middleware';
import { checkPermissions } from '../middleware/permissions.middleware';
import { ItemPermission } from '../items/item-permission';

const memberRoute = () => {
  const router = Router();
  router.use(checkJwt);
  console.log(
    'Permissions',
    ItemPermission.ReadMembers,
    ItemPermission.UpdateMember
  );

  router.post('/', checkPermissions(ItemPermission.CreateMember), createMember);

  router.get('/', checkPermissions(ItemPermission.ReadMembers), getAllMembers);

  router.get('/:id', checkPermissions(ItemPermission.ReadMembers), getMember);

  router.put(
    '/:id',
    checkPermissions(ItemPermission.UpdateMember),
    updateMember
  );

  // router.put(
  //   '/:id/scorecard:scorecardId',
  //   checkPermissions(ItemPermission.UpdateMember),
  //   updateMemberScorecard
  // );

  router.delete(
    '/:id',
    checkPermissions(ItemPermission.DeleteMember),
    deleteMember
  );

  return router;
};

export { memberRoute };
