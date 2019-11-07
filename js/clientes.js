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

cadastrar = function(form){
    $.post( "http://localhost:3000/usuarios/", form.serialize() ).done(function(data){
        if (!data.erro) {
            form.each(function(data){
                    //limpar formulário
                    this.reset();
            });

            $("#modalInc").closeModal();
        }
        alert(data.mensagem);
    });
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
    e.preventDefault();
    var data = $(this).serializeFormJSON();
    console.log(data);

    /* Object
        email: "value"
        name: "value"
        password: "value"
     */
});
