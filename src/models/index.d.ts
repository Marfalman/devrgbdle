import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerPlayerStats = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayerStats, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly guessData?: string | null;
  readonly total?: number | null;
  readonly win?: number | null;
  readonly streak?: number | null;
  readonly maxStreak?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlayerStats = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlayerStats, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly guessData?: string | null;
  readonly total?: number | null;
  readonly win?: number | null;
  readonly streak?: number | null;
  readonly maxStreak?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PlayerStats = LazyLoading extends LazyLoadingDisabled ? EagerPlayerStats : LazyPlayerStats

export declare const PlayerStats: (new (init: ModelInit<PlayerStats>) => PlayerStats) & {
  copyOf(source: PlayerStats, mutator: (draft: MutableModel<PlayerStats>) => MutableModel<PlayerStats> | void): PlayerStats;
}

type EagerGameHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameHistory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly WinDays?: string | null;
  readonly LoseDays?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGameHistory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GameHistory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly WinDays?: string | null;
  readonly LoseDays?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type GameHistory = LazyLoading extends LazyLoadingDisabled ? EagerGameHistory : LazyGameHistory

export declare const GameHistory: (new (init: ModelInit<GameHistory>) => GameHistory) & {
  copyOf(source: GameHistory, mutator: (draft: MutableModel<GameHistory>) => MutableModel<GameHistory> | void): GameHistory;
}

type EagerColors = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Colors, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Color: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyColors = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Colors, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Color: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Colors = LazyLoading extends LazyLoadingDisabled ? EagerColors : LazyColors

export declare const Colors: (new (init: ModelInit<Colors>) => Colors) & {
  copyOf(source: Colors, mutator: (draft: MutableModel<Colors>) => MutableModel<Colors> | void): Colors;
}

type EagerLeaderBoard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LeaderBoard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly winStreak: number;
  readonly winPercent: number;
  readonly preferred_username: string;
  readonly totalWins?: number | null;
  readonly gamesPlayed?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLeaderBoard = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LeaderBoard, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly winStreak: number;
  readonly winPercent: number;
  readonly preferred_username: string;
  readonly totalWins?: number | null;
  readonly gamesPlayed?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LeaderBoard = LazyLoading extends LazyLoadingDisabled ? EagerLeaderBoard : LazyLeaderBoard

export declare const LeaderBoard: (new (init: ModelInit<LeaderBoard>) => LeaderBoard) & {
  copyOf(source: LeaderBoard, mutator: (draft: MutableModel<LeaderBoard>) => MutableModel<LeaderBoard> | void): LeaderBoard;
}