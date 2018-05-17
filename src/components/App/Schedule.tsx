import { observer } from 'mobx-react'
import * as React from 'react'

import State from './State'

interface IProps {
	state: State
}

@observer
class Schedule extends React.Component<IProps, {}> {

	public render(): JSX.Element {
		const { $time, $alarm, deadline, events } = this.props.state

		let alarmElement: JSX.Element | null
		if ($alarm > 0 && $alarm - $time > -60 && $alarm - $time < 120) {
			alarmElement = (
				<div id='alarm' style={{ top: `${Math.max($alarm - $time, -3) / 2 - 0.75}em` }}>
					<span>{`${$alarm - $time >= 0 ? '+' : '-'}${Math.abs($alarm - $time)}`}</span>
					<div />
				</div>
			)
		}
		else {
			alarmElement = null
		}

		let deadlineElement: JSX.Element | null
		if (deadline - $time > -60 && deadline - $time < 120) {
			deadlineElement = (
				<div id='deadline' style={{ top: `${(deadline - $time) / 2 - 0.75}em` }}>
					<span>{`${deadline - $time >= 0 ? '+' : '-'}${Math.abs(deadline - $time)}`}</span>
					<div />
				</div>
			)
		}
		else {
			deadlineElement = null
		}

		const eventElements: JSX.Element[] = []
		for (let event of events) {
			const offset: number = event.offset - $time
			if (offset > -60 && offset < 120) {
				eventElements.push(
					<div key={event.offset} className={`event ${offset < 0 ? 'passed' : ''}`} style={{ top: `${offset / 2}em`, height: `${event.length / 2 - 0.5}em` }}>
						<span>{`${offset >= 0 ? '+' : '-'}${Math.abs(offset)}`}</span>
						<div>
							<div>{event.label}</div>
						</div>
					</div>
				)
			}
		}

		return (
			<div id='schedule'>
				<div style={{ height: `${Math.max((deadline - $time) / 2 + 2.5, 10)}em` }}>
					{eventElements}
					{alarmElement}
					{deadlineElement}
					<div id='line' />
				</div>
			</div>
		)
	}

}

export default Schedule
