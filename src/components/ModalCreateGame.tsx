

import { useState } from 'react';
import useCity from '../hooks/useCity';
import useSport from '../hooks/useSport';
import { GameInterface } from '../interface/game.interface';
import Error from './Error';

interface ModalCreateGameProps {
  onClose: () => void;
  createGame: (game: GameInterface) => void;
}

const ModalCreateGame: React.FC<ModalCreateGameProps> = ({ onClose, createGame }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState<string | Date>('');
  const [endTime, setEndTime] = useState<string | Date>('');
  const [cityId, setCityId] = useState<number>();
  const [sportId, setSportId] = useState<number>();
  const [ error, setError ] = useState<boolean>(false)



  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //validate fields not empty
    if(!name || !startTime || !endTime || !cityId || !sportId) {
      setError(true)
      return
    }
    setError(false)

    const gameData: GameInterface = {
      name,
      description: description || '',
      startTime: startTime || new Date(),
      endTime: endTime || new Date(),
      cityId: cityId || 0,
      sportId: sportId || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    createGame(gameData)
    onClose();
  };

  const { cityList } = useCity()
  const { sportList } = useSport()


  return (
    
    <>
    <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
      <div className="modal-overlay" onClick={onClose} />
      <div className='bg-white p-20 rounded-xl  w-max'>
      { error && <Error>Fields with <span>*</span> are Required </Error>}
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='border-b border-gray-900/10 pb-12 mt-10'>
            <h2 className="text-2xl font-bold   leading-7 text-gray-900">Create Game</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">Create a game to play with some friends.</p>
            
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label htmlFor="name-game" className="block text-sm font-medium leading-6 text-gray-900">
                  Name of The Game *:
                </label>
                <div className='mt-2'>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    id='name-game'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label 
                  htmlFor="description-game"
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Description:
                </label>
                <div className='mt-2'>
                  <textarea 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    id='description-game'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label 
                  htmlFor="start-game"
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Start Game *:
                </label>
                <div className='mt-2'>
                  <input 
                    type="date" 
                    value={startTime instanceof Date ? startTime.toISOString() : startTime} 
                    onChange={(e) => setStartTime(e.target.value)}
                    id='start-game'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label 
                  htmlFor="end-game"
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  End Game *:
                </label>
                <div className='mt-2'>
                  <input 
                    type="date" 
                    value={endTime instanceof Date ? endTime.toISOString() : endTime} 
                    onChange={(e) => setEndTime(e.target.value)} 
                    id='end-game'
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label 
                  htmlFor="city-game"
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Select City *:
                </label>
                <div className='mt-2'>
                  <select 
                    name="" 
                    id="city-game"
                    value={cityId} 
                    onChange={(e) => setCityId(parseInt(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select a city</option>
                    {
                      cityList.map((city) => {
                        return (
                          <option value={city.id} key={city.id}>{city.name}</option>
                        )
                       
                      })
                    }
                  </select>
                </div>
              </div>

              <div className='sm:col-span-3'>
                <label 
                  htmlFor="city-game"
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Select Sport *:
                </label>
                <div className='mt-2'>
                  <select 
                    name="" 
                    id="city-game"
                    value={sportId} 
                    onChange={(e) => setSportId(parseInt(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select a Sport</option>
                    
                    {
                      sportList.map((sport) => {
                        return (
                          <option value={sport.id} key={sport.id}>{sport.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>

            </div>
          
          </div>
          <button type="submit" className='py-2 px-8  rounded-xl font-bold text-slate-100 bg-mainlyButton mt-5'>Create</button>
          
        </form>
        <button className='mt-5 border-2 rounded-md p-4' onClick={onClose}>
          Cancel
        </button>
      
      </div>
    </div>
    </>
  );
};

export default ModalCreateGame;
