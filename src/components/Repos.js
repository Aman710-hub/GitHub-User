import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
import { useGlobalContext } from "../context/context";

const Repos = () => {
  const { repos } = useGlobalContext();
  let languages = repos.reduce((accum, currentValue) => {
    const { language, stargazers_count } = currentValue;
    // we itirate "repos" and if in some itirations "language" is null then code will stoped with "return"
    if (language === null) return accum; // when we do this "return" code below will not be executed
    // if "language" property not in the object then create new one
    if (!accum[language]) {
      // for example - if we met HTML for the first time then
      // HTML = 1
      accum[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      accum[language] = {
        ...accum[language],
        value: accum[language].value + 1,
        stars: accum[language].stars + stargazers_count,
      };
    }
    return accum;
    // {} - is inial value
  }, {});

  // Object.value - allow us to turn object into a itireble object (array)
  const mostUsed = Object.values(languages)
    // sort - is mathod that allow us to sort an array
    .sort((a, b) => {
      // here we sorting by who is bigger
      return b.value - a.value;
    })
    // and returning that sorted array from index 0 to 5
    .slice(0, 5);

  // MOST STARTS PER LANGUAGE
  const starsPerLanguage = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // STARS, FORKS
  let { stars, forks } = repos.reduce(
    (accum, currentValue) => {
      const { stargazers_count, name, forks } = currentValue;
      accum.stars[stargazers_count] = { label: name, value: stargazers_count };
      accum.forks[forks] = { label: name, value: forks };
      return accum;

      // this is just inial values
    },
    { stars: {}, forks: {} } // ******************************************
  );

  // -5 - is getting the last 5 items of the array
  forks = Object.values(forks).slice(-5).reverse();
  stars = Object.values(stars).slice(-5).reverse();

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={starsPerLanguage} />
        <Bar3D data={forks} />

        {/* <ExampleChart />; */}
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
