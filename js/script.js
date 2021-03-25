let navPage = 1;
// carregar pagina no content
document.querySelectorAll('[page-nav]').forEach(link => {
  const conteudo = document.getElementById('content')

  link.onclick = function (e) {
    e.preventDefault()
    fetch(link.getAttribute('page-nav'))
      .then(resp => resp.text())
      .then(html => conteudo.innerHTML = html)
      .then(() => operation(link.getAttribute('page-nav')))


  }
})

// carrega o home
$(document).ready(function () {
  const conteudo = document.getElementById('content')
  fetch('pages/home.html')
    .then(resp => resp.text())
    .then(html => conteudo.innerHTML = html)

})

//personagens
function operation(link) {
  if (link == 'pages/personagens.html') {

    populate()
    loadCard(1)
  }
}

function populate(page = 1) {
  const cards = document.querySelectorAll('.card.onPage')
  cards.forEach((card, index) => {
    let indexValue = (index + 1 + ((page - 1) * 6))
    card.setAttribute('id', indexValue)
    const img = card.querySelector('img')
    img.setAttribute('src', `https://rickandmortyapi.com/api/character/avatar/${indexValue}.jpeg`)
  })
}

function getId(e) {
  const id = e.getAttribute('id')
  loadCard(id)
}

function loadCard(id) {

  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(data => {

      const img = document.querySelector('#selected-img')
      const name = document.querySelector('#name')
      const status = document.querySelector('#status')
      const gender = document.querySelector('#gender')
      const species = document.querySelector('#species')
      const origin = document.querySelector('#origin')

      img.setAttribute('src', `https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`)
      name.innerHTML = `${data.name}`
      status.innerHTML = `Status: ${data.status}`
      gender.innerHTML = `Gênero: ${data.gender}`
      species.innerHTML = `Espécie: ${data.species}`
      origin.innerHTML = `Origem: ${data.origin.name}`

    })

}


function navigate(e) {
  let navigation = e.innerHTML
  
  if (!isNaN(navigation)) {
    navPage = parseInt(navigation)
    populate(navPage)
  } else if (navigation === 'Next') {
    navPage += 1
    populate(navPage)
  } else if (navigation === 'Previous' && navPage > 1) {
    navPage += -1
    populate(navPage)
  }
  const previous = document.querySelector("#previous")
  if (navPage <= 1) {
   
    previous.classList.add('disabled')
  } else {
    previous.classList.remove('disabled')
  }

  const lastNav = document.querySelector("#last-nav")
  let lastNavValue = lastNav.innerHTML
  if (navPage >= 4) {
    lastNav.innerHTML = `${parseInt(navPage) + 1}`
  } else if(lastNavValue !== '4'){
    lastNav.innerHTML = 4
  }
  console.log(navPage)
}
