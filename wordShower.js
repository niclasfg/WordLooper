function getPinyin(word){
    return pinyinify(cedict[word]["pinyin"][0]).replaceAll("r5", "r").replace(/\s/g, "")
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


    
    if (heisigFilterBox.checked) {
        let isWordInHeisig = checkHeisig(word);   //set bool to false if any character in word is not in heisig, else true.
        while (!isWordInHeisig) {                 // redo if not a heisig word.
            console.log("Skipped word: " + word + " " + getPinyin(word) + " " + getDefinition(word));
            word = words[dictLen * Math.random() << 0];
            isWordInHeisig = checkHeisig(word);
        }
    }
    if (hskFilterBox.checked) {
        let isWordInHSK = getHSKLevel(word) != ""; 
        while (!isWordInHSK) {
            console.log("Skipped word: " + word + " " + getPinyin(word) + " " + getDefinition(word));
            word = words[dictLen * Math.random() << 0];
            isWordInHSK = getHSKLevel(word) != ""; 
        }
    }

    if (longWordsFilterBox.checked) {
        let isWordShort = word.length < 4;
        while (!isWordShort) {
            console.log("Skipped word: " + word + " " + getPinyin(word) + " " + getDefinition(word));
            word = words[dictLen * Math.random() << 0];
            isWordShort = word.length < 4;
        }
    }

    console.log("Loaded word: " + word + " " + getPinyin(word) + " " + getDefinition(word));
    //console.log(getHSKLevel(word));
    return word
}

function displayWord(newWord){
    

    wordText.innerHTML = newWord;
    pronounciationText.innerHTML = getPinyin(newWord);
    definitionText.innerHTML = getDefinition(newWord).replaceAll(";", "<br>");
    hskLevelText.innerHTML = getHSKLevel(newWord)
    // sentanceText.innerHTML = getSentence(newWord);
}

function loopWords() {
    setInterval(function(){
        displayWord(randomWord())}, reloadTime* 1000)
}

const  wordText = document.querySelector(".word");
const  pronounciationText = document.querySelector(".pronounciation");
const definitionText = document.querySelector(".definition");
const hskLevelText = document.querySelector(".hskLevel");
// let sentanceText = document.querySelector(".sentence");

const hskFilterBox = document.querySelector("#hskbox");
const heisigFilterBox = document.querySelector("#heisigbox");
const longWordsFilterBox = document.querySelector("#longWordsbox");

const reloadTime = 60; // Seconds before nex word.

displayWord(randomWord())
loopWords()