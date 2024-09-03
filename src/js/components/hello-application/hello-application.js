/**
 * The hello-application web component module.
 */
import '../name-form/index.js'

const API_URL = 'https://api.giphy.com/v1/gifs/search'
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
   * Class representing a Hello application
   */
  class extends HTMLElement {
    #name
    #greetingElement
    #nameForm
    #giphyElement
    /**
     * Creates an instance of the Hello application class.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))

      // Gets the name-form, greeting and giphy elements
      this.#nameForm = this.shadowRoot.querySelector('name-form')
      this.#greetingElement = this.shadowRoot.querySelector('#greeting')
      this.#giphyElement = this.shadowRoot.querySelector('#giphy')
    }

    /**
     * Called after the element is inserted into the DOM. Adds an event listener to the name input form.
     */
    connectedCallback () {
      this.#nameForm.addEventListener('submit', (event) => {
        this.#name = event.detail
        this.#showGreeting()
        this.#showGiphy()
      })
    }

    /**
     * Shows a greeting message to the user.
     */
    #showGreeting () {
      const greeting = `Hello ${this.#name}!`
      this.#greetingElement.innerText = greeting
    }

    /**
     * Shows a random gif from the Giphy API.
     */
    async #showGiphy () {
      this.#giphyElement.innerHTML = ''
      const response = await fetch(`${API_URL}?api_key=${API_KEY}&q=hello`)
      const data = await response.json()
      const randomGiphyIndex = Math.floor(Math.random() * data.data.length)
      const giphy = data.data[randomGiphyIndex]
      const img = document.createElement('img')
      img.src = giphy.images.fixed_height.url
      this.#giphyElement.appendChild(img)
    }
  }
)
