/* eslint-disable jsdoc/require-description */
const template = document.createElement('template')
template.innerHTML = `
    <style>
    </style>
    <div>
        <h3>Pls enter your name and click on show!</h3>
        <form>
            <input type="text" id="name" name="name">
            <button type="submit">Show ...</button>
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
    #button
    #addedName
    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#addedName = this.shadowRoot.querySelector('#name')
      this.#form = this.shadowRoot.querySelector('form')
      this.#button = this.shadowRoot.querySelector('button')
    }

    /**
     *
     */
    connectedCallback () {
      this.#button.addEventListener('click', (event) => {
        this.#name = this.#addedName.value
        console.log(this.#name)
        this.#returnName()
      })
    }

    /**
     *
     */
    #returnName () {
      this.dispatchEvent(new window.CustomEvent('submit', { detail: this.#name }))
      console.log(this.#name)
    }
  }
)
