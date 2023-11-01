const targetDate = '2023-11-10T12:00:00'

function getTimeSegmentElements(segmentElement) {
	console.log(segmentElement)
	const segment = segmentElement.querySelector('.card')
	const top = segment.querySelector('.top')
	const bottom = segment.querySelector('.bottom')
	const segmentOverlay = segment.querySelector('.segment-overlay')
	const topOverlay = segmentOverlay.querySelector('.top-overlay')
	const bottomOverlay = segmentOverlay.querySelector('.bottom-overlay')

	return { top, bottom, segmentOverlay, topOverlay, bottomOverlay }
}

function updateSegmentValues(displayElement, overlayElement, value) {
	displayElement.textContent = value
	overlayElement.textContent = value
}

function updateTimeSegment(segmentElement, timeValue) {
	const { top, bottom, segmentOverlay, topOverlay, bottomOverlay } =
		getTimeSegmentElements(segmentElement)

	segmentOverlay.classList.add('flip')

	updateSegmentValues(top, bottomOverlay, timeValue)

	function finishAnimation() {
		segmentOverlay.classList.remove('flip')
		updateSegmentValues(bottom, topOverlay, timeValue)

		this.removeEventListener('animationend', finishAnimation)
	}

	segmentOverlay.addEventListener('animationend', finishAnimation)
}

function updateTimeSection(sectionId, timeValue) {
	const sectionElement = document.getElementById(sectionId)

	updateTimeSegment(sectionElement, timeValue)
}

updateTimeSection('seconds', 33)
updateTimeSection('minutes', 24)
