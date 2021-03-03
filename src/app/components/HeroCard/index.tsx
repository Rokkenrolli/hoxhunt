// It is your job to implement this. More info in README

import * as React from 'react'
import styled from 'styled-components'
import Front from './Front'



export interface Attributes {
  strength: number
  intelligence: number
  stamina: number
  healthpoints: number
  mana: number
  agility: number
  speed: number
  resistance: string
  weakness: string
}
interface Skills {
  name: string
	damage: number
	element: string
}
export interface IHeroCardProps {
  name: string
  imgUrl: string
  description: any
  skills: Skills[]
  backStory: string
  attributes: Attributes
}

export const textdefaults = `
font-family: "Montserrat";
`


const BackImg = styled.img`
margin: 2rem;
border: 2px solid #001147;
animation: flip 1s;

@keyframes flip {
  from {
    transform: rotateY(180deg);
  }

  to {
    transform: rotateY(0deg);
  }
}
`






export const HeroCard: React.FC<IHeroCardProps> = (props) => {
   
  const [frontShowing, flip] = React.useState(false)

  return (<div>
  {frontShowing ?
  <div>
  <Front key="front"
  onClick={()=> flip(!frontShowing)}
  hero={props} 
 />
  </div>
   :
   <BackImg key="back"
    onClick={()=> flip(!frontShowing)}
    src={props.imgUrl}
    width={400}
    height={400}  />}
    </div>
    )

}
