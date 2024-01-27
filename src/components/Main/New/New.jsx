import React,{useContext, useEffect,useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { PokemonContext } from "../../../context/pokemonContext";

import {useNavigate} from "react-router-dom";

const New = () => {

  let firstLoad = true;

  const navigateTo = useNavigate();

  const {addPokemon} = useContext(PokemonContext)

  const [types,setTypes] = useState([])

  const getTypes = async ()=>{
    const res = await axios.get('https://pokeapi.co/api/v2/type/')
    if(res.data){
      setTypes(res.data.results)
      //console.log('types loded ',res.data.results);
    }
  }

  useEffect(()=>{
    if(firstLoad){
      //console.log('first load');
      getTypes();
      firstLoad = false;
    }
  },[firstLoad])

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = (data) => {

    let myTypes = []

    myTypes.push({type:{name:data.typeOne}})

    if(data.typeTwo){
      myTypes.push({type:{name:data.typeTwo}})
    }

    const pokemonObj = {
      name: data.name,
      id: data.id,
      url: data.image,
      types: myTypes,
      isReal: false
    }

    addPokemon(pokemonObj)

    alert('pokemon: añadido: '+ pokemonObj.name)

    navigateTo('/home'); // Redirect to home

    // console.log('pokemon registrado ' ,pokemonObj);
      
  }

  //console.log(watch("name")) // watch input value by passing the name of it

  return (
    <form id="newPokeForm" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <label {...register("id")} >Id numero:</label>
        <input type="number" placeholder='0000'  {...register("id", { required: true })} />
        {errors.id && <span>This field is required</span>}
      </fieldset>

      <fieldset>
        <label {...register("name")} >Nombre:</label>
        <input placeholder='Nombre'  {...register("name",{minLength:3,required:true})} />
        {errors.name && <span>This field is required</span>}
      </fieldset>

      <fieldset>
        <label {...register("image")} >Url imagen:</label>
        <input type='url' placeholder='imagen url'  {...register("image",{required:true})} />
        {errors.image && <span>This field is required</span>}
      </fieldset>

      <fieldset>
        <label {...register("typeOne")}>Tipo</label>
        <select {...register("typeOne",{required:true})}>
          {types? types.map(t => <option key={t.name} value={t.name}>{t.name}</option>):''}
        </select>
        {errors.typeOne && <span>This field is required</span>}
      </fieldset>

      <fieldset>
        <label {...register("typeTwo")}>Tipo</label>
        <select {...register("typeTwo")}>
          {types? types.map(t => <option key={t.name} value={t.name}>{t.name}</option>):''}
        </select>
      </fieldset>
      
      <input type="submit" />
    </form>
  )
};

export default New;
