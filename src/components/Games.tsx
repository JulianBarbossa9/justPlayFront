import React, { useEffect, useState } from 'react'
import GameCard from './GameCard'

const Games = () => {

  const [ games, setGames ] = useState([])
  
  const URL = "https://j2vk6ieugf.execute-api.us-east-1.amazonaws.com/prod/game"
  const fetchGames = async () => {
    try {
      const searchResponse = await fetch(URL)
      const searchResult = await searchResponse.json()
      setGames(searchResult)

    } catch (error) {
      console.log("Error: ", error)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [games])
  
  return (
    <>
    <main>
      <div className='grid gap-16 grid-cols-fluid'>
        {
          games.map((game: any) => {
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
            )
          })
        }
      </div>
    </main>
    </>
  )
}

export default Games