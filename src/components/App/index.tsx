import { autorun } from 'mobx'
import * as React from 'react'
import { findDOMNode } from 'react-dom'

import State from './State'
import Clock from './Clock'
import Schedule from './Schedule'
import Snooze from './Snooze'

import './component.less'

class App extends React.Component<{}, {}> {

	private _state: State = new State()
	private _interval: any
	private _autorunDisposer: any

	public componentDidMount() {
		this._interval = setInterval(() => {
			this._state.incrementTime()
		}, 1000)

		this._autorunDisposer = autorun(this._onAlarm)
	}

	public componentWillUnmount() {
		clearInterval(this._interval)
		this._autorunDisposer()
	}

	public render(): JSX.Element {
		return (
			<section id='app'>
				<Clock state={this._state} />
				<Schedule state={this._state} />
				<Snooze state={this._state} />
				<audio src='build/alarm.mp3' loop={true} ref='audio' />
			</section>
		)
	}

	private _onAlarm = () => {
		const isAlarm: boolean = this._state.$isAlarm
		const audio: HTMLAudioElement = (findDOMNode(this.refs['audio']) as HTMLAudioElement)
		if (isAlarm) {
			audio.play()
		}
		else {
			audio.pause()
			audio.currentTime = 0
		}
	}

}

export default App
