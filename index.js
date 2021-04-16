const pdf2html = require('pdf2html')
const fs = require("fs");

pdf2html.html('pdf/teste.pdf', (err, html) => {
  if (err) {
    console.error('Conversion error: ' + err)
  } else {
    const result = html  // Recebe o HTML (vem em array)

    //achando tabela por posição
    const position1 = result.indexOf("1-BOVESPA") // Primeira posição do array
    const position2 = result.indexOf("NOTA DE NEGOCIA") // Segunda posição do array 

    const resultAll = result.substring(position1, position2) // Restrição do Array no escopo de posições
    const finalResult1 = resultAll.replace("</p>") //Retiro as TAGS
    const finalResult2 = finalResult1.replace("<p>") //Retiro as TAGS

    const arrayResult = finalResult2.split("\n") // Quebro a linha e icremento em um array
    console.log(arrayResult[0].length)

    var object = [];

    arrayResult.forEach(item => {
      object.push({
        Negociação: item.substr(0, 9),
        CV: item.substr(10, 12),
        TipoMercado: item.substr(13, 17),
        Prazo: item.substr(0, 9) || null,
        EspecTitulo: item.substr(18, 29),
        Obs: item.substr(45, 46),
        Quantidade: item.substr(47, 50),
        PrecoAjuste: item.substr(51, 56),
        ValorOP: item.substr(67, 66),
        DC: item.substr(68, 69)
      });
    });

    fs.writeFileSync("array.json", JSON.stringify(object));

  }
})


