
var form = document.getElementById("dataForm");

if (form.addEventListener) {
  form.addEventListener("submit", validarFormulario);
} else if (form.attachEvent) {
  form.attachEvent("onsubmit", validarFormulario);
}

function uploadFile() {
  //let arquivo = $(nomeFoto).val().split(/(\\|\/)/g).pop();
  $('#foto').clone().appendTo("#fileForm");

  let myForm = document.getElementById('fileForm');
  let formDataFile = new FormData(myForm);

  $.ajax({
    url: '/uploadFoto', // Url do lado server que vai receber o arquivo
    data: formDataFile,
    processData: false,
    contentType: false,
    type: 'POST',
    success: function (data) {
      //retorno ao usuário depois da resposta do servidor
    }
  });
}

function validarFormulario(evt) {
  var nome = document.getElementById('nome');
  var dataNascimento = document.getElementById('dataNascimento');
  var cpf = document.getElementById('cpf');
  var email = document.getElementById('email');
  var telefone = document.getElementById('telefone');
  var estado = document.getElementById('estado');
  var cidade = document.getElementById('cidade');
  var nomeresp = document.getElementById('nomeresp');
  var cpfresp = document.getElementById('cpfresp');
  var titulo = document.getElementById('titulo');
  var nomeFotogra = document.getElementById('nomeFotogra');
  var foto = document.getElementById('foto');
  var termo = document.getElementById('termo');
  var filtro = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  var contErro = 0;


  /* Validação do campo nome */
  caixa_nome = document.querySelector('.msg-nome');
  if (nome.value == "") {
    caixa_nome.innerHTML = "Favor preencher o Nome";
    caixa_nome.style.display = 'block';
    contErro += 1;
  } else {
    caixa_nome.style.display = 'none';
  }

  /* Validação do campo CPF */


  caixa_cpf = document.querySelector('.msg-cpf');
  if (cpf.value == "" || cpf.value < 11) {
    caixa_cpf.innerHTML = "Favor preencher o CPF corretamente";
    caixa_cpf.style.display = 'block';
    contErro += 1;
  } else {
    caixa_cpf.style.display = 'none';
  }




  /* Validação do campo data de nascimento */
  caixa_data = document.querySelector('.msg-dataNascimento');
  if (dataNascimento.value == "") {
    caixa_data.innerHTML = "Favor preencher com a data de nascimento";
    caixa_data.style.display = 'block';
    contErro += 1;
  } else {
    caixa_data.style.display = 'none';
  }



  /* Validação do campo email */
  caixa_email = document.querySelector('.msg-email');
  if (email.value == "") {
    caixa_email.innerHTML = "Favor preencher o E-mail";
    caixa_email.style.display = 'block';
    contErro += 1;
  } else if (filtro.test(email.value)) {
    caixa_email.style.display = 'none';
  } else {
    caixa_email.innerHTML = "Formato do E-mail inválido";
    caixa_email.style.display = 'block';
    contErro += 1;
  }

  /* Validação do campo telefone */
  caixa_telefone = document.querySelector('.msg-telefone');
  if (telefone.value == "" || telefone.value < 11) {
    caixa_telefone.innerHTML = "Favor preencher o campo telefone corretamente com o DDD";
    caixa_telefone.style.display = 'block';
    contErro += 1;
  } else {
    caixa_telefone.style.display = 'none';
  }

  /* Validação do campo estado */
  caixa_estado = document.querySelector('.msg-estado');
  if (estado.value == "") {
    caixa_estado.innerHTML = "Favor selecionar o estado";
    caixa_estado.style.display = 'block';
    contErro += 1;
  } else {
    caixa_estado.style.display = 'none';
  }

  /* Validação do campo cidade */
  caixa_cidade = document.querySelector('.msg-cidade');
  if (cidade.value == "") {
    caixa_cidade.innerHTML = "Favor selecionara cidade";
    caixa_cidade.style.display = 'block';
    contErro += 1;
  } else {
    caixa_cidade.style.display = 'none';
  }



  /* Validação do campo CPF caso menor */

  caixa_cpfresp = document.querySelector('.msg-cpfresp');
  $('#dataNascimento').on('blur', function () {
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
      if (cpfresp.value == "" || cpfresp.value < 11) {
        caixa_cpfresp.innerHTML = "Favor preencher o CPF do responsavel corretamente";
        caixa_cpfresp.style.display = 'block';
        contErro += 1;
      }
    } else {

      caixa_cpfresp.style.display = 'none';
    }

  });


  /* Validação do campo Nome do responsavel caso menor */

  caixa_nomeresp = document.querySelector('.msg-nomeresp');
  $('#dataNascimento').on('blur', function () {
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
      if (nomeresp.value == "") {
        caixa_nomeresp.innerHTML = "Favor preencher o nome do responsavel corretamente";
        caixa_nomeresp.style.display = 'block';
        contErro += 1;
      }
    } else {

      caixa_nomeresp.style.display = 'none';
    }

  });


  /* Validação do campo titulo */
  caixa_titulo = document.querySelector('.msg-titulo');
  if (titulo.value == "") {
    caixa_titulo.innerHTML = "Favor preencher campo titulo";
    caixa_titulo.style.display = 'block';
    contErro += 1;
  } else {
    caixa_titulo.style.display = 'none';
  }

  /* Validação do campo nome do fotografo */
  caixa_nomefotogra = document.querySelector('.msg-nomeFotogra');
  if (nomeFotogra.value == "") {
    caixa_nomefotogra.innerHTML = "Favor preencher campo nome do fotografo(a)";
    caixa_nomefotogra.style.display = 'block';
    contErro += 1;
  } else {
    caixa_nomefotogra.style.display = 'none';
  }

  /* Validação do campo arquivo de foto */
  caixa_foto = document.querySelector('.msg-foto');
  if (foto.value == "") {
    caixa_foto.innerHTML = "Favor selecionar o arquivo de imagem";
    caixa_foto.style.display = 'block';
    contErro += 1;
  } else {
    caixa_foto.style.display = 'none';
  }

  /* Validação do campo termo */
  caixa_termo = document.querySelector('.msg-termo');
  if (termo.checked) {
    caixa_termo.style.display = 'none';
  } else {
    caixa_termo.innerHTML = "Favor deve ler os termos e aceita-los para prosseguir";
    caixa_termo.style.display = 'block';
    contErro += 1;
  }



  /* if (contErro == 0) {
    uploadFile();
    return true;
  } else {
    alert(contErro);
    return false;
  } */

  uploadFile();

}
