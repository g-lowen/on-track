export type AppData = {
  context: {
    results: Games;
    bettingData?: BettingData;
  };
};

export type BettingData = {
  players: Player[];
  betsTableGroup: BetsTableGroup[];
  betsTablePlayoffs: BetsTablePlayoffs[];
};

type Player = {
  playerInfo: PlayerInfo;
  bets: Games;
};

type PlayerInfo = {
  name: string;
  lore: string;
  icon: string;
  iconLarge: string;
  win: number;
  loss: number;
  percent: number;
  points: number;
};

type Games = {
  g11: string | boolean;
  g12: string | boolean;
  g13: string | boolean;
  g21: string | boolean;
  g22: string | boolean;
  g23: string | boolean;
  g31: string | boolean;
  g32: string | boolean;
  g33: string | boolean;
  p1: string | boolean;
  p2: string | boolean;
  p3: string | boolean;
  p4: string | boolean;
};

export type BetKeys = keyof Games;
export type PlayerInfoKeys = keyof PlayerInfo;

type BetsTableGroup = {
  g11: string[];
  g12: string[];
  g13: string[];
  g21: string[];
  g22: string[];
  g23: string[];
  g31: string[];
  g32: string[];
  g33: string[];
};

type BetsTablePlayoffs = {
  p1: string[];
  p2: string[];
  p3: string[];
  p4: string[];
};
