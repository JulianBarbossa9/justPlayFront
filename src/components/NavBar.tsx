import React, { useState } from "react";
import Button from "./Button";
import SearchComponent from "./SearchComponent";
import ModalCreateGame from "./ModalCreateGame";




const NavBar = () => {
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  const openModal = () => { 
    setIsModalOpen(true)
  }

  const closeModal = () => { 
    setIsModalOpen(false)
  }


  return (
    <div className="flex align-middle justify-between p-2 border-b-2  border-y-stone-200">
      <div>
        <img src="https://static.wixstatic.com/media/7f2dd5_3084bc79fb5d4efca82d5095044d381e~mv2.png/v1/fill/w_72,h_72,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/no%20background.png" alt="Logo" className=" border-2 rounded-full"/>
      </div>
      <div className="flex items-center">
        <SearchComponent />
      </div>
      <div>
        <Button onClick={openModal} text="Add" />
        {
          isModalOpen && <ModalCreateGame onClose={closeModal} />
        }
      </div>
    </div>
  );
};

export default NavBar;

