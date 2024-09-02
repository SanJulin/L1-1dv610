/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/require-description */
import '../name-form/index.js'

const template = document.createElement('template')
template.innerHTML = `
    <style>
    </style>
    <div>
        <name-form></name-form>
    </div>
    <div id="greeting">
    </div>

`
customElements.define('welcome-application',
  /**
   *
   */
  class extends HTMLElement {
    #name
    #greeting
    #nameForm
    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      this.#nameForm = this.shadowRoot.querySelector('name-form')

      this.#greeting = this.shadowRoot.querySelector('#greeting')
    }

    connectedCallback () {
      this.#nameForm.addEventListener('submit', (event) => {
        this.#name = event.detail
        console.log(this.#name)
        this.#showGreeting()
      })
    }

    #showGreeting () {
      this.#greeting.textContent = `Hello ${this.#name}`
    }
  }
)
