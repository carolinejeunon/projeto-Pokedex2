const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
let message = "";


app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public"))); //tá falando que vc vai usar a pasta public como padrão
app.use(express.urlencoded());
const pokedex = [{
    number:007, 
    nome: 'Squirtle', 
    tipo: 'Water', 
    imagem: src='img/squirtle.png', 
    descricao: 'When it retracts its long neck into its shell, it squirts out water with vigorous force.', 
    altura: '0.5m', 
    peso: '9.0 kg', 
    categoria: 'Tiny Turtle' , 
    habilidade: 'Torrent'
  },

  {
    number: 025, 
    nome: 'Pikachu', 
    tipo: 'Electric', 
    imagem: src='img/pikachu.png', 
    descricao: 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.', 
    altura: '0.4m', 
    peso: '6.0 kg', 
    categoria: 'Mouse', 
    habilidade: 'Static'
  },

  {
    number: 012, 
    nome: 'Butterfree', 
    tipo: 'Bug', 
    imagem: src='img/butterfree.png', 
    descricao: 'In battle, it flaps its wings at great speed to release highly toxic dust into the air.', 
    altra: '1.1m', 
    peso: '32.0 kg', 
    categoria: 'Butterfly', 
    habilidade: 'Compound Eyes'
  }
]

app.get("/", (req, res) => {
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index", {pokedex});
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

/*app.post("/new", (req, res) => {
  console.log(req.body);
  const {number, nome, tipo, image, descricao, altura, peso, categoria, habilidade} = req.body;
  pokedex.push({number: number, nome: nome, tipo: tipo, imagem: image, descricao: descricao, altura: altura, peso: peso, categoria: categoria, habilidade: habilidade});
  message = "Pokemon adicionado! :)";
  res.redirect("/");
});*/

app.post("/new", (req, res) => {
  const {nome, tipo, imagem, descricao, altura, peso, categoria, habilidade} = req.body;
  const pokemon = {
    nome: nome,
    tipo: tipo,
    image: "/img/"+imagem,
    descricao: descricao,
    altura: altura,
    peso: peso,
    categoria: categoria,
    habilidade: habilidade
  }; 
  pokedex.push(pokemon);
  mensagem = `O Pokemon ${nome} foi cadastrado com sucesso!`
  res.redirect("/");
})

app.get("/detalhes/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = pokedex[id];
  res.render("detalhes", {
    pokemon,
  });
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));