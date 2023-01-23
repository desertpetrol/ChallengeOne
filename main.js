//DOM
let textInput = document.getElementById('input')
let textOutput = document.getElementById('output')

let btnSwapText = document.getElementById('change')

let create = document.getElementById('create')

let btnCod = document.getElementById('btnCod')
let btnDecod = document.getElementById('btnDecod')

let checkBox = document.getElementById('check')

btnSwapText.addEventListener('click', () => { 
    let temp = textInput.value
    textInput.value = textOutput.value
    textOutput.value = temp
})

function clearText(){
    textInput.value = ''
    textOutput.value = ''
}

function copyText() {
    textOutput.select()
    document.execCommand('copy')
}

//Função altera uma string usando os valores de 2 arrays. 
//O primeiro array é transformado em um regex, 
//o segundo array é usado para criar um objeto que sera usado na substituição

function replaceWith(str, findArray, replaceArray ){
    if (findArray == '' || replaceArray == ''){
        str = str //se algum array estiver vazio, repete a string
    } else {
        let map = {}
        let regex = []
        //criação do regex
        for(let i=0; i<findArray.length; i++ ){
            regex.push(findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1')) //Evita a criação de um regex com characteres especiais.
            map[findArray[i]] = replaceArray[i] //Cria um array como objeto para substituição
        }
        regex = regex.join('|') //separa os elementos do regex com |
        str = str.replace( new RegExp( regex, 'g' ), (matched) => { //troca os elementos usando o novo regex criado
            return map[matched]
        })
    }
    return str
  }

//arrays do projeto padrão
const findAlura = ['a', 'e', 'i', 'o', 'u']
const replaceAlura = ['ai', 'enter', 'imes', 'ober', 'ufat']

//Encriptação personalizada 
function encryption() {
    this.findArray = []
    this.replaceArray = []

    this.createIncryption = (key, value) => {
        if (!this.findArray.includes(key) && !this.replaceArray.includes(value)) {
            this.findArray.push(key)
            this.replaceArray.push(value)
            addItem()
        } else {
            alert('Error: Chave ou valor já existe')
            console.log('Error: Chave ou valor já existe') 
            console.log(this.findArray.includes(key))
            console.log(this.replaceArray.includes(value))
        }
        return (this.findArray,this.replaceArray)
    }
    this.deleteKey = (key) => {
        for(let i = 0 ; i < this.findArray.length; i++){
            if (this.findArray[i] === key) {
                this.findArray.splice(i,1)
                this.replaceArray.splice(i,1)
            }
        }       
    }
}

let custom = new encryption()

function createCodAndDecodEvent(array1, array2) {
    btnCod.addEventListener('click', () => { 
        textOutput.value = (replaceWith(textInput.value, array1, array2)) 
    })
    btnDecod.addEventListener('click', () => { 
        textOutput.value = (replaceWith(textInput.value, array2, array1)) 
    })    
}

//handler do checkbox e botões
createCodAndDecodEvent(findAlura, replaceAlura)

function onChangeHandler(){
    if(checkBox.checked) {
        createCodAndDecodEvent(custom.findArray, custom.replaceArray)
        document.getElementById('encriptador-pessoal-container').classList.add('show')
    } else {
        createCodAndDecodEvent(findAlura, replaceAlura)
        document.getElementById('encriptador-pessoal-container').classList.remove('show')
    }
}

//Funções para ciração do encriptador personalizado
create.addEventListener('click', () => { 
    let valueInput = document.getElementById('value').value
    let keyInput = document.getElementById('key').value

    custom.createIncryption(keyInput, valueInput)
})

//Adiciona a criptografia criada para a lista dentro do documento
let createListItem = (key, value) => {
    let listItem = document.createElement('li')
    listItem.innerText = `O valor '${key}' é convertido para '${value}'`
    listItem.setAttribute('data-value', key) // adiciona a chave como um valor no componente do documento
    
    return listItem
}

//cria o botão de apagar e o listener do botão.
let createRemoveButton = () => {
    let removeButton = document.createElement('button')
    removeButton.innerText = 'Deletar'
    removeButton.className = 'remove-btn'
//função anonima que pega a chave adicionada ao html
    removeButton.addEventListener('click', (event) => {
    let item = event.currentTarget.parentNode
    let userInput = item.dataset.value // extrai o valor do componente
    custom.deleteKey(userInput)
    item.remove()
})
    return removeButton
}

//cria a lista e o botão de delete usando DOM
const addItem = () => {
    let keyInput = document.getElementById('key').value
    let valueInput = document.getElementById('value').value
    let myList = document.getElementById('encrypter-custom-list')

    let listItem = createListItem(keyInput, valueInput)
    listItem.append(createRemoveButton())
    myList.append(listItem)
}

//https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings
//https://stackoverflow.com/questions/69793537/how-do-i-remove-items-from-dom-and-array
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
//https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
//https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions
