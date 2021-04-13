window.onload = function () {



};

function initialSettings() {
  const initialColor = document.querySelector('.color');
  initialColor.className += ' selected';
}

initialSettings();

function firstBoard() {
  const squareBase = 5;
  for (let index = 1; index <= squareBase; index += 1) {
    let lines = document.createElement('div');
    lines.className = 'line';
    document.querySelector('#pixel-board').appendChild(lines);
    for (let jndex = 1; jndex <= squareBase; jndex += 1) {
      let squares = document.createElement('div');
      lines.appendChild(squares);
      squares.className = 'pixel';
    }
  }
};

firstBoard();

function paletteColors() {
  document.getElementById('color1').style.backgroundColor = 'black';
  document.getElementById('color2').style.backgroundColor = '#14213d';
  document.getElementById('color3').style.backgroundColor = '#fca311';
  document.getElementById('color4').style.backgroundColor = '#e5e5e5';
}

paletteColors();

function changeSelectedColor() {
  const allColors = document.querySelector('#color-palette');
  function colorChange(event) {
    if (event.target.className === 'color') {
      document.querySelector('.selected').className = 'color';
      event.target.className += ' selected';
    }
  }
  allColors.addEventListener('click', colorChange);
}
changeSelectedColor();

function changeColor() {
  const board = document.querySelector('#pixel-board');
  board.addEventListener('click', function (event) {
    const currentColor = document.querySelector('.selected').style.backgroundColor;
    const pixel = document.querySelectorAll('.pixel');
    for (let index = 0; index < pixel.length; index += 1) {
      if (pixel[index] === event.target) {
        pixel[index].style.backgroundColor = currentColor;
      }
    }
  });
}
changeColor();

function createCleanButton() {
  const cleanButton = document.createElement('button');
  cleanButton.id = 'clear-board';
  cleanButton.innerText = 'Limpar';
  document.querySelector('header').appendChild(cleanButton);
  document.querySelector('header').style.textAlign = 'center';
  cleanButton.style.fontSize = '20px';
}
createCleanButton();

function resetBoard() {
  const button = document.querySelector('button');
  button.addEventListener('click', function () {
    const pixel = document.querySelectorAll('.pixel');
    for (let index = 0; index < pixel.length; index += 1) {
      pixel[index].style.backgroundColor = 'white';
    }
  });
}

resetBoard();

function createInput() {
  let newInput = document.createElement('input');
  newInput.id = 'numberInput'
  newInput.type = 'number';
  newInput.value = 5;
  newInput.min = '1';
  newInput.max = '50';
  newInput.style.marginTop = '20px'
  newInput.style.height = '25px';
  newInput.style.width = '80px';
  newInput.style.textAlign = 'center';
  newInput.style.fontSize = '20px'
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(newInput);
  newInput.style.display = 'inline-block';
  body.style.textAlign = 'center';
}
createInput();

function createInputBtn() {
  let newBtn = document.createElement('button');
  newBtn.id = 'input-btn';
  newBtn.innerText = 'Base do Quadrado'
  let body = document.querySelector('body');
  body.appendChild(newBtn);
  newBtn.style.height = '20px'
  newBtn.style.marginLeft = '20px'
}
createInputBtn();

function deleteBoard() {
  const btn = document.getElementById('input-btn');
  btn.addEventListener('click', function () {
    let childrens = document.getElementById('pixel-board').children;
    for (let index = childrens.length; index > 0; index -= 1) {
      document.getElementById('pixel-board').removeChild(childrens[index - 1]);
    }
  });
}
deleteBoard();

function changeBase() {
  let btn = document.getElementById('input-btn');
  btn.addEventListener('click', function () {
    let squareBase = parseInt(document.getElementById('numberInput').value);
    if (squareBase <= 40 && squareBase > 0) {
      for (let index = 1; index <= squareBase; index += 1) {
        let lines = document.createElement('div');
        lines.className = 'line';
        document.querySelector('#pixel-board').appendChild(lines);
        for (let jndex = 1; jndex <= squareBase; jndex += 1) {
          let squares = document.createElement('div');
          lines.appendChild(squares);
          squares.className = 'pixel';
        }
      }
    } else {
      firstBoard();
    }
  })
}
changeBase();

function changeSize() {
  let btn = document.getElementById('input-btn');
  btn.addEventListener('click', function () {
    let squareBase = parseInt(document.getElementById('numberInput').value);
    let pixelList = document.getElementsByClassName('pixel');
    if (squareBase > 14 && squareBase < 25) {
      for (let index = 0; index < pixelList.length; index += 1) {
        pixelList[index].classList.add('pixelMedium');
      }
    } else if (squareBase >= 25 && squareBase <= 40) {
      for (let index = 0; index < pixelList.length; index += 1) {
        pixelList[index].classList.add('pixelSmall');
      }
    } else if (squareBase > 40) {
      alert('O tamanho máximo é 40!');
    } else if (squareBase <= 0) {
      alert('O tamanho mínimo é 1')
    }
  })
}

changeSize();