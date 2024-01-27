import React, { useEffect, useState,useContext } from "react";
import PokeCard from './PokeCard'
import { v4 as uuidv4 } from "uuid";
import { PokemonContext } from "../../../../context/pokemonContext";

const ListaPokemon = () => {
  //{Pokemons}

  const {Pokemons} = useContext(PokemonContext)


  const drawList = () => {
    // console.log('pokemons que hay ', Pokemons);
    return Pokemons.map((pkm, i) => {
      // console.log('elemento de la lista ' , pkm);
      return <PokeCard key={uuidv4()} pokemon={pkm} />
    })
  }

  return (
    <div className='listaPokemon'>
      {Pokemons ? drawList() : ''}
    </div>
  );
};

export default ListaPokemon;