const cepInput = document.querySelector('#cep')
const numInput = document.querySelector('#numero')
const cidadeInput = document.querySelector('#cidade')
const ruaInput = document.querySelector('#rua')
const formulario = document.querySelector('form');
const validadorEmail = document.querySelector('.validador-email');
const email = document.querySelector('#e-mail');
const validadorCep = document.querySelector('.validador-cep')

formulario.addEventListener('submit', function (event) {
    if (email.value.length < 8) {
        event.preventDefault();
    }
});

formulario.addEventListener('change', function () {
    if (email.value.length !== 0 && email.value.length < 8) {
        validadorEmail.style.display = '';
        validadorEmail.textContent = "E-mail Inválido";
        validadorEmail.style.color = "red";
    } else {
        validadorEmail.style.display = 'none';
    }
});

cepInput.addEventListener('change', function () {
    if (cepInput.value === "") {
        numInput.value = '';
        cidadeInput.value = '';
        ruaInput.value = '';
        validadorCep.style.display = 'none';
        return
    }

    if (cepInput.value.length !== 8) {
        validadorCep.style.display = '';
        validadorCep.textContent = "CEP com 8 dígitos alecrim dourado";
        validadorCep.style.color = "red";
        return
    } else {
        validadorCep.style.display = 'none';
    }


    const promiseResposta = fetch(`https://viacep.com.br/ws/${cepInput.value}/json/`);

    promiseResposta.then(function (respostaVerdadeira) {
        if (!respostaVerdadeira.ok) {
            console.log('ERRO')
            return;
        }
        const promiseBody = respostaVerdadeira.json()
        promiseBody.then(function (body) {
            if (body.erro) {
                validadorCep.style.display = '';
                validadorCep.textContent = "Esse CEP não funfa... Vamos de Novo?";
                validadorCep.style.color = "red";
                console.log('ERRO')
                return
            }

            numInput.value = body.complemento
            cidadeInput.value = body.localidade
            ruaInput.value = body.logradouro
        })
    });
});