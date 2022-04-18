import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app'
import {ReactQueryConfigProvider} from 'react-query'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false, // refetch when window focus
    retry(failureCount, error) {
      if (error.status === 404) {
        return false
      } else return failureCount < 2;
    },
  },
}

loadDevTools(() => {
  ReactDOM.render(
    <ReactQueryConfigProvider config={queryConfig}>
      <App />
    </ReactQueryConfigProvider>,
    document.getElementById('root'),
  )
})
