/* eslint-disable jsdoc/require-description */
const template = document.createElement('template')
template.innerHTML = `
    <style>
    h4 {
    font-size: 20px;
    margin-top: 60px;
    }
    form {
    margin-left: 100px;
    }
    input {
     font-size: 14px;
     padding: 8px;
     border-radius: 5px
    }
    button {
    font-size: 16px;
    padding: 5px 6px
    }
    </style>
    <div>
        <h4>Pls enter your name and click on Hello to get your personal greeting!</h4>
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
    #form
    #inputField

    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true))

      this.#inputField = this.shadowRoot.querySelector('#name')
      this.#form = this.shadowRoot.querySelector('form')
    }

    /**
     *
     */
    connectedCallback () {
      this.#form.addEventListener('submit', (event) => {
        event.preventDefault()
        this.dispatchEvent(new window.CustomEvent('submit', { detail: this.#inputField.value }))
        this.#inputField.value = ''
      })
    }
  }
)
