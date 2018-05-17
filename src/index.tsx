import { configure } from 'mobx'

configure({ enforceActions: true })

import * as React from 'react'
import { render } from 'react-dom'

import App from './components/App'

import 'less/global.less'

render(<App />, document.querySelector('div#root'))
