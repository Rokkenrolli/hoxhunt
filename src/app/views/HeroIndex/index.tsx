import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from 'react-apollo-hooks';
import styled from 'styled-components';

import { TopBar } from '../../components/TopBar';
import { Hero } from '../../components/Hero';
import { Section } from '../../components/Section';
import { Footer } from '../../components/Footer';
import { HeroCard } from '../../components/HeroCard';


const HEROES_QUERY = gql`
	query {
		heroes {
			name
			imgUrl
			description
			backStory
			attributes {
				strength
				intelligence
				stamina
				healthpoints
				mana
				agility
				speed
				resistance
				weakness
			}
			skills {
				name
				damage
				element
			}
		}
	}
`;

interface IHeroIndexProps {}

const HeroCardContainer = styled.div`
	display: flex;
	padding: 50px;
	align-self: center;
	max-width: 1150px;
	@media (min-width: 1400px) {
		margin-left: auto;
		margin-right: auto;
	}
	@media (max-width 600px) {
		display: block;
	}
`;

 const Introduction = styled.h2`
  color: #004736;
  font-family: "Montserrat";
  font-weight: 800;
  font-size: 32px;
  line-height: 39px;
  letter-spacing: 1.15px;
  text-align: center;
`;

const handleLoading = () => <div>Loading...</div>;

const handleError = (message: string) => <div>Error! {message}</div>;

export const HeroIndex: React.FC<IHeroIndexProps> = () => {
	const { data, error, loading } = useQuery(HEROES_QUERY);

	if (error) {
		return handleError(error.message);
	}

	if (loading) {
		return handleLoading();
	}

	return (
		<main>
			<TopBar />
			<Hero />
			<Section
				heading={'Hunter Index'}
				paragraph={`
          Professor Hoax gave us this Hunter Index -tool 
          so we can see how our heroes manage against evildoers. 
          Unfortunately he forgot to implement their HeroCards. 
          It's your job to finish his work before we can continue
          on our journey together!
        `}
			/>

			{/** Improve this section. Data provided is defined on top in GraphQL query. You can decide what you use and what you dont't.*/}
			<Introduction>{`Let's meet our fabled heroes!`}</Introduction>
			<Introduction>By peeking (clicking) behind the cardbacks!</Introduction>
			<HeroCardContainer>
				{data.heroes.map((hero) => (
					<HeroCard key={hero.name} {...hero} />
				))}
			</HeroCardContainer>

			<Footer />
		</main>
	);
};
