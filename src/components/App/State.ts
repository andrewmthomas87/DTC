import { observable, computed, action } from 'mobx'

interface IEvent {
	label: string
	offset: number
	length: number
}

class State {

	public startHour: number = 8
	public startMinute: number = 50
	public date: Date = new Date()

	public events: IEvent[] = [
		{
			label: 'Shower',
			offset: 10,
			length: 10
		},
		{
			label: 'Hygiene',
			offset: 20,
			length: 5
		},
		{
			label: 'Get dressed',
			offset: 25,
			length: 5
		},
		{
			label: 'Breakfast',
			offset: 35,
			length: 30
		},
		{
			label: 'Check email',
			offset: 65,
			length: 10
		}
	]
	public deadline: number = 80

	@observable public $alarm: number = 5
	@observable public $time: number = 0
	@observable public $isSnooze: boolean = false

	@computed public get $isAlarm(): boolean {
		return this.$alarm > 0 && (this.$alarm - this.$time) <= 0
	}

	@action
	public incrementTime() {
		this.$time++
	}

	@action
	public setTime(time: number) {
		this.$time = time
	}

	@action
	public setAlarmOff() {
		this.$alarm = -1
	}

	@action
	public showSnooze() {
		this.$isSnooze = true
	}

	@action
	public setAlarm(offset: number) {
		this.$isSnooze = false
		this.$alarm = offset
	}

}

export { IEvent, State as default }
