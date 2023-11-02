import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { GameInterface } from "../interface/game.interface";
import { MdOutlineDelete } from "react-icons/md";

interface GamesProps {
  cityFilter?: number;
  sportFilter?: number;
  handleSearch?: (searchTerm: React.ChangeEvent<HTMLInputElement>) => void;
  search?: string;
  allGames: GameInterface[];
  getAllGames: () => void;
  getGameByCity: (cityId: number) => void;
  getGameBySport: (sportId: number) => void;
  deleteGame: (gameId: number) => void;
}

const Games = ({
  cityFilter,
  sportFilter,
  search,
  allGames,
  getAllGames,
  getGameByCity,
  getGameBySport,
  deleteGame
}: GamesProps) => {
  const [games, setGames] = useState<GameInterface[]>([]);
  

  const resultSearch =
  (allGames ? allGames : []).filter((data) =>
    data.name.toLowerCase().includes(search?.toLowerCase() ?? "")
  );

  const fetchGames = async () => {
    if (cityFilter) {
      getGameByCity(cityFilter);
    } else if (sportFilter) {
      getGameBySport(sportFilter);
    }
  };

  useEffect(() => {
    if (search) {
      setGames(resultSearch);
    } else {
      setGames(allGames);
    }
  }, [search, allGames]);

  useEffect(() => {
    fetchGames();
    getAllGames();
  }, [cityFilter, sportFilter]);

  const renderGames = search ? resultSearch : games;

  useEffect(() => {
    setGames(allGames);
  }, [allGames]);

  return (
    <>
      <main>
        <div className="grid gap-16 grid-cols-fluid">
          {renderGames.length > 0 ? (
            renderGames.map((game: any) => {
              return (
                <>
                  <div key={game.id}>
                    <GameCard
                      name={game.name}
                      city={game.city}
                      endTime={game.endTime}
                      startTime={game.startTime}
                      sport={game.sport}
                      createdAt={game.createdAt}
                      description={game.description}
                      updatedAt={game.updatedAt}
                      key={game.id}
                    />
                    <div className="flex">
                      <button
                        onClick={() => deleteGame(game.id)} 
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full ml-5 mt-2">
                        <MdOutlineDelete />
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Games;
