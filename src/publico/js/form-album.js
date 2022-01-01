/**
 * Validações na página quanto ao seu preenchimento
 */
$(function () {
  var nomeresp = document.getElementById('nomeresp');
  var cpfresp = document.getElementById('cpfresp');
  var cpf = document.getElementById('cpf');
  //Esconde os campos do responsável pelo menor de idade
  $('#div-resp').hide();
  $('#div-maior').hide();

  //Menor de idade (VALIDAR COM A DATA DO SERVIDOR)
  $('#dataNascimento').on('blur',function () {
    let d = new Date();
    let nA = $('#dataNascimento').val().split("-");
    let n = new Date(nA[1] + '-' + nA[2] + '-' + nA[0]);
    let ano = d.getFullYear() - n.getFullYear();
    let m = d.getMonth() - n.getMonth();
    if (m < 0 || (m === 0 && d.getDate() < n.getDate())) {
      ano--;
    }
    //mostra campos caso seja menor de idade
    if (ano < 18) {
      $('#div-resp').show();
      $("#nomeresp").attr("required", "req");
      $("#cpfresp").attr("required", "req");
      //campo CPF
      $('#div-maior').hide();
    } else {
      $('#div-resp').hide();
      //campo CPF
      $('#div-maior').show();
      $("#cpf").attr("required", "req");
    }
  });
});

$(function(){
  $("#header").load("header");
  $("#footer").load("footer");
});


