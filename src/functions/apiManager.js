const constants = require('../common/constants.json')

export function _parseJSON(response) {
    return response.text().then(function(text) {
      return text ? JSON.parse(text) : {}
    });
}

export async function getText(fileName) {
    return fetch('/texts/' + fileName, {
        headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then(response => _parseJSON(response))
    .then(data => {
        return data
    })
    .catch((err) => console.log(err));
};

export async function getWordSmartly(lexeme) {
    const regex = new RegExp(['[^', ...constants.syriacConsonants, ']'].join(''), 'g');
    let  word = lexeme.replace(regex, '');
    let canRetry = true;
    while (canRetry && (word.length > 0 )) {
        console.log("Getting word " + word);
        const result = await getWord(word);
        if (!result) {
            // Check for if the morpheme contains any particles or pronominal suffixes, sanitize, then re-try.
            if (constants.particles.includes(word[0])) {
                word = word.substring(1);
                console.log("Retrying query with " + word + " after removing particle prefix.");
            } else if (constants.suffixes.includes(word.slice(-1))) {
                word = word.slice(0, -1);
                console.log("Retrying query with " + word + "after removing suffix");
            } else {
                //If we get no hits after removing all particles/suffixes, we give up.
                canRetry = false
            }
        } else {
            return result;
        }
    }
};


export async function getWord(id) {
  const url = "https://sedra.bethmardutho.org/api/word/" + id
  return fetch(url, {method: 'GET'})
  .then(response => _parseJSON(response))
  .then(data => {
      return data;
  })
  .catch((err) => console.log(err))
};