const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
// const porta = 3000; //porta padrão
const sql = require('mssql');
const conexaoStr = "Server=regulus;Database=BD17405;User Id=BD17405;Password=13175667;";

//conexao com BD
sql.connect(conexaoStr)
	.then(conexao => global.conexao = conexao)
	.catch(erro => console.log(erro));

app.use(session({
	secret: 'sportsCar',
	proxy: true,
	resave: true,
	saveUninitialized: true,
}));

// configurando o body parser para pegar POSTS mais tarde   
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//acrescentando informacoes de cabecalho para suportar o CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PATCH, DELETE");
	next();
});
//definindo as rotas  
const rota = express.Router();
var sess;
rota.get('/', (requisicao, resposta) => {
	sess = requisicao.session;
	sess.email;
	sess.username;
	resposta.json({ mensagem: 'Funcionando!' });
});

app.use('/', rota);

//inicia servidor
// app.listen(porta);
console.log('API Funcionando!');

function execSQL(sql, resposta) {
	global.conexao.request()
		.query(sql)
		.then(resultado => resposta.json(resultado.recordset))
		.catch(erro => resposta.json(erro));
}

app.post('/login', (req, res) => {
	sess = req.session;
	sess.email = req.body.email;
	res.end('done');
});

app.get('/admin', (req, res) => {
	sess = req.session;
	if (sess.email) {
		res.write(`<h1>Hello ${sess.email} </h1><br>`);
		res.end('<a href=' + '/logout' + '>Logout</a>');
	} else {
		res.write('<h1>Please login first.</h1>');
		res.end('<a href=' + '/' + '>Login</a>');
	}
});

app.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return console.log(err);
		}
		res.redirect('/');
	});
});

app.listen(process.env.PORT || 3000, () => {
	console.log(`Aplicação iniciada na porta ${process.env.PORT || 3000}`);
});

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