$(document).ready(function(){
    $.get("http://localhost:3000/imagens/", function (imgs) {
        let url;
        for (let index = 0; index < imgs.length; index++) {
            url = imgs[index].urlImagem
            listarVeiculosImgs(index, url);
        }
    });
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

/* $('.minus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
 
    if (value 1) {
        value = value - 1;
    } else {
        value = 0;
    }
 
  $input.val(value);
 
});
 
$('.plus-btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
 
    if (value &amp;lt; 100) {
        value = value + 1;
    } else {
        value =100;
    }
 
    $input.val(value);
});
 */
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

 incrementaBadge = function(){
    var $span = $('#mySpanId');
    $span.text(Number($span.text()) + 1);
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
