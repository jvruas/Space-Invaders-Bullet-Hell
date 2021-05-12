//Limitando a Quantidade de Erros dentro do arquivo Principal da Aplicação
"use strict";

// Imports
const express = require("express"); // Importando a lib do express para o arquivo possibilitando utilizar seus metodos
const path = require("path"); // Ajuda a Relacionar caminhos utilizados na Aplicação"/"

// Basic Settings
const app = express(); // Inicia a aplicação do Express
const router = express.Router();
const port = process.env.port || 3000; // Definindo a Porta aonde sera rodada a aplicação

app.use("/", router);

//Static Files
// Disponibilizando meus Arquivos CSS, Assets e JS referentes ao front side para serem requisitados diante do server side
app.use("/public", express.static(__dirname + "/public"));

//Rotas/caminhos da Aplicação
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/Views/index.html"));
});

router.get("/Register", (req, res) => {
    res.sendFile(path.join(__dirname + "/Views/register_page.html"));
});

// router.get("/Login", (req, res) => {
//     res.sendFile(path.join(__dirname + "/Views/login_page.html"));
// });

router.get("/Space-Invaders", (req, res) => {
    res.sendFile(path.join(__dirname + "/Views/client_game.html"));
});

// Startando o server na Porta padrão do Node ou na Porta 3000
app.listen(port, (err) => {
    if (err) {
        return console.log("Error:", err);
    }
    console.log(`> Listen on port ${port}`);
});
