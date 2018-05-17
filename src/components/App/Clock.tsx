import { computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'

import State from './State'

const DAYS: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const MONTHS: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface IProps {
	state: State
}

@observer
class Clock extends React.Component<IProps, {}> {

	@computed private get _$hour(): string {
		const hour: number = this.props.state.startHour + Math.floor((this.props.state.$time + this.props.state.startMinute) / 60)
		return `${hour < 10 ? '0' : ''}${hour}`
	}

	@computed private get _$minute(): string {
		const minute: number = (this.props.state.$time + this.props.state.startMinute) % 60
		return `${minute < 10 ? '0' : ''}${minute}`
	}

	public render(): JSX.Element {
		const date: Date = this.props.state.date

		return (
			<div id='clock'>
				<div>
					<h2 id='time'>{this._$hour}<span>:</span>{this._$minute}<span className='small'> AM</span></h2>
					<h4><span>{DAYS[date.getDay()]}</span>, {MONTHS[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</h4>
					{this.props.state.$isAlarm ? <button id='snooze' onClick={this._onSnooze}>Snooze</button> : null}
					{this.props.state.$isAlarm ? <button id='off' onClick={this._onOff}>Off</button> : null}
				</div>
			</div>
		)
	}

	private _onSnooze = () => {
		this.props.state.showSnooze()
	}

	private _onOff = () => {
		this.props.state.setAlarmOff()
	}

}

export default Clock
