import { IHeroCardProps, textdefaults } from "../HeroCard";
import React from "react"
import styled from "styled-components";
import AttributeList from "./AttributeList";

const HeroFront = styled.div`
border: 2px solid #001147;
margin: 2rem;
padding: 4rem;
background: rgba(0, 17, 71,0.2);
animation: flip 1s;

@keyframes flip {
  from {
    transform: rotateY(-180deg);
  }

  to {
    transform: rotateY(0deg);
  }
}
`
const Flex = styled.div`
display: flex;
`
const Heading = styled.h3`
${textdefaults}
color: #001147;
margin-left: 5%;
margin-right: 5%;
`
const Image = styled.img`
margin-left: auto;
margin-right: 2%;
border: 1px solid black;
`

const Desc = styled.p`
${textdefaults}
`
const HoverBox = styled.div`
position: absolute;
background-color: white;
width: 30%;
margin: auto;
padding: 2rem;
border: 1px solid #001147;
border-radius: 8px; 
z-index: 1;
`

const Abilites = styled.div`
padding: 1rem;
border-top: 2px solid #001147;
border-bottom: 2px solid #001147; 
display: grid;
grid-template-columns: 40% 40% 20%;
grid-template-rows: auto auto auto; 
grid-auto-flow: row;
background-color: rgba(0,71,54, 0.4);
`
const Ability = styled.p`
${textdefaults}
`
const AbilityName = styled.p`
${textdefaults}
font-weight: 800;
`
const SideInfo = styled.h4`
${textdefaults}
color: #001147;
margin: auto;
text-decoration: underline;
padding: 1rem;
cursor: pointer;
`

type modaltype = "backstory" | "attributes"

interface Props {
  hero: IHeroCardProps
  onClick: () => void
}


const Front:React.FC<Props> = ({hero, onClick}) => {
    const [imgScale,scale] = React.useState(1)
    const [showingAbilities, showAbilites] = React.useState(false)
    const [showingBackstory, showBackstory] = React.useState(false)   
    const handleScale = (scalefactor: number) => {
        scale(scalefactor)
      }
      
      const handleModals =(clicktype: modaltype) => {
        switch(clicktype) {
          case "attributes":
            showAbilites(!showingAbilities)
            showBackstory(false)
          break;
          case "backstory":
            showAbilites(false)
            showBackstory(!showingBackstory)
          break;
        }
      }
      const Abilities = ()=>(
        <HoverBox onClick={()=> showAbilites(false)}>
          <Heading>Attributes of {hero.name}:</Heading>
          <AttributeList heroattributes={hero.attributes}/>
        </HoverBox>
      )
      const BackStory =() => (
        <HoverBox onClick={()=> showBackstory(false)}>
          <Heading>{hero.name}</Heading>
          <Desc>{hero.backStory}</Desc>
        </HoverBox>
      )
      
      return (
        <HeroFront>
           {showingAbilities && <Abilities/>}
           {showingBackstory && <BackStory/>}
          <Flex>
          <Heading>{hero.name}</Heading>
          <Image onClick={() => onClick()} onMouseEnter={() => handleScale(2)} onMouseLeave={() => handleScale(1)} width={imgScale * 75} height={imgScale *75} src={hero.imgUrl} alt={'whoops'}></Image>
          </Flex>
          <Heading>Who is {hero.name}</Heading>
          <Desc>{hero.description}</Desc>
          <Flex>
          <Heading>Abilities</Heading>
          <SideInfo onClick={() =>  handleModals("backstory")} >Backstory</SideInfo>
          <SideInfo onClick={() => handleModals("attributes")}>Statistics</SideInfo>
          </Flex>
          <Abilites>
            <AbilityName>Name</AbilityName>
            <AbilityName>Element</AbilityName>         
            <AbilityName>Damage</AbilityName>   
            {hero.skills.map(s => {
              return (<>
              <Ability>{s.name}</Ability>
              <Ability>{s.element}</Ability>
              <Ability>{s.damage}</Ability>
              </>)
            })}        
            
          </Abilites>
        </HeroFront>
      )
}

export default Front