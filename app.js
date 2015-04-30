function randomArrayElement(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function capitaliseFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function tablestuff(data, tabletop) {
  var button = document.getElementById('generate'),
      text = document.getElementById('phrase');

  function generate() {
    var phrase = randomArrayElement(data.Phrase.elements).Phrase,
        replacer = function(match, key) {
          if(key) {
            var column = key, row;
            if(key.indexOf('-') > -1) {
              var tmp = key.split('-');
              key = tmp[0];
              row = randomArrayElement(data[key].elements);
              var result = row[tmp[1]];
              if(result && result.length > 0) {
                return result;
              } else {
                column = key;
              }
            } else {
              row = randomArrayElement(data[key].elements);
            }
            return row[column];
          } else {
            return 'ERROR';
          }
        };

    var p = phrase.replace(/\%([A-Za-z\-]+)\%/g, replacer),
        parts = p.split(" "),
        result = [],
        isA = false;
    for(var i = 0; i < parts.length; i++) {
      result[i] = parts[i];
      if (isA && /^[aeiou]/.test(parts[i])) {
        result[i-1] = "an";
      }
      isA = (parts[i] == "a");
    }
    text.innerHTML = capitaliseFirstLetter(result.join(" "));
  };

  button.onclick = generate;
  generate();
}

Tabletop.init( {
  key: 'https://docs.google.com/spreadsheets/d/1RShLhObE6VK1CSRVLKOV-A03mmDzi3fq2p1Hny4X9OA/pubhtml',
  callback: tablestuff,
  simpleSheet: false,
  parameterize: 'http://darkliquid.co.uk/playground/numenera/philethis/proxy.php?url='
});
