/* eslint-disable jsdoc/require-description */

/**
 *
 */
class Game {
  #word
  #numberOfChars
  #message
  /**
   *
   */
  constructor () {
    this.#word = 'world'
    this.#message = document.querySelector('#message')
    const button = document.querySelector('#button')
    const underline = document.querySelector('#underline')
    underline.textContent = '_ _ _ _ _'

    button.addEventListener('click', () => {
      this.#checkWord()
    })

    this.#numberOfChars = this.#word.length
    console.log(this.#numberOfChars)
  }

  /**
   *
   */
  #checkWord () {
    const word = document.querySelector('#input')
    if (this.#word === word) {
      this.#message.textContent = 'Congratulations! You managed to figure out the correct word'
    } else {
      for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < this.#word; j++) {
          if (i === j) {
            console.log('correct')
          }
        }
      }
    }
  }
}

export default Game
