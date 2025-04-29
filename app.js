const cards = JSON.parse(localStorage.getItem('cards')) || [
    {
        id: 1,
        title: "Lápices",
        desc: "lorem ipsum"
    },
    {
        id: 2,
        title: "Rotuladores",
        desc: "lorem ipsum"
    },
    {
        id: 3,
        title: "Cuadernos",
        desc: "lorem ipsum"
    },
    {
        id: 4,
        title: "Estuche",
        desc: "lorem ipsum"
    }
]

const setlocalStorage = () => {
    localStorage.setItem('cards', JSON.stringify(cards))
}


// EDITAR
let editandoTarea = null



const handleForm = (e) => {
    e.preventDefault()

    const title = document.querySelector('.form_title').value.trim()
    const desc = document.querySelector('.form_desc').value.trim()





    if (editandoTarea !== null) {
        cards[editandoTarea].title = title
        cards[editandoTarea].desc = desc
        editandoTarea = null
    } else {
        const nuevaTarea = {
            title,
            desc
        }
        cards.push(nuevaTarea)
    }



    showCards()
    setlocalStorage()

    document.querySelector(".form").reset()

    
} 
document.querySelector(".form").addEventListener('submit', handleForm)



// ELIMINAR
const eliminarTarea = (i) => {
    cards.splice(i, 1);
    setlocalStorage()
    showCards()
}

// EDITAR
const editarTarea = (i) => {
    const tarea = cards[i]
    document.querySelector(".form_title").value = tarea.title

    document.querySelector(".form_desc").value = tarea.desc

    // guardamos que tarea estamos editando
    editandoTarea= i
}


// MOSTRAR
const showCards = () => {
    const cardsList = document.querySelector(".cards")
    
    // Vaciamos la lista antes de volver a mostrar
    cardsList.innerHTML = '' 
    

    cards.forEach((card, i) => {
        const cardContainer = document.createElement('div')
        cardContainer.classList.add('card')



        cardContainer.innerHTML += `
            <div class="title">
                <h2>${card.title}</h2>
            </div>
            <div class="desc">
                <h4>${card.desc}</h4>
            </div>
            <button class="delete_button">Eliminar</button>
            <button class="edit_button">Editar</button>
        `

        const deleteButton = cardContainer.querySelector(".delete_button")
        deleteButton.addEventListener('click', () => {eliminarTarea(i) })
        const editButon = cardContainer.querySelector(".edit_button")
        editButon.addEventListener('click', () => editarTarea(i))
        cardsList.appendChild(cardContainer)
    })

    
}

showCards()