import React from "react";
import { useState,useContext } from 'react'
import Search from "./Search";
import ListaPokemon from "./ListaPokemon";

const Buscador = () => {

  // const [Pokemons,setPokemons] = useState([])

  // const addPokemon = (pokemon)=>{
  //   setPokemons(Pokemons.concat(pokemon))
  // }

  // const clearPokemons = ()=>{
  //   setPokemons([])
  // }

  return (<section>
    {/* <Search addPokemon={addPokemon} clearPokemons={clearPokemons}/> */}
    <Search/>
    <br />
    {/* <ListaPokemon Pokemons={Pokemons}/> */}
    <ListaPokemon/>
    </section>)
};

export default Buscador;