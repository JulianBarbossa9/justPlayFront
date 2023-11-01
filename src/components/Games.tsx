import React, { useEffect, useState } from 'react'
import GameCard from './GameCard'
import { GameInterface } from '../interface/game.interface'
import useGame from '../hooks/useGame'

interface GamesProps {
  cityFilter?: number
  sportFilter?: number,
  handleSearch?: (searchTerm: React.ChangeEvent<HTMLInputElement>) => void,
  search?: string
}

const Games = ({ cityFilter, sportFilter, handleSearch, search} : GamesProps) => {

  const [ games, setGames ] = useState<GameInterface[]>([])
  
  const { allGames, getAllGames } = useGame()
  
  const resultSearch = allGames.filter((data) =>
    data.name.toLowerCase().includes(search?.toLowerCase() ?? '')
  )


  const fetchGames = async () => {
    let url = "https://j2vk6ieugf.execute-api.us-east-1.amazonaws.com/prod/game"
    try {
      if(cityFilter && sportFilter){
        url
      } else if( cityFilter ){
        url += `/${cityFilter}`
      }else if ( sportFilter ){
        url += `/sports/${sportFilter}`
      }
      if (search) {
        url += `?search=${search}`
      }

    

      const searhResponse = await fetch(url)
      const searchResult = await searhResponse.json()
      setGames(searchResult)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(search){
      setGames(resultSearch)
    } else {
      setGames(allGames)
    }
  }, [search, allGames])

  useEffect(() => {
    fetchGames()
    getAllGames()
  }, [cityFilter, sportFilter])

  const renderGames = search ? resultSearch : games;
  
  return (
    <>
    <main>
        <div className='grid gap-16 grid-cols-fluid'>
          {renderGames.length > 0 ? (
            renderGames.map((game: any) => {
              return (
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
              );
            })
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </div>
      </main>
    </>
  )
}

export default Games