import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { GameInterface } from "../interface/game.interface";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import ModalCreateGame from "./ModalCreateGame";
import { HashLoader } from "react-spinners";

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
  updateGame: (gameData: GameInterface) => void;
}

const Games = ({
  cityFilter,
  sportFilter,
  search,
  allGames,
  getAllGames,
  getGameByCity,
  getGameBySport,
  deleteGame,
  updateGame,
}: GamesProps) => {
  const [games, setGames] = useState<GameInterface[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<GameInterface | null>(null);


  const resultSearch = (allGames ? allGames : []).filter((data) =>
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
                        onClick={() => {
                          setModalIsOpen(true);
                          setSelectedGame(game);
                        }}
                        className="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-xl ml-5 mt-2"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => deleteGame(game.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl ml-2 mt-2"
                      >
                        <MdOutlineDelete />
                      </button>
                    </div>
                  </div>
                  {modalIsOpen && (
                    <ModalCreateGame
                      onClose={() => setModalIsOpen(false)}
                      createGame={() => {}}
                      selectedGame={selectedGame}
                      updateGame={updateGame}
                    />
                  )}
                </>
              );
            })
          ) : (
            <div className="flex justify-center  items-center mt-8">
              <HashLoader color={"#2e2f30"} loading={true} size={100} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Games;
