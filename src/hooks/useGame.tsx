import { useState } from "react";
import { GameInterface } from "../interface/game.interface";
import axios from "axios";

const useGame = () => {
  const [game, setGame] = useState<GameInterface>();
  const [ allGames, setAllGames ] = useState<GameInterface[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [ gameByCity, setGameByCity ] = useState<GameInterface[]>()
  const [ gameBySport, setGameBySport ] = useState<GameInterface[]>()


  const URL = "https://j2vk6ieugf.execute-api.us-east-1.amazonaws.com/prod/game"
  const createGame = async (gameData: GameInterface) => {
    try {
      setIsLoading(true);
      const response = await axios.post(URL, gameData);
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

  const getAllGames = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL);
      if (response.status === 200) {
        setAllGames(response.data);
      } else {
        setError("Error getting game");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const getGameByCity = async (cityId: number) => { 
    try {
      setIsLoading(true);
      const response = await axios.get(`${URL}/${cityId}`);
      if (response.status === 200) {
        setGameByCity(response.data);
      } else {
        setError("Error getting game");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  const getGameBySport = async (sportId: number) => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${URL}/sports/${sportId}`);
      if ( response.status === 200) {
        setGameBySport(response.data);
      } else {
        setError("Error getting game");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  return { createGame, game, isLoading, error ,getGameByCity, gameByCity, getGameBySport, gameBySport, getAllGames, allGames };
};

export default useGame;
