import { useEffect, useState } from "react";
import { CityInterface } from "../interface/city.interface";
import axios from "axios";


const useCity = () => {
  const [ cityList, setCityList ] = useState<CityInterface[]>([])
  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  const URL = "https://j2vk6ieugf.execute-api.us-east-1.amazonaws.com/prod/city"

  const getCityList = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(URL)
      setCityList(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  

  useEffect(() => {
    getCityList()
  },[])

  return { cityList, isLoading }

}

export default useCity;

