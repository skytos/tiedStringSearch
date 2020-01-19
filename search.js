function* makeConnectedString(strings) {
  let pos = 0
  let stringIndex = 0
  let posInString = 0
  let starts = [0]
  while (stringIndex < strings.length - 1 || stringIndex < strings.length && posInString < strings[stringIndex].length) {
    if (posInString === strings[stringIndex].length) {
      posInString = 0
      stringIndex++
      starts[stringIndex] = pos
      continue
    }
    let backUp = yield strings[stringIndex][posInString]
    if (backUp !== undefined) {
      pos -= backUp
      if (pos < 0) pos = 0 // don't let us back up too far
      for (; starts[stringIndex] > pos; stringIndex--);
      posInString = pos - starts[stringIndex] 
    } else {
      posInString++
      pos++
    }
  }
}

function search(needle, haystack) {
	let i = 0
	let backUp
	while (i < needle.length) {
		let hay = haystack.next(backUp)
		if (hay.done) return false
		if (hay.value === needle[i]) {
			i++
			backUp = undefined
		} else {
			backUp = i-1
			i = 0
		}
	}
	return true
}

module.exports = {
	makeConnectedString,
	search
}

let s = makeConnectedString(['people call me Sk', 'y but ', 'my full n', 'ame is', ' Skylar'])
console.log(search('Skylar', s))

