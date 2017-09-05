import {h, Component} from 'composi'

(() => {
  const title = new Component({
    root: 'header',
    state: 'World',
    render: (message) => (
      <h1>Hello, {message}!</h1>
    ),
    styles: {
      padding: 20,
      backgroundColor: '#333',
      h1: {
        color: '#fff',
        margin: 0
      }
    }
  })
})