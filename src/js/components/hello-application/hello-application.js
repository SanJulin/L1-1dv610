/**
 * The hello-application web component module.
 */
import '../name-form/index.js'

const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search'
const API_KEY = '5D6v31k403IrIkO3mICgYRm5aezUwkAa'

const template = document.createElement('template')
template.innerHTML = `
    <style>
    #greeting {
    margin-top: 40px;
    margin-left: 100px;
    font-size: 40px;
    font-style: italic;
    }
    #giphy {
    margin-top: 100px;
    margin-left: 100px;
    }
    </style>
    <div>
        <name-form></name-form>
    </div>
    <div id="giphy"></div>
    <div id="greeting"></div>
`

customElements.define('hello-application',
  /**
   * Class representing a hello application
   */
  class extends HTMLElement {
    #name
    #greeting
    #nameForm
    #giphy
    /**
     * Creates an instance of the HelloApplication class.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Gets the name-form, greeting and giphy elements
      this.#nameForm = this.shadowRoot.querySelector('name-form')
      this.#greeting = this.shadowRoot.querySelector('#greeting')
      this.#giphy = this.shadowRoot.querySelector('#giphy')
    }

    /**
     * Called after the element is inserted into the DOM. Adds an event listener to the form.
     */
    connectedCallback () {
      this.#nameForm.addEventListener('submit', (event) => {
        this.#name = event.detail
        this.#showGreeting()
        this.#showGiphy()
      })
    }

    /**
     * Shows a greeting message.
     */
    #showGreeting () {
      const greeting = `Hello ${this.#name}!`
      this.#greeting.innerText = greeting
    }

    /**
     * Shows a random Giphy image from the Giphy API.
     */
    async #showGiphy () {
      this.#giphy.innerHTML = ''
      const response = await fetch(`${GIPHY_URL}?api_key=${API_KEY}&q=hello`)
      const data = await response.json()
      const randomGiphyIndex = Math.floor(Math.random() * data.data.length)
      const giphy = data.data[randomGiphyIndex]
      const img = document.createElement('img')
      img.src = giphy.images.fixed_height.url
      this.#giphy.appendChild(img)
    }
  }
)
