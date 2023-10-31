import { useEffect, useState } from "react";
import { SportInteface } from "../interface/sport.interface";
import axios from "axios";


const userSport = () => {
  const [sportList, setSport] = useState<SportInteface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const URL = "https://j2vk6ieugf.execute-api.us-east-1.amazonaws.com/prod/sport"
  
  const getSport = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(URL);
      setSport(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getSport();
  }, []);

  return { sportList, isLoading };


}

export default userSport;