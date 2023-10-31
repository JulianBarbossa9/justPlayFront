import { useState } from "react";
import { GameInterface } from "../interface/game.interface";
import axios from "axios";

const useGame = () => {
  const [game, setGame] = useState<GameInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const createGame = async (gameData: GameInterface) => {
    try {
      setIsLoading(true);
      const response = await axios.post("https://j2vk6ieugf.execute-api.us-east-1.amazonaws.com/prod/game", gameData);
      if (response.status === 201) {
        setGame(response.data);
      } else {
        setError("Error creating game");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createGame, game, isLoading, error };
};

export default useGame;
