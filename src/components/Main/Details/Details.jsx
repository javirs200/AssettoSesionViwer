import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toAsteriscString from '../../../utils/formatter'

const Details = () => {

  const [pkm, setPkm] = useState()

  const { id } = useParams()

  const findId = async () => {
    try {
      // console.log('lamada api con pokemon id');
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)//trows axios error if pokemon not exist  , beacuse endpoint not exist
      if (res.data) {
        const pokemonObj = {
          name: res.data.name,
          id: toAsteriscString(res.data.id),
          //cdn pokemon iconos animados 
          url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${res.data.id}.gif`,
          types: res.data.types,
          height: res.data.height,
          weight: res.data.weight,
          abilities: res.data.abilities,
          stats: res.data.stats,
        }
        setPkm(pokemonObj)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    findId()
  }, [id])


  return (
    <div className="Details">
      <h2>Detalles id:{id}</h2>
      {pkm ?
        <div className="detailCard">
          <section className="card">
            <h2>{pkm.name}</h2> <h3>{pkm.id}</h3>
            <img src={pkm.url} alt={pkm.name} />
            <p>{pkm.types.map(el =>
              <span className={`type ${el.type.name}`} key={el.type.name}></span>
            )}</p>
          </section>
          <section className="about">
            <h3>Fisico</h3>
            <article>
              <p>Peso: {pkm.weight}</p>
              <p>Altura: {pkm.height}</p>
            </article>
          </section>
          <section className="abilities">
            <h3>Abilidades</h3>
            <article>
              {pkm.abilities.map(el => <p key={el.ability.name}>{el.ability.name}</p>)}
            </article>
          </section>
          <section className="stats">
            <h3>Stats iniciales</h3>
            <article>
              {pkm.stats.map(el => <p key={el.stat.name}>{el.stat.name} | {el.base_stat} <progress value={el.base_stat} max={255}></progress></p>)}
            </article>
          </section>
        </div>
        : ''}
    </div>

  )

}

export default Details;
