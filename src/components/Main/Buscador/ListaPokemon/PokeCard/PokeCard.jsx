import React from "react";
import { Link } from 'react-router-dom'
import toAsteriscString from '../../../../../utils/formatter'

import Button from '@mui/material/Button';

const PokeCard = ({ pokemon }) => {

  // console.log('objeto que llega ', pokemon);

  return (
    <>
      {pokemon ? <div className="pokemonCard">
        <h2>{pokemon.name}</h2> <h3>{toAsteriscString(pokemon.id)}</h3>
        <img src={pokemon.url} alt={pokemon.name} />
        <p>{pokemon.types.map(el => 
        <span className={`type ${el.type.name}`} key={el.type.name}></span>
        )}
        </p>
        {pokemon.isReal ? 
        <Button variant="contained">
          <Link className={'link'} to={`/Pokemon/${pokemon.id}`}>Details</Link>
        </Button> 
        : ''}
      </div> : ''}
    </>

  );
};

export default PokeCard;
