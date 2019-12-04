let itensLista = [];
$(document).ready(function(){
    itensLista = [];
    $.get("http://localhost:3000/imagens/", function (imgs) {
        let url;
        for (let index = 0; index < imgs.length; index++) {
            url = imgs[index].urlImagem
            listarVeiculosImgs(index, url);
        }
    });

    $(document).on('click', 'input[name="increment"]', function(e) {
      incrementValue(e);
    });
    
    $(document).on('click','input[name="decrement"]', function(e) {
      decrementValue(e);
    }); 

    $(document).on('click', 'button[name="removerItem"]', function(e) {
      let index = $(e.currentTarget).data('value');
      removerItemCarrinho(index);
    });

    adicionarItemCarrinho(1, 'audi.png', 'Nome Produto', 'Status Produto', 10, 1000000)
})

function listarVeiculosImgs(id, imagem) {
    $("#img-Veiculo" + id).attr({src: "img/" + imagem})
    $(".carSlide" + id).attr({src: "img/" + imagem})
}

carrinhoImages = function(){}

cadastrar = function(form){
    $.post( "http://localhost:3000/cadastro", form.serialize() )
        .done(function(data){ }
    );
};

(function ($) {
    $.fn.serializeFormJSON = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);

$('form').submit(function (e) {
    debugger
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    console.log(data);
});


totalValor = function(){
    var items = $('#cart div.cart-item');
    var total = 0;
    items.each(function (){     
      total += value;
      incrementValue();
    });
}

 
addicionarItem = function(id, produto){
    var element = document.getElementById(elementId)
    for (var i = 0; i < produtos.length; i++) {
        var item = $(produtos[i]);        
}
};

 atualizaDados = function(){
    var carrinhos = $(".carrinho");
    carrinhos.each(function(){
      var carrinho = $(this);
      var itens = carrinho.find(".item-total:visible");
      var total = 0;
      for (var i = 0; i < itens.length; i++) {
        var item = $(itens[i]);
        var valor = parseFloat(item.text());
        total = total + valor;
      }
      console.log("Valor total: " + total);
      carrinho.find(".valor-total").text(total);
      carrinho.find(".quantidade-itens").text(itens.length);
    });
  };
  
   removeItem = function(event){
    event.preventDefault();
    var self = $(this);
    self.closest("tr").hide();
    atualizaDados();
  };

$("#submit").click(function () {
    debugger
    email = $("#email").val();
    pass = $("#password").val();
    /*
    * Perform some validation here.
    */
    $.post("http://localhost:3000/login", { email: email, pass: pass }, function (data) {
        debugger
        if (data === 'done') {
            window.location.href = "http://localhost:3000/admin";
        }
    });
});


$('#checkout').click(function(){  
    alert("Compra efetuada com sucesso!");
});



function incrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var index = $(e.target).data('value');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10) + 1;
    var item = itensLista.find(e => e.index == index);
    if (item) { 
      item.quantidade = currentVal
    }
    if (!isNaN(currentVal)) {
      parent.find('input[name=' + fieldName + ']').val(currentVal);
    } else {
      parent.find('input[name=' + fieldName + ']').val(0);
    }

    atualizarValores()
  }
  
  function decrementValue(e) {
    e.preventDefault();
    var fieldName = $(e.target).data('field');
    var parent = $(e.target).closest('div');
    var index = $(e.target).data('value');
    var currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10) -1;
    var item = itensLista.find(e => e.index == index);
    if (item) { 
      item.quantidade = currentVal
    }
    if (!isNaN(currentVal) && currentVal > 0) {
      parent.find('input[name=' + fieldName + ']').val(currentVal);
    } else {
      parent.find('input[name=' + fieldName + ']').val(0);
    }
    atualizarValores();
  } 

  adicionarItemCarrinho = (index,imagem, nomeProduto, status, quantidade, valor) => {
    itensLista.push({ 
      index,
      quantidade,
      valor
    })
    const corpoTabela = $('#corpoTabela');
    let html = (corpoTabela.html() ? corpoTabela.html() : "");
    let tr = "<tr id='tr_"+index+"'>";
    tr += '<td><img class="shopcar" src="img/'+ imagem +'" /> </td>';
    tr += '<td>'+nomeProduto+'</td><td>'+status+'</td>'
    tr += '<td><div class="input-group"><input type="button" value="-" class="button-minus" name="decrement" data-field="quantity" data-value="'+index+'"><input type="number" step="1" max="" value="'+quantidade+'" name="quantity" class="quantity-field"><input type="button" value="+" class="button-plus" data-field="quantity" name="increment" data-value="'+index+'"></div></td>';
    tr += '<td class="text-right" id="valor">'+valor+'</td><td class="text-right"><button class="btn btn-sm btn-danger" name="removerItem" data-value="'+index+'"><i class="fa fa-trash"></i> </button> </td>';
    tr += "</tr>"
    html += tr;
    corpoTabela.html(html);

    atualizarValores();
  }

  removerItemCarrinho = (index) => { 
    let tr = $('#tr_' + index);
    if (tr) {
      tr.remove();
      itensLista = itensLista.map(e => e.index != index);
      atualizarValores();
    }
  }

  atualizarValores = () => { 
    let valores = itensLista.map(e => {
     return e.quantidade * e.valor
    })
    let valor = valores.reduce((previous, currentValue) => previous + currentValue);
    let html = '<tr><td colspan="5"><strong>Total</strong></td><td class="valor-total"><strong>R$</strong>'+ valor +'</td></tr>';
    $('#rodapeTabela').html(html);
  }
