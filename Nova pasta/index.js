const express = require("express");// chama a biblioteca express
const app = express();
const bodyParser = require("body-parser");
const conn = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
//database
conn.authenticate()
.then(() =>{
    console.log("Conexão feita com Sucesso")
})
.catch((msgErro) => {
    console.log(msgErro);
})

app.set('view engine','ejs'); // iniando com o EJS
app.use(express.static('public'));// pasta arquivos estáticos
app.use(bodyParser.urlencoded({extended:false}));//Inicia o bodyparser
app.use(bodyParser.json());

// Rotas
app.get("/",function(req,res){ 
    Pergunta.findAll({raw:true, order:[
        ['id','DESC']
    ]}).then(Pergunta =>{
        res.render("index",{
            Pergunta: Pergunta
        });
    });
    
});

app.get("/perguntar",function(req,res){
    res.render("perguntar");
});

app.post("/salvarPergunta",function(req,res){
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(() =>{
        res.redirect("/");
    });
    
});

app.get("/pergunta/:id",(req,res) =>{
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(Pergunta => {
        if(Pergunta != undefined){
            //Resposta.findAll({
               // where: {PerguntaId: Pergunta.id}
            //}).then(respostas =>{
               res.render("pergunta",{
                 pergunta: Pergunta,
                 respostas: respostas
               });
            //});      
        }else{
             res.redirect("/");
        }
    });
});

// Rota da Resposta
app.post("/responder",(req,res) => {
    let corpo = req.body.corpo;
    let Pergunta = req.body.pergunta;
    Resposta.create({
        corpo: corpo,
        PerguntaId: PerguntaId
    }).then(() =>{
        res.redirect("/pergunta/"+ PerguntaId)
    })
    });


// iniciar o servido porta 8181
app.listen(8181,function(erro){
    if(erro){
        console.log("Ocorreu um erro!");
    }else{
        console.log("Servidor iniciado com sucesso!!");
    }
})