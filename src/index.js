const dogsUrl = 'http://localhost:3000/dogs'
let formId = 0
document.addEventListener('DOMContentLoaded', () => {
getDogInfo()
submitEdit()

})

function getDogInfo () {
    fetch(dogsUrl)
    .then(response => response.json())
    .then(data => data.forEach(dog => renderOneDog(dog)))
}

function renderOneDog(dog) {
    //assign variables for table parts
    const row = document.createElement('tr')
    const name = document.createElement('td')
    const breed = document.createElement('td')
    const sex = document.createElement('td')
    const button = document.createElement('button')
    //assign attributes to table parts
    row.id = dog.id
    name.innerText = dog.name
    breed.innerText = dog.breed
    sex.innerText = dog.sex
    button.innerText = 'Edit'
    //append the table row to the DOM
    document.getElementById('table-body').appendChild(row)
    row.appendChild(name)
    row.appendChild(breed)
    row.appendChild(sex)
    row.appendChild(button)
    
    button.addEventListener('click', (e) => {
        const tblRow = e.target.parentNode
        dName = tblRow.cells[0].innerText
        dBreed = tblRow.cells[1].innerText
        dSex = tblRow.cells[2].innerText
        dogForm = document.getElementById('dog-form')
        dogForm.name.value = dName
        dogForm.breed.value = dBreed
        dogForm.sex.value = dSex
        formId = tblRow.id
    })
}

function submitEdit () {
    const updateForm = document.getElementById('dog-form')
    updateForm.addEventListener('submit', e => {
        e.preventDefault()
        const updateObj = {name: updateForm.name.value, breed: updateForm.breed.value, sex: updateForm.sex.value}
        fetch(dogsUrl + '/' + formId, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updateObj)

        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('table-body').innerHTML = ''
            getDogInfo()
        })
    })
}