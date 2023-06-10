
import type { ReactElement } from 'react';

interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps): ReactElement => {
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
