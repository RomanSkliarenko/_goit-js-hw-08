import throttle from 'lodash.throttle';


const refs = {
  'form': document.querySelector('.feedback-form')
}
const EMAIL = 'email'
const MESSAGE = 'message'
const DATA_STORAGE_KEY = 'feedback-form-state'

let dataInStorage = JSON.parse(localStorage.getItem(DATA_STORAGE_KEY)) || {}
reloadPageSavedData()


refs.form.addEventListener('input', throttle(formInputEventHandler, 500))
refs.form.addEventListener('submit',formSubmitHandler)

function formInputEventHandler(e) {
  dataInStorage[e.target.name] = e.target.value
  localStorage.setItem(DATA_STORAGE_KEY,JSON.stringify(dataInStorage))
}

function formSubmitHandler(e) {
  e.preventDefault()
  if (!e.currentTarget.elements[EMAIL].value || !e.currentTarget.elements[MESSAGE].value){
    alert('all fields must be filled')
    return
  }
  console.log(dataInStorage)
  e.currentTarget.reset()
  localStorage.removeItem(DATA_STORAGE_KEY)
  dataInStorage = {}
}

function reloadPageSavedData() {
  const dataFromStorage = JSON.parse(localStorage.getItem(DATA_STORAGE_KEY))
  if(dataFromStorage) {
    dataFromStorage[EMAIL] ? refs.form[EMAIL].value=dataFromStorage[EMAIL] : null
    dataFromStorage[MESSAGE] ? refs.form[MESSAGE].value=dataFromStorage[MESSAGE] : null
  }
}

