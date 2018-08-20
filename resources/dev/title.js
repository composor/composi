import { h, Component } from 'composi'

export class Title extends Component {
  render(message) {
    return (
      <nav>
        <h1>Hello, {message}!</h1>
      </nav>
    )
  }
}
