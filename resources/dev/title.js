import {h, Component} from 'composi'

export const title = new Component({
  root: 'header',
  render: (message) => {
    const styles = `
    nav {
      padding: 20px;
      background-color: '#333';
    }
    h1 {
      color: '#fff';
      margin: 0;
    }`
    return (
      <nav>
        <style>{styles}</style>
        <h1>Hello, {message}!</h1>
      </nav>
    )
  }
})
