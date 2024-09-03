/* eslint-disable jsdoc/require-description */
const template = document.createElement('template')
template.innerHTML = `
    <style>
    </style>
    <div>
        <h3>Pls enter your name and click on Hello to get your personal greeting!</h3>
        <form>
            <input type="text" id="name" name="name">
            <button type="submit">Hello</button>
        </form>
    </div>
`
customElements.define('name-form',
  /**
   *
   */
  class extends HTMLElement {
    #name
    #form
    #submittedName

    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#submittedName = this.shadowRoot.querySelector('#name')
      this.#form = this.shadowRoot.querySelector('form')
    }

    /**
     *
     */
    connectedCallback () {
      this.#form.addEventListener('submit', (event) => {
        event.preventDefault()
        this.#name = this.#submittedName.value
        this.#returnName()
      })
    }

    /**
     *
     */
    #returnName () {
      this.dispatchEvent(new window.CustomEvent('submit', { detail: this.#name }))
    }
  }
)
