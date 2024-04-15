export default class Column {
    constructor(parentEl) {
        this.parentEl = parentEl;

    }

    markup(column) {
        return `
        <div class="column">
            <div class="column__container">
                <h1 class="column__title">${column}</h1>
                <ul class="list" data-category="${column}">
                </ul>
            </div>
            <button class="add-card btn"> + Add another card</button>
			<form class="add-form hidden" name="addForm" novalidate="">
				<textarea name="ticketFormValue" class="add-area" placeholder="Enter a text for this card" required=""></textarea>
				<div class="buttons">
					<button class="ok-btn" type="submit">Add card</button>
					<button class="delete-btn" type="reset">&#215</button>
				</div>            
			</form>			
        </div>
        `;
    }
	
    bindToDOM(column) {
        this.parentEl.innerHTML += this.markup(column);	
	}	
}