const express = require('express');
const app = express();         
const bodyParser = require('body-parser');
const porta = 3000; //porta padrão
const sql = require('mssql');
const conexaoStr = "Server=regulus;Database=BD17405;User Id=BD17405;Password=13175667;";

//conexao com BD
sql.connect(conexaoStr)
   .then(conexao => global.conexao = conexao)
   .catch(erro => console.log(erro));

// configurando o body parser para pegar POSTS mais tarde   
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
//acrescentando informacoes de cabecalho para suportar o CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PATCH, DELETE");
  next();
});
//definindo as rotas  
const rota = express.Router();
rota.get('/', (requisicao, resposta) => resposta.json({ mensagem: 'Funcionando!'}));
app.use('/', rota);

//inicia servidor
app.listen(porta);
console.log('API Funcionando!');

function execSQL(sql, resposta) {
	global.conexao.request()
				  .query(sql)
				  .then(resultado => resposta.json(resultado.recordset))
				  .catch(erro => resposta.json(erro));
}

//o simbolo ? indica que id na rota abaixo é opcional
rota.get('/veiculos/:id?', (requisicao, resposta) => {
	let filtro = '';
	if (requisicao.params.id) 
		filtro = ' WHERE ID=' + parseInt(requisicao.params.id);
	execSQL('SELECT * from Veiculo' + filtro, resposta);
})

rota.get('/imagens/:id?', (requisicao, resposta) => {
	let filtro = '';
	if (requisicao.params.id) 
		filtro = ' WHERE IdVeiculo=' + parseInt(requisicao.params.id);
	execSQL('SELECT * from Imagens' + filtro, resposta);
})

rota.get('/usuario/:id?', (requisao, resposta) => {
	let filtro = '';
	if (requisao.params.id)
		filtro = ' WHERE idUsuario=' + parseInt(requisao.params.id);
	execSQL('SELECT + from Usuario' + filtro, resposta);
})