import React, { useState } from "react";
import useCity from "../hooks/useCity";
import { CityInterface } from "../interface/city.interface";
import { SportInteface } from "../interface/sport.interface";
import userSport from "../hooks/useSport";
import Games from "./Games";
import Button from "./Button";
import ModalCreateGame from "./ModalCreateGame";
import useGame from "../hooks/useGame";

const FilterGames = () => {
  const [cityId, setCityData] = useState<number | null>(null);
  const [sportId, setSportId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { cityList } = useCity();
  const { sportList } = userSport();

  const {allGames,getAllGames,createGame,getGameByCity, getGameBySport, deleteGame, updateGame}=useGame()
  

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityId = parseInt(event.target.value);
    setCityData(selectedCityId);
  };

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSportId = parseInt(event.target.value);
    setSportId(selectedSportId);
  };

  const sercher = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>
      {/* <NavBar /> */}
      <div className="flex align-middle justify-between p-2 border-b-2  border-y-stone-200 mb-5">
        <div>
          <img
            src="https://static.wixstatic.com/media/7f2dd5_3084bc79fb5d4efca82d5095044d381e~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/no%20background.png"
            alt="Logo"
            className=" border-2 rounded-full"
          />
        </div>
        <div className="flex items-center">
          <div>
            <Button onClick={openModal} text="Add" />
            {isModalOpen && <ModalCreateGame onClose={closeModal} createGame={createGame}/>}
          </div>
        </div>
      </div>

      {/* <NavBar /> */}
      <div className="flex flex-col lg:flex-row lg:justify-end">
        <select
          className="p-2.5 mt-5 lg:mt-0 lg:mr-5 text-gray-500 bg-white border-2 font-bold rounded-xl appearance-none focus:border-indigo-600"
          onChange={handleCityChange}
          value={cityId || ""}
        >
          <option>Cities</option>
          {cityList.map((city: CityInterface) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
        <select
          className="p-2.5 mt-5 lg:mt-0 text-gray-500 border-2 font-bold rounded-xl appearance-none focus:border-indigo-600"
          onChange={handleSportChange}
          value={sportId || ""}
        >
          <option>Sports</option>
          {sportList.map((sport: SportInteface) => (
            <option key={sport.id} value={sport.id}>
              {sport.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="px-5 lg:mt-0 ml-0 lg:ml-5 border-2 font-bold rounded-2xl"
          placeholder="Search"
          value={search}
          onChange={sercher}
        />
      </div>
      <Games
        cityFilter={cityId ?? undefined}
        sportFilter={sportId ?? undefined}
        search={search}
        allGames={allGames}
        getAllGames={getAllGames}
        getGameByCity={getGameByCity}
        getGameBySport={getGameBySport}
        deleteGame={deleteGame}
        updateGame={updateGame}
      />
      
    </>
  );
};

export default FilterGames;
