import cardsListFromFile from "./cards.json";

export default class Card {
    constructor(parentEl) {
        this.parentEl = parentEl;
		this.actualElement;
		

    }
	
	init() {
		this.parentEl.addEventListener('click', this.deleteCard);
		this.parentEl.addEventListener('click', (e) => this.addAnotherCard(e));
		this.parentEl.addEventListener('mousedown', (e) => this.evMouseDown(e));		
	}
	
	loadCards() {
		let cardsList;
		if (localStorage.getItem('cards')) {
			cardsList = JSON.parse(localStorage.getItem('cards'));
		} else {
			cardsList = cardsListFromFile.cards; 
		}
		
		const ulList = this.parentEl.querySelectorAll('.list');
		ulList.forEach((ul) => {
			ul.innerHTML = '';
		});

		Object.entries(cardsList).forEach(([key, value]) => {
			value.forEach((text) => {
				this.parentEl.querySelector(`[data-category="${key}"]`).insertAdjacentElement('beforeend', this.addNewCard(text));
			});
		});		
	}
	
  addNewCard(text) {
	const li = document.createElement('li');
	li.classList.add('item');
	li.insertAdjacentHTML('beforeend', `<span>${text}</span><button class="cross btn">&#215</button>`);

	return li;
  }	
  
  deleteCard(e) {
    if (e.target.classList.contains('cross') && e.target.closest('li')) {
      e.target.closest('li').remove();
    }	  
  }
  
  addAnotherCard(e) {
    if (e.target.classList.contains('add-card') && e.target.closest('div')) {

		e.target.classList.add('hidden');
		const form = e.target.nextElementSibling;
		const curList = e.target.closest('.column').querySelector('ul');
		form.classList.remove('hidden');

		form.addEventListener('submit', (es) => {
			es.preventDefault();

			curList.insertAdjacentElement('beforeend', this.addNewCard(form.ticketFormValue.value));
		
			this.hideForm();		 

	});

	form.addEventListener('reset', (es) => {
		es.preventDefault();
		
		this.hideForm();		 

	});

    }	  
  }
  
  
   hideForm() {
    const addForms = this.parentEl.querySelectorAll('.add-form');
	console.log(addForms);
	addForms.forEach((form) => {
		if (!form.classList.contains('hidden')) {
			form.classList.add('hidden');
		}
	});
	
	const addAnotherCardBtn = this.parentEl.querySelector('.add-card.hidden');
	addAnotherCardBtn.classList.remove('hidden');

  }
  
  saveCards() {
	const saveData = {};
	const ulList = this.parentEl.querySelectorAll('.list');
	ulList.forEach((ul) => {
		let key = ul.getAttribute('data-category');
		
		if (!(key in saveData)) {
			saveData[key] = [];
		}
		ul.querySelectorAll('li span').forEach((li) => {

		saveData[key].push(li.textContent);
		})
	});	
	return saveData;
  }
  
  evMouseDown(e) {


   if (!e.target.closest('.item') || e.target.classList.contains('cross')) {
      return;
    }	 

	e.preventDefault();

	let actualElement;
	let emptyLi;
	
	let coordX;
	let coordY;
	
	const onMouseOver = (e) => {

		actualElement.style.top = e.pageY - coordY + 'px';
		actualElement.style.left = e.pageX - coordX + 'px';
		
		let curElem = document.elementFromPoint(e.clientX, e.clientY);
		if (curElem.closest('.column')) {
			const curUl = curElem.closest('.column').querySelector('ul');

			curUl.insertBefore(emptyLi, e.target.closest('li'));
		}
	};

	const onMouseUp = (e) => {
		const mouseUpItem = e.target.closest('li');
		const curList = e.target.closest('.column').querySelector('ul');
		
		curList.insertBefore(actualElement, mouseUpItem);

		actualElement.classList.remove('dragged');
		actualElement = undefined;
		
		document.querySelector('.empty').remove();
		
		document.documentElement.removeEventListener('mouseup', onMouseUp);
		document.documentElement.removeEventListener('mouseover', onMouseOver);
	};

    actualElement = e.target.closest('li');
    actualElement.classList.add('dragged');

    coordX = e.clientX - actualElement.getBoundingClientRect().left;
    coordY = e.clientY - actualElement.getBoundingClientRect().top;

    emptyLi = document.createElement('li');
    emptyLi.classList.add('empty');
    emptyLi.style.height = `${actualElement.offsetHeight}px`;
	
    document.documentElement.addEventListener('mouseup', onMouseUp);
    document.documentElement.addEventListener('mouseover', onMouseOver);
  }
}