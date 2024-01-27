import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import ListaPokemon from "../Buscador/ListaPokemon/ListaPokemon";
import { PokemonContext } from "../../../context/pokemonContext";


const Home = () => {

  const { Pokemons } = useContext(PokemonContext)

  return <div className="home">
    {Pokemons.length > 0 ?
      <ListaPokemon /> 
      : <Link className={'link'} to='/search'><img src="./pokeball.svg" alt="pokeball" /></Link>
    }
    <Link className={'link'} to='/uploader'>Uploader</Link>
  </div>
};

export default Home;
