import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 mx-4">
      <div className="flex items-center">
        <img
          src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
          alt="PokeAPI"
          className="mx-auto w-screen max-w-sm"
        />
        
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default Header;
