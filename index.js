const pdf2html = require('pdf2html')

pdf2html.html('pdf/teste.pdf', (err, html) => {
  if (err) {
    console.error('Conversion error: ' + err)
  } else {
    const result = html  // Recebe o HTML (vem em array)
    
    //achando tabela por posição
    const position1 = result.indexOf("1-BOVESPA") // Primeira posição do array
    const position2 = result.indexOf("NOTA DE NEGOCIA") // Segunda posição do array 

    const resultAll = result.substring(position1,position2) // Restrição do Array no escopo de posições
    const finalResult1 = resultAll.replace("</p>") //Retiro as TAGS
    const finalResult2 = finalResult1.replace("<p>") //Retiro as TAGS
    
    const arrayResult = finalResult2.split("\n") // Quebro a linha e icremento em um array

    //For para tratamento de dados
    arrayResult.forEach(item => {
      console.log(item) // incrementar alguma estrutura || ou mudar estrutura
    });
    
  }
})
