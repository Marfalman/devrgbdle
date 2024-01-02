// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PlayerStats, GameHistory, Colors, LeaderBoard } = initSchema(schema);

export {
  PlayerStats,
  GameHistory,
  Colors,
  LeaderBoard
};