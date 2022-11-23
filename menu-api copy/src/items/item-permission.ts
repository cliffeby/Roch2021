export enum ItemPermission {
  CreateItems = 'create:items',
  UpdateItems = 'update:items',
  DeleteItems = 'delete:items',
  CreateMember = 'create:member',
  ReadMembers = 'read:members',
  UpdateMember = 'update:member',
  DeleteMember = 'remove:member',
  CreateScorecard = 'create:scorecard',
  ReadScorecards = 'read:scorecards',
  UpdateScorecard = 'update:scorecard',
  DeleteScorecard = 'remove:scorecard',
  CreateMatch = 'create:match',
  ReadMatches = 'read:matches',
  UpdateMatch = 'update:match',
  DeleteMatch = 'remove:match',
  CreateScore = 'create:member',
  ReadScores = 'read:members',
  UpdateScore = 'update:member',
  DeleteScore = 'remove:member',
  BadPermission = 'read:bad',
}
