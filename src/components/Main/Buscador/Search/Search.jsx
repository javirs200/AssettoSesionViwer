import React, { useState,useEffect,useContext} from "react";
import axios, { AxiosError } from "axios"
import { PokemonContext } from "../../../../context/pokemonContext";
import { TextField,Button } from "@mui/material";


const Search = () => {
 //{ addPokemon, clearPokemons }

  const{addPokemon,clearPokemons} = useContext(PokemonContext)

  const [pokemon, setPokemon] = useState('')
  const[firstLoad,setFirstLoad]=useState(true)

  const searchPokemon = async () => {
    if (pokemon.length > 0) { // si esta vacio
      try {
        // console.log('lamada api con pokemon ', pokemon);
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)//trows axios error if pokemon not exist  , beacuse endpoint not exist
        if (res.data) {
          let name = res.data.name.slice(0,1).toUpperCase() + res.data.name.slice(1,res.data.name.length)
          //console.log(res.data)
          // console.log(name);
          const pokemonObj = {
            name: name,
            id: res.data.id,
            //cdn pokemon iconos animados 
            url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${res.data.id}.gif`,
            types: res.data.types, //{types[type{name}]}
            isReal:true
          }
          addPokemon(pokemonObj)
        }
      } catch (error) {
        if (error instanceof AxiosError)
          //manejar excepcion mostrar panel o algo
          console.log('pokemon no existente', error);
        else
          console.log('error', error);
      }
    } else {
      console.log('nombre no introducido');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // desencadeno llamada a api
    searchPokemon(pokemon)

    //clear input and state

    // console.log(e.target['standard-basic'].value);
    e.target['standard-basic'].value = ''
    setPokemon('')
  }

  const handleClick = (e) => {
    clearPokemons()
  }

  const handleChange = (e) => {
    setPokemon(e.target.value)
  }

  useEffect(() => {
    if(firstLoad){
      setFirstLoad(false)
    }else{
      // console.log('set counter 3s');
      //debounce buscar tras 3 seg
      const debounce = setTimeout(() => {
        // console.log('trigger search');
        // console.log(document.getElementById('standard-basic').value);
        searchPokemon()
        document.getElementById('standard-basic').value=''
      }, 3000)
      return () => clearTimeout(debounce)
    }   
  }, [pokemon])

  return (
    <>
      <h2>Busca Pokemon</h2>
      <br />
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor='poke'>Nombre o numero del Pokemon :  </label> */}
        {/* <input type="text" name="poke" id="poke" placeholder='Pokemon Name' onChange={handleChange} /> */}
        <TextField id="standard-basic" label="Nombre o Número Pokemon" variant="standard" onChange={handleChange} />
        <br />
        <br />
        <Button variant="contained" type="submit">Buscar</Button>
      </form>
      <br />
      <Button variant="contained" onClick={handleClick} >Despejar</Button>
    </>
  );
};

export default Search;