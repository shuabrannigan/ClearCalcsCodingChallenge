import { createDialog } from "./modules/dialog.js";

async function createFirstDialog(message) {
    const dialog = createDialog(message)
    const { data } = await dialog.present()
    createDisplayElement(data)
}

async function createSecondDialog(message) {
    const dialog = createDialog(message)
    const { data } = await dialog.present()
    alertUserResponse(data)
}

function createDisplayElement(data) {
    if (data === null) return
    data = `You just clicked "${data ? 'Yes' : 'Cancel'}"`
    let exists = document.getElementsByClassName('dialog-display-message')[0]
    let displayMessageContainer = document.getElementById('display-message')
    let displayMessage = exists ? exists : document.createElement('p')
    displayMessage.classList.add('dialog-display-message')
    displayMessage.textContent = data
    displayMessageContainer.appendChild(displayMessage)
}

function alertUserResponse(data) {
    if (data === null) return
    data = `The value returned from the confirmation is ${data}`
    alert(data)
}


window.createFirstDialog = createFirstDialog
window.createSecondDialog = createSecondDialog