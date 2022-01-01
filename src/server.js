const express = require("express");

const app = express();
const multer = require('multer');
import path from 'path';
import { criaAlbum } from './api/controllers/AlbumController';
//const upload = multer({dest: 'uploads/'});


/**
 * Cria uma instancia do middleware configurada
 * distination: lida com o destino
 * filename: permmite definir o nome do arquivo
 */

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    //req = requisiçao
    //file = arquivvo
    //cb = funcao callback
    //primeiro parametro = erro
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb){
     //primeiro parametro = erro
     // salvando com o nome do input e a data atual
     //cb(null, file.fieldname + '-' + Date.now())
     //cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)

     //salvando com o mesmo nome do arquivo
     cb(null,file.originalname);
  }
});

//utiliza a storage para configurar a instancia do multer
const upload = multer({ storage });

/**
 * Configuração do parser para requisições post
 */
 app.use(express.json());
 app.use(express.urlencoded({
     extended: true
 }))

 /**
 * Conexão com banco de dados via pool de conexões
 * https://node-postgres.com/
 */
  const pool = require('./dao/conexao');

  app.use(express.json());
  app.use(express.urlencoded({
      extended: true
  }))

const PORTA = process.env.PORT || 3000;
 app.listen(PORTA, function(){
     console.log("Servidor rodando na porta 3000");
 })

 const routes = require('./api/routes');
 routes(app);


//caminhos
app.use('/views', express.static(__dirname + '/views'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/uploads', express.static('./uploads'));
app.use('/publico', express.static(__dirname + '/publico'));
app.use('/bscss', express.static('./node_modules/bootstrap/dist/css'));
app.use('/bsjs', express.static('./node_modules/bootstrap/dist/js'));
app.use('/popperjs', express.static('./node_modules/@popperjs/core/dist/umd'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));

// requisição - upload de arquivos
app.post('/uploadFoto',upload.single('nome_foto'), function(req,resp){
 console.log("Erro na foto:");
 resp.end();
});

/**
 * Condiguração das paginas
 */

app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

/**
 * Rota teste
 */
 app.get('/teste', function(req,resp){
  resp.render('teste')
});

//requisições

app.get('/', function(req,resp){
  resp.render('index')
});

app.get('/index', function(req,resp){
  resp.render('index')
});


app.get('/album', function(req,resp){
   resp.render('album')
});

app.get('/relatorioalbuns', function(req,resp){
  resp.render('relatorioalbuns')
});

app.get('/login', function(req,resp){
  resp.render('login')
});

app.get('/header', function(req,resp){
  resp.render('header')
});

app.get('/footer', function(req,resp){
  resp.render('footer')
});

app.post('/album',function(req, resp){

    pool.query(criaAlbum(req)).catch(err => console.log('erro: ' + err));;

   resp.render('album');
});