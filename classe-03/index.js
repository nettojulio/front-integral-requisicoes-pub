const searchInput = document.querySelector('#pokemon');
const nameInput = document.querySelector('.nome');
const idInput = document.querySelector('.id');
const hab1Input = document.querySelector('.habilidade1');
const hab2Input = document.querySelector('.habilidade2');
const hab3Input = document.querySelector('.habilidade3');
const picInput = document.querySelector('.img');

searchInput.addEventListener('change', function () {
    hab1Input.textContent = '';
    hab2Input.textContent = '';
    hab3Input.textContent = '';
    if (!searchInput.value) {
        nameInput.textContent = '';
        idInput.textContent = '';
        picInput.src = '';
        hab1Input.textContent = '';
        hab2Input.textContent = '';
        hab3Input.textContent = '';
        return
    }

    const promessa = fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.value}/`);

    promessa.then((resposta) => {
        if (!resposta.ok) {
            return;
        }

        const body = resposta.json();

        body.then((content) => {
            console.log(content);
            nameInput.textContent = content.name;
            idInput.textContent = content.id;
            picInput.src = content.sprites.front_default;
            hab1Input.textContent = content.abilities[0].ability.name;
            if (content.abilities.length >= 2) {
                hab2Input.textContent = content.abilities[1].ability.name;
            }
            if (content.abilities.length >= 3) {
                hab3Input.textContent = content.abilities[2].ability.name;
            }               
        })
    })
})