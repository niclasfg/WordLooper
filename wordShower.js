function getPinyin(word){
    return pinyinify(cedict[word]["pinyin"][0]).replace(/\s/g, "")
}

function getDefinition(word){
    return cedict[word]["definitions"][cedict[word]["pinyin"][0]]
}

function getSentence(word){
    return "No sentence mining yet... (Sorry)"
}

function randomWord() {
    let word = words[dictLen * Math.random() << 0];
    console.log("Loading word: " + word + " " + getPinyin(word) + " " + getDefinition(word));
    return word
}

function displayWord(newWord){
    let wordText = document.querySelector(".word");
    let pronounciationText = document.querySelector(".pronounciation");
    let definitionText = document.querySelector(".definition");
    // let sentanceText = document.querySelector(".sentence");

    wordText.innerHTML = newWord;
    pronounciationText.innerHTML = getPinyin(newWord);
    definitionText.innerHTML = getDefinition(newWord);
    // sentanceText.innerHTML = getSentence(newWord);
}

function newWord(){
    displayWord(randomWord())
}

function loopWords() {
    setInterval(function(){
        newWord()}, 60000)
}

newWord()
loopWords()