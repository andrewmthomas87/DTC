import { computed } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'

import State, { IEvent } from './State'

interface IProps {
	state: State
}

@observer
class Snooze extends React.Component<IProps, {}> {

	@computed private get _$event(): IEvent | null {
		const time: number = this.props.state.$time
		const event: IEvent[] = this.props.state.events.filter(event => event.offset - time > 0)
		return event.length ? event[0] : null
	}

	public render(): JSX.Element {
		const isSnooze: boolean = this.props.state.$isSnooze
		const event: IEvent | null = this._$event
		if (!isSnooze) {
			return <div id='snooze' />
		}

		let buttons: JSX.Element
		if (event) {
			buttons = (
				<div>
					<button onClick={this._onSnoozeUntilNext}>Until <span>{event.label}</span></button>
					<button onClick={this._onSnoozeThroughNext}>Through <span>{event.label}</span></button>
				</div>
			)
		}
		else {
			buttons = (
				<div>
					<button onClick={this._onSnooze5Minutes}>5 mintues</button>
				</div>
			)
		}

		return (
			<div id='snooze' className='visible'>{buttons}</div>
		)
	}

	private _onSnoozeUntilNext = () => {
		if (this._$event) {
			this.props.state.setAlarm(this._$event.offset)
		}
	}

	private _onSnoozeThroughNext = () => {
		if (this._$event) {
			this.props.state.setAlarm(this._$event.offset + this._$event.length)
		}
	}

	private _onSnooze5Minutes = () => {
		this.props.state.setAlarm(this.props.state.$time + 5)
	}

}

export default Snooze
