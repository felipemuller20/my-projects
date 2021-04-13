/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

const assert = require('assert');
const productDetails = require('../src/productDetails');

/*
  Dadas duas strings que representam nomes de produtos, retorne um array contendo dois objetos com os detalhes dos respectivos produtos.

  Parâmetros:
  - Uma string;
  - Uma string;

  Comportamento:
  productDetails('Alcool gel', 'Máscara') // Retorna:
  [
    {
      name: 'Alcool gel'
      details: {
        productId: 'Alcool gel123'
      }
    },
    {
      name: 'Máscara'
      details: {
        productId: 'Máscara123'
      }
    }
  ]

  OBS: Lembre-se que você não precisa se preocupar com o describe e o it por enquanto, isso será aprendido posteriormente.
*/

describe('#productDetails', () => {
  it('tests the function has the correct behaviour', () => {
    // assert.fail();
    // ESCREVA SEUS TESTES ABAIXO:
    // Teste que o retorno da função é um array.
    assert.deepStrictEqual(typeof (productDetails('Alcool gel', 'Máscara')), 'object');
    // Teste que o array retornado pela função contém dois itens dentro.
    assert.deepStrictEqual(Object.entries(productDetails('Alcool gel', 'Máscara')).length, 2);
    // Teste que os dois itens dentro do array retornado pela função são objetos.
    const par1 = Object.entries(productDetails('Alcool', 'Mascara')[0]);
    const par2 = Object.entries(productDetails('Alcool', 'Mascara')[1]);
    assert.deepStrictEqual(typeof (par1), 'object');
    assert.deepStrictEqual(typeof (par2), 'object');
    // Teste que os dois objetos são diferentes entre si.
    assert.notDeepStrictEqual(par1, par2);
    // (Difícil) Teste que os dois productIds terminam com 123.
    let resultado = productDetails('mascara', 'alcool');
    let first = resultado[0].details.productId;
    let second = resultado[1].details.productId;
    let firstArr = first.split('');
    let newFirst = [];
    for (let index = (firstArr.length - 3); index < firstArr.length; index += 1) {
      newFirst.push(firstArr[index]);
    }
    assert.deepStrictEqual(newFirst.join(''), '123');
    let secondArr = second.split('');
    let newSecond = [];
    for (let index = (secondArr.length - 3); index < secondArr.length; index += 1) {
      newSecond.push(secondArr[index]);
    }
    assert.deepStrictEqual(newSecond.join(''), '123');
  });
});
