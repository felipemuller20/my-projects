function loginAlert() {
  const btnLogin = document.getElementById('button-login');
  let inputText = '';
  btnLogin.addEventListener('click', () => {
    inputText = document.getElementById('user-email-phone').value;
    alert(inputText);
  });
}

function addCustonGender() {
  const gendersBlock = document.getElementById('genders');
  gendersBlock.addEventListener('click', (event) => {
    const gendersLength = gendersBlock.children.length;
    if (event.target.id === 'gen-personalized' && gendersLength < 7) {
      const newGender = document.createElement('input');
      newGender.name = 'gender-custom';
      newGender.id = 'new-gender';
      newGender.placeholder = 'Gênero (opcional)';
      gendersBlock.appendChild(newGender);
    }
  });
}

function removeCustonGender() {
  const gendersBlock = document.getElementById('genders');
  gendersBlock.addEventListener('click', (event) => {
    const gendersLength = gendersBlock.children.length;
    const idE = event.target.id;
    if ((idE === 'gen-masc' || idE === 'gen-fem') && gendersLength > 6) {
      gendersBlock.removeChild(gendersBlock.lastChild);
    }
  });
}

function getElements() {
  const name = document.getElementById('firstname').value;
  const lastName = document.getElementById('lastname').value;
  const phoneEmail = document.getElementById('phone-email').value;
  const password = document.getElementById('password').value;
  const birthdate = document.getElementById('birthdate').value;
  const result = [name, lastName, phoneEmail, birthdate, password];
  return result;
}

function getGender() {
  let result = '';
  const fem = document.getElementById('gen-fem').checked;
  const masc = document.getElementById('gen-masc').checked;
  const person = document.getElementById('gen-personalized').checked;
  if (fem === true) {
    result = 'Feminino';
  } else if (masc === true) {
    result = 'Masculino';
  } else if (person === true) {
    result = 'Personalizado';
  }
  return result;
}

function check() {
  const result = getElements();
  let sum = 0;
  for (let index = 0; index < result.length; index += 1) {
    const element = result[index];
    if (element !== '') {
      sum += 1;
    }
  }
  return sum;
}

function saveContent() {
  const gender = getGender();
  const array = getElements();
  sessionStorage.setItem('info', array);
  sessionStorage.setItem('gender', gender);
}

function createList() {
  const complete = document.querySelector('.complete');
  const gender = sessionStorage.getItem('gender');
  const string = sessionStorage.getItem('info');
  const array = string.split(',');
  const text = `Olá, ${array[0]} ${array[1]}`;
  const newLi = document.createElement('li');
  newLi.innerText = text;
  complete.appendChild(newLi);
  for (let index = 2; index < 4; index += 1) {
    const element = array[index];
    const newLi3 = document.createElement('li');
    newLi3.innerText = element;
    complete.appendChild(newLi3);
  }
  const newLi2 = document.createElement('li');
  newLi2.innerText = gender;
  complete.appendChild(newLi2);
}

function checkMemory() {
  if (sessionStorage.getItem('info') !== null) {
    createList();
  }
}

function alertText(number) {
  if (number !== 5) {
    document.querySelector('.alert').style.display = 'block';
  } else {
    saveContent();
  }
}

function validate() {
  const btn = document.getElementById('facebook-register');
  btn.addEventListener('click', () => {
    alertText(check());
  });
}

window.onload = function run() {
  loginAlert();
  addCustonGender();
  removeCustonGender();
  validate();
  checkMemory();
};
