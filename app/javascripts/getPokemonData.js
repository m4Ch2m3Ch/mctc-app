import Pokedex from "pokedex-promise-v2";

class pokemonApi {
  constructor() {
    this.P = new Pokedex();
  }

  async getPokemonData() {
    let interval = { limit: 500, offset: 0 };

    try {
      const listResponse = await this.P.getPokemonsList(interval);
      let results = listResponse.results;
      const promises = results.map((result) =>
        this.P.getPokemonByName(result.name).then((pokemonResponse) => {
          let types = pokemonResponse.types.map((type) => type.type.name);

          return {
            ...result,
            sprites: pokemonResponse.sprites.other["official-artwork"],
            icon: pokemonResponse.sprites.front_default,
            height: pokemonResponse.height,
            id: pokemonResponse.id,
            types: types.toString(),
            type_primary: types[0],
            type_secondary: types[1] || "",
            location: pokemonResponse.location_area_encounters,
            weight: pokemonResponse.weight,
            baseExperience: pokemonResponse.base_experience,
          };
        })
      );
      const data = await Promise.all(promises);
      return JSON.stringify(data);
    } catch (error) {
      console.error(error);
    }
  }
}

export { pokemonApi };
