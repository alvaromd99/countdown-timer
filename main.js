/* Time that we are waiting for, desired date */
const targetDate = '2023-11-12T16:00:00'

function getTimeSegmentElements(segmentElement) {
	const segment = segmentElement.querySelector('.card')
	const top = segment.querySelector('.top')
	const bottom = segment.querySelector('.bottom')
	const segmentOverlay = segment.querySelector('.segment-overlay')
	const topOverlay = segmentOverlay.querySelector('.top-overlay')
	const bottomOverlay = segmentOverlay.querySelector('.bottom-overlay')

	return { top, bottom, segmentOverlay, topOverlay, bottomOverlay }
}

/* Function to update the text content */
function updateSegmentValues(displayElement, overlayElement, value) {
	displayElement.textContent = String(value).padStart(2, '0')
	overlayElement.textContent = String(value).padStart(2, '0')
}

/* Function to add flip class and make the top and bottom move */
function updateTimeSegment(segmentElement, timeValue) {
	const { top, bottom, segmentOverlay, topOverlay, bottomOverlay } =
		getTimeSegmentElements(segmentElement)

	/* skip if is the same number */
	if (parseInt(top.textContent, 10) === timeValue) return

	segmentOverlay.classList.add('flip')

	updateSegmentValues(top, bottomOverlay, timeValue)

	function finishAnimation() {
		segmentOverlay.classList.remove('flip')
		updateSegmentValues(bottom, topOverlay, timeValue)

		this.removeEventListener('animationend', finishAnimation)
	}

	segmentOverlay.addEventListener('animationend', finishAnimation)
}

/* Function to get the segment-cont with the correspondent id */
function updateTimeSection(sectionId, timeValue) {
	const sectionElement = document.getElementById(sectionId)

	updateTimeSegment(sectionElement, timeValue)
}

/* Function to calculate the time to the desired date */
function getTimeRemaining(targetDateTime) {
	const timeNow = Date.now()
	const secondsRemaining = Math.floor((targetDateTime - timeNow) / 1000)

	const complete = timeNow >= targetDateTime

	if (complete) {
		return {
			complete,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		}
	}

	const days = Math.floor(secondsRemaining / (60 * 60 * 24))
	const hours = Math.floor((secondsRemaining / (60 * 60)) % 24)
	const minutes = Math.floor((secondsRemaining / 60) % 60)
	const seconds = secondsRemaining % 60

	return { complete, days, hours, minutes, seconds }
}

/* Function to use the functions above to get the time and update the text */
function updateAllTimes() {
	const targetDateTime = new Date(targetDate).getTime()
	const { complete, days, hours, minutes, seconds } =
		getTimeRemaining(targetDateTime)

	if (!complete) {
		updateTimeSection('days', days)
		updateTimeSection('hours', hours)
		updateTimeSection('minutes', minutes)
		updateTimeSection('seconds', seconds)
	}

	return complete
}

/* 1 second interval */
const countdownTime = setInterval(() => {
	const isCompleted = updateAllTimes()

	if (isCompleted) {
		clearInterval(countdownTime)
	}
}, 1000)

/* Links colors */
const normalColor = '#8486a9'
const hoverColor = '#fb6087'

/* Make the links change color on hover */
const links = document.querySelectorAll('.link')
links.forEach((link) => {
	link.addEventListener('mouseover', () => {
		link.querySelector('svg').style.stroke = hoverColor
	})

	link.addEventListener('mouseout', () => {
		link.querySelector('svg').style.stroke = normalColor
	})
})
