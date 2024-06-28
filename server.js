//Load HTTP module
import express from "express";
import { pokemonApi } from "./app/javascripts/getPokemonData.js";

const app = express();
const port = 8384;

app.use(express.static("app"));
app.use(express.json());

app.post("/pokemon/data", async (req, res) => {
  const pokemon = new pokemonApi();

  const data = await pokemon.getPokemonData();

  if (data) {
    res.status(200).send(data);
  } else {
    res.status(404).json({ error: "Data not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
