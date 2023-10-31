
import { GameShowAllInterface } from "../interface/game.interface";

//node-app\src\interface\game.interface.ts

const GameCard = ({
  name,
  city,
  endTime,
  startTime,
  sport,
  createdAt,
  description,
  updatedAt,
  
}: GameShowAllInterface) => {
  return (
    <>
     
     <div key={city.id} className="mx-5 mt-10">
      <div className="max-w-md rounded overflow-hidden shadow-lg w-72 min-h-full" > 
        <div className="flex justify-center items-center">
          <img src={sport.image ?? ''} alt={sport.name} className="w-full h-40" /> 
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{sport.name}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #{city.name}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #Teams: {sport.team}
          </span>
        </div>
      </div>
    </div>
    </>
  );
};

export default GameCard;
