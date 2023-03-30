function create(message) {
    return new DialogComponent(message)
}

class DialogComponent {
    constructor(message) {
        this.message = message || 'This message is default'

        this.dialog = undefined
        this.confirmButton = undefined
        this.cancelButton = undefined
        this.parent = document.body

        this._createDialog()
        this._appendDialog()
    }

    present() {
        return new Promise((resolve,reject) => {
            if (!this.dialog) {
                reject('No Dialog to present')
            }
            let response = {data: null}
            this.dialog.showModal()

            /**
             * handle 'cancel' event caused when hitting 'escape' key
             */
            this.dialog.addEventListener('cancel', (event) => {
                response.data = false
                resolve(response)
                this._destroy()
            });

            /**
             * handle button 'click' events
             */
            this.confirmButton.addEventListener("click", () => {
                response.data = true
                resolve(response)
                this._destroy()
            })

            this.cancelButton.addEventListener("click", () => {
                response.data = false
                resolve(response)
                this._destroy()
            })
        })
    }

    _createDialog() {
        /**
         * initalize component html elements
         */
        this.dialog = document.createElement('dialog')
        this.dialog.classList.add('dialog-container')

        const message = document.createElement('p')
        message.textContent = this.message
        message.classList.add("dialog-message")
        this.dialog.appendChild(message)

        const buttonContainer = document.createElement('div')
        buttonContainer.classList.add('dialog-buttons-container')
        this.dialog.appendChild(buttonContainer)

        this.confirmButton = document.createElement('button')
        this.confirmButton.classList.add('dialog-button', 'confirm')
        this.confirmButton.type = 'button'
        this.confirmButton.textContent = 'Yes'
        buttonContainer.appendChild(this.confirmButton)

        this.cancelButton = document.createElement('button')
        this.cancelButton.classList.add('dialog-button', 'cancel')
        this.cancelButton.type = 'button'
        this.cancelButton.textContent = 'Cancel'
        buttonContainer.appendChild(this.cancelButton)
    }
    _appendDialog() {
        this.parent.appendChild(this.dialog)
    }

    _destroy() {
        this.parent.removeChild(this.dialog)
        delete this
    }
}

export {create as createDialog , DialogComponent}