const inputQuestion = document.getElementById('question');
const result = document.getElementById('result');

//função que vai pegar o inpur question

inputQuestion.addEventListener("keypress",(e)=>{
    if(inputQuestion.value && e.key === "Enter")
        sendQuestion();
});


const OPEN_API_KEY = "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"; /* minha chave do chatgpt   */

function sendQuestion(){
    var sQuestion = inputQuestion.value;


    fetch(`https://api.openai.com/v1/completions`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_API_KEY
        },
        body: JSON.stringify({
            model:"text-davinci-003",
            prompt: sQuestion,
            max_tokens: 2048, /* Tamanho da resposta  */
            temperature: 0.5, /*  Criatividade da Resposta */
        }),
    })   
    .then((response) => response.json())
    .then((json) => {
        if(result.value) result.value += "\n";

        if(json.error?.message){
            result.value += "Erro: " + json.error.message;
        }else if(json.choices?.[0].text){  
            var text = json.choices[0].text || " Sem resposta";
            result.value += "Chat gpt: " + text;
        }
        result.scrollTop = result.scrollHeight;

    })
    .catch((error) => console.error("error", error))
    .finally(()=>{
        inputQuestion.value = "";
        inputQuestion.disabled = true;
        inputQuestion.focus();
    });

    if (result.value) result.value += "\n\n\n"; // quebra linha */
    result.value += `EU: ${sQuestion}`
    inputQuestion.value = "carregando..."
    inputQuestion.disabled = true;


    result.scrollTop = result.scrollHeight;

}

  
  // Pegando o elemento do Canvas
  const c = document.getElementById("matrix"); // "c" é o canvas defindo

  // Definindo o seu contexto
  const letras = c.getContext("2d");
  
  // Aqui ele define o canvas sobre a tela toda 
  c.height = window.innerHeight;
  c.width = window.innerWidth;
  
  // Pinta o canvas inteiro com o comando fillRect
  // letras.fillRect(0, 0, c.width, c.height)
  // Muda a cor da letra 
  letras.fillStyle = "#696969";
  // Define o tamanho de tipo de fonte 
  letras.font = `60px arial`;

  //mostra as letras na tela 
  const letrasMatrix = ["日","ﾊ","ﾐ","ﾋ","ｰ","ｳ","ｼ","ﾅ","ﾓ","ﾆ","ｻ","ﾜ","ﾂ","ｵ","ﾘ","ｱ","ﾎ","ﾃ","ﾏ","ｹ","ﾒ",
          "ｴ","ｶ","ｷ","ﾑ","ﾕ","ﾗ","ｾ","ﾈ","ｽ","ﾀ","ﾇ","ﾍ",":","・",".","=","*","+","-","<",">","¦","｜","ﾘ"];
  
  const tamanhoLetra = 18; // aument o tamanho da letra

// definindo quantas colunas serão necessárias pelo tamanho da tela e fonte
  const coluna = c.width / tamanhoLetra;

// criando um array para cada gota, sempre iniciando na posição do y=1
  const drops = new Array(Math.floor(coluna)).fill(1);

function draw() {
  
  letras.fillStyle = "rgba(0, 0, 0, 0.05)";
  letras.fillRect(0, 0, c.width, c.height);

  // definindo a cor e estilo da fonte
  letras.fillStyle = "#696969";
  letras.font = `${letrasMatrix}px arial`;

  for (let i = 0; i < drops.length; i++) {
    // pegando uma letra randomicamente no nosso array
    const text = letrasMatrix[Math.floor(Math.random() * letrasMatrix.length)];

    // escrevendo na tela
    letras.fillText(text, i * tamanhoLetra, drops[i] * tamanhoLetra);

    drops[i]++;

    // faz com que as letras fiquem caindo 
    if (drops[i] * tamanhoLetra > c.height && Math.random() > 0.95) {
      drops[i] = 0;
    }
  }
  window.requestAnimationFrame(draw);// animação 
}

// chamando a função criada
draw()