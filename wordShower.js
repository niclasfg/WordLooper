function getPinyin(word){
    return pinyinify(cedict[word]["pinyin"][0]).replace(/\s/g, "")
}

function getDefinition(word){
    return cedict[word]["definitions"][cedict[word]["pinyin"][0]]
}

function getSentence(word){
    return "No sentence mining yet... (Sorry)"
}

function getHSKLevel(word){
    if (word in hskLevels) {
        return hskLevels[word]["HSKLevel"]
    }
    return ""
}

function checkHeisig(word){
    let chars = Array.from(word); 
    //console.log(chars);
    for (let c in chars) {
        //console.log(chars[c]);
        if (!heisigHanzi.includes(chars[c])) {
            return false
        }
      }
    return true
}

function randomWord() {
    let word = words[dictLen * Math.random() << 0];   //Get a random word from cedict
    let isWordInHeisig = checkHeisig(word);   //set bool to false if any character in word is not in heisig, else true.
    while (!isWordInHeisig) {                 // redo if not a heisig word.
        console.log("Skipped word: " + word + " " + getPinyin(word) + " " + getDefinition(word));
        word = words[dictLen * Math.random() << 0];
        isWordInHeisig = checkHeisig(word);
    }
    console.log("Loaded word: " + word + " " + getPinyin(word) + " " + getDefinition(word));
    //console.log(getHSKLevel(word));
    return word
}

function displayWord(newWord){
    let wordText = document.querySelector(".word");
    let pronounciationText = document.querySelector(".pronounciation");
    let definitionText = document.querySelector(".definition");
    let hskLevelText = document.querySelector(".hskLevel");
    // let sentanceText = document.querySelector(".sentence");

    wordText.innerHTML = newWord;
    pronounciationText.innerHTML = getPinyin(newWord);
    definitionText.innerHTML = getDefinition(newWord);
    hskLevelText.innerHTML = getHSKLevel(newWord)
    // sentanceText.innerHTML = getSentence(newWord);
}

function newWord(){
    displayWord(randomWord())
}

function loopWords() {
    setInterval(function(){
        newWord()}, 5000)
}

newWord()
loopWords()