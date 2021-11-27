//Selectors

const input = document.querySelector('#myInp'),
		startBtn = document.querySelector('#myBtn'),
		p = document.querySelector('.p'),
		board = document.querySelector('.board'),
		res = document.querySelector('#res'),
		newGameBtn = document.querySelector('.new-game');
let 	step = false,
		stepCount = 0,
		squaresInBoard = 0,
		array = [],
		inputValue = 0,
		countOfIndex = 0;

//Event listeners

startBtn.addEventListener('click', startFunc);
board.addEventListener('click', init);
newGameBtn.addEventListener('click', newGame);

//Functions
function startFunc(event) {
	event.preventDefault();
	inputValue = input.value;
	squaresInBoard = inputValue * inputValue;
	board.style.display = "flex";
	board.style.height = `${inputValue* 50}px`;
	board.style.width = `${inputValue* 50}px`;
	newGameBtn.style.display = 'block';

	if ((inputValue < 3) || (inputValue > 20)) {
		res.innerHTML = "value must be more than 3 and less than 21";
		return;
	}
	for (let i = 0; i < inputValue; i++) {
		array[i] = new Array([]);
		for (let j = 0; j < inputValue; j++) {
			array[i][j] = countOfIndex;
			countOfIndex++;
		}
	}
	for (let i = 0; i < squaresInBoard; i++) {
		const oneSquare = document.createElement('div');
		oneSquare.classList.add('oneSquare');
		oneSquare.setAttribute('data-index', i);
		board.append(oneSquare);

	}
	p.style.display = 'none';
	startBtn.style.display = 'none';
	input.style.display = 'none';

}


function stepCross(event) {
	if (event.target.innerHTML != '') {return;}
	event.target.innerHTML = 'x';
	event.target.style.background = 'rgba(0, 255, 0, .5)';

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			let index = event.target.getAttribute('data-index');
			if (index == array[i][j]) {
				array[i][j] = 'x';
			}
		}
	}
	step = !step;
	stepCount++;
}

function stepCircle(event) {
	if (event.target.innerHTML != '') {return;}
	event.target.innerHTML = 'o';
	event.target.style.background = 'yellow';
	event.target.classList.add('o');

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array[i].length; j++) {
			let index = event.target.getAttribute('data-index');
			if (index == array[i][j]) {
				array[i][j] = 'o';
			}
		}
	}
	step = !step;
	stepCount++;
}

function init(event) {
	if (event.target.classList.contains('oneSquare')) {
		if (!step) {stepCross(event);}
		else {stepCircle(event);}
		win();		
	}
}

function newGame() {
	countOfIndex = 0;
	for (let i = 0; i < inputValue; i++) {
		array[i] = new Array([]);
		for (let j = 0; j < inputValue; j++) {
			array[i][j] = countOfIndex;
			countOfIndex++;
		}
	}

	step = false;
	stepCount = 0;
	res.innerText = '';
	let squares = document.querySelectorAll('.oneSquare');
	squares.forEach((item) => {
		item.innerHTML = '';
		item.classList.remove('x', 'o', 'active');
		item.style.background = 'none';
	});
	board.addEventListener('click', init);
}

function win() {

	let countX, countO;

	for(let i=0; i<array.length; i++){
		countX = 0;
		countO = 0;
		for(let j=0; j<array[i].length; j++){
			if(array[i][j] == 'x') countX++;
			if(array[i][j] == 'o') countO++;
		}
		if(countX == array.length){
		res.innerText = 'Выиграли X';
		board.removeEventListener('click', init);
	};
		if(countO == array.length){
		res.innerText = 'Выиграли O';
		board.removeEventListener('click', init);
	};
	}

	for(let i=0; i<array.length; i++){
	countX = 0;
	countO = 0;
		for(let j=0; j<array[i].length; j++){
			if(array[j][i] == 'x') countX++;
			if(array[j][i] == 'o') countO++;
		}
		if(countX == array.length){
		res.innerText = 'Выиграли X';
		board.removeEventListener('click', init);
	};
		if(countO == array.length){
		res.innerText = 'Выиграли O';
		board.removeEventListener('click', init);
	};
	}

	countX=0;
	countO = 0;
	for(let i=0; i<array.length; i++){
		if(array[i][i] == 'x') countX++;
		if(array[i][i] == 'o') countO++;
	}
	if(countX == array.length){
		res.innerText = 'Выиграли X';
		board.removeEventListener('click', init);
	};
	if(countO == array.length){
		res.innerText = 'Выиграли O';
		board.removeEventListener('click', init);
	};

	countX=0;
	countO = 0;
	for(let i=0; i<array.length; i++){
		if( array[i][array.length-1-i] == 'x') countX++;
		if( array[i][array.length-1-i] == 'o') countO++;
	}
	if(countX == array.length){
		res.innerText = 'Выиграли X';
		board.removeEventListener('click', init);
	};
	if(countO == array.length){
		res.innerText = 'Выиграли O';
		board.removeEventListener('click', init);
	};

	if(
		stepCount == squaresInBoard &&
		countX !== array.length &&
		countO !== array.length
	  ){
		res.innerText = 'Ничья';
		board.removeEventListener('click', init);
	  }
}

