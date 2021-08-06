const criptoInput = document.querySelector('#cripto');
const player = document.querySelector('.higher')
const player2 = document.querySelector('.vol')
const player3 = document.querySelector('.buy')
criptoInput.addEventListener('change', function () {

    if (!criptoInput.value) {
        player.textContent = '';
        player2.textContent = '';
        player3.textContent = '';
        return
    }

    const promiseResposta = fetch(`https://www.mercadobitcoin.net/api/${criptoInput.value}/ticker/`);

    promiseResposta.then(function (resposta) {
        const promiseBody = resposta.json()

        promiseBody.then(function (body) {
            player.textContent = Number(body.ticker.high).toFixed(2);
            player2.textContent = Number(body.ticker.vol).toFixed(2);
            player3.textContent = Number(body.ticker.buy).toFixed(2);
        })
    })
})