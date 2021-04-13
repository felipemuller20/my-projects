function insertText() {
  const textBox = document.getElementById('text-input');
  function changeText(event) {
    const newText = document.getElementById('meme-text');
    newText.innerText = event.target.value;
  }
  textBox.addEventListener('input', changeText);
}

insertText();

function addImage(event) {
  const uploaded = document.getElementById('meme-insert');
  uploaded.addEventListener('change', function (event) {
    console.log(uploaded.files);
    const reader = new FileReader();
    reader.onload = function () {
      const image = document.getElementById('meme-image');
      image.src = reader.result
    }
    reader.readAsDataURL(uploaded.files[0]);
  })
}

addImage();

function selectMeme() {
  let memes = document.querySelector('.pre-set-memes');
  let displayedMeme = document.getElementById('meme-image')
  memes.addEventListener('click', function () {
    if (event.target.classList.contains('setted-memes')) {
      displayedMeme.src = event.target.src
    }
  })
}

selectMeme();