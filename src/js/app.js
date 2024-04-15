import Column from "./column";
import Card from "./card";

import columnsList from "./columns.json";

document.addEventListener('DOMContentLoaded', () => {
	
    const container = document.querySelector('.container');
	const columnEl = new Column(container);
	
	columnsList.columns.forEach((column) => {
		columnEl.bindToDOM(column);
	});
    
	const card = new Card(container);
	card.init();
	card.loadCards();

	window.addEventListener('unload', () => {
		localStorage.setItem('cards', JSON.stringify(card.saveCards()));
	});

})