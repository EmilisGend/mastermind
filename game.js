function submitGuess() {
	if (currentGuess.length !== 6 || currentGuess.includes(undefined)) {
		alert("Fill all six pegs!");
		return;
	}
}
