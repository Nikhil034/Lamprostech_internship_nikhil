import React from 'react';

// export const metadata={
//     title:"About page",
// };



export default function About(){
    const options = [
        { text: 'Optimisim', logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
        { text: 'Arbitrum', logo: 'https://cryptologos.cc/logos/optimism-ethereum-op-logo.png' },
        
      ];

      return (
        <div className="relative">
          <select className="block appearance-none w-60 bg-white border border-gray-300 rounded-xl py-2 pl-3 pr-10 leading-tight focus:outline-none focus:border-blue-500">
            {options.map(option => (
              <option key={option.text} value={option.text}>
                {option.text}
                <img src={option.logo} alt={option.text} className="h-5 w-5 ml-2 inline-block" />
              </option>
            ))}
          </select>
         
        </div>
      );
}