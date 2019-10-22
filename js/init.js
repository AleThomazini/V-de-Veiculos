// Get the modal
var modal = document.getElementById('modalCadastro');

var btnCadastrar = document.getElementById("btnInclusao");

// Aponta para tabela do index.php 
var tblItens = $("#tblListar");

// When the user clicks on the button, open the modal 
btnCadastrar.onclick = function() {
    cadastrar($("#formCadastro"));
};

listarClientes("tbody");


