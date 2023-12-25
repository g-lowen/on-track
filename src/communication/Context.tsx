import { ReactNode, createContext, useContext } from "react";
import { BettingData, AppData, BetKeys } from "./Context.types";
import { results, playerBets } from "./data";

const AppContext = createContext<AppData | null>(null);

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined || context === null) {
    throw new Error("AppContext cannot be used outside of AppContext");
  }
  return context;
}

function ContextProvider({ children }: { children: ReactNode }) {
  const betKeys: BetKeys[] = [];

  let sumMatches = 0;
  Object.keys(results).forEach(function (key) {
    // Checks if the value is true. If so, +1 to sumMatches
    if (!results[key as BetKeys]) return;
    sumMatches += 1;
  });

  const context = {
    results,
    bettingData: bettingContext()
  };

  function bettingContext() {
    if (!playerBets) return;

    const newPlayerBets: BettingData = JSON.parse(JSON.stringify(playerBets));

    if (newPlayerBets.players) {
      Object.keys(newPlayerBets?.players[0]?.bets).map((betKey) =>
        betKeys.push(betKey as BetKeys)
      );
    }

    newPlayerBets?.players?.forEach((player) => {
      const { playerInfo, bets } = player;
      for (let i = 0; i < betKeys.length; i++) {
        if (betKeys[i].startsWith("p2") || betKeys[i].startsWith("p3")) {
          if (!Array.isArray(results[betKeys[10]])) return;

          const semiFinals = results[betKeys[10]] as any;
          if (bets[betKeys[i]] === semiFinals[0]) {
            playerInfo.points += 3;
          }
          if (bets[betKeys[i]] === semiFinals[1]) {
            playerInfo.points += 3;
          }
        }

        if (bets[betKeys[i]] === results[betKeys[i]]) {
          playerInfo.win += 1;
          if (betKeys[i].startsWith("g")) {
            playerInfo.points += 1;
          } else if (betKeys[i].startsWith("p4")) {
            playerInfo.points += 5;
          } else if (betKeys[i].startsWith("p1")) {
            playerInfo.points += 3;
          }
        } else if (
          bets[betKeys[i]] !== results[betKeys[i]] &&
          results[betKeys[i]] !== undefined &&
          results[betKeys[i]] !== false
        ) {
          playerInfo.loss += 1;
        }
        playerInfo.percent =
          Math.round((playerInfo.win / sumMatches) * 100) || 0;
      }
    });

    // default sorting by points
    newPlayerBets?.players?.sort((a, b) =>
      a.playerInfo.points < b.playerInfo.points
        ? 1
        : a.playerInfo.points > b.playerInfo.points
        ? -1
        : 0
    );

    return newPlayerBets;
  }

  return (
    <AppContext.Provider value={{ context }}>{children}</AppContext.Provider>
  );
}

export { useAppContext, ContextProvider };
