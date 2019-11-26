import join from 'lodash/join'
import './style.css'

function component() {
	const element = document.createElement('div')
	element.innerHTML = join(['hello', 'world'], ' ')
	return element;
}

document.body.appendChild(component());