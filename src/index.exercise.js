import '@reach/dialog/styles.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import {LoginForm} from 'components/loginForm'

const App = () => {
  const [openModal, setOpenModal] = React.useState('none')

  const login = formData => {
    console.log('login', formData)
  }

  const register = formData => {
    console.log('register', formData)
  }

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog aria-label="Login form" isOpen={openModal === 'login'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <LoginForm onSubmit={login} buttonText="Login" />
        <h3>Login</h3>
      </Dialog>
      <Dialog aria-label="Registration form" isOpen={openModal === 'register'}>
        <div>
          <button onClick={() => setOpenModal('none')}>Close</button>
        </div>
        <LoginForm onSubmit={register} buttonText="Login" />
        <h3>Register</h3>
      </Dialog>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
