/*=============================================================================
Instituto Federal do Rio de Janeiro - IFRJ
Campus São João de Meriti
Projeto PIBITI Jr. 2020-2021

UMA SOLUÇÃO DOMÉSTICA PARA PRODUÇÃO DE CONTEÚDOS DIGITAIS
DE VIDEOAULAS COM TELEPROMPTER

Prof. Gilvan de Oliveira Vilarim - gilvan.vilarim@ifrj.edu.br

Colaboradores: Prof. Caio Henrique Sicas Lamas e Bruno Carlos da Cunha Costa
Aluno: Aleson Sobral Felizardo - Curso Técnico em Informática para Internet

Teleprompter on-line - pequeno teleprompter para leitura de textos em câmeras
ou aparelhos eletrônicos de tela 
Adaptado livremente de:
https://whitehatcrew.com/tools/free-online-teleprompter.php 

Mudanças realizadas:
nova indentação; separação do HTML, CSS e JS; CSS mínimo para flexibilizar 
estilização e uso de frameworks; adaptação de comandos; tradução da interface;
tradução e padronização de identificadores; inclusão de comentários; diversos 
espaçamentos, limpeza e arrumação no código; conversão de valores absolutos em 
porcentagens; tratamento de eventos com ouvintes;

Novas funcionalidades:
- personalização de teclas de atalho
- nova interface
- persistência de configurações no Local Storage 
- testes com teclados sem fio ou virtuais
- atalho para tela cheia
- opção para exibir texto em maiúsculas
 
*/

/*
Carregar últimos dados do localStorage do navegador, caso existam
*/
function carregarDados(){
  var aux;
  aux = localStorage.getItem("veloc");
  if (aux != null){
    velocf.value      = localStorage.getItem("veloc");
    tamanho.value     = localStorage.getItem("tamanho");
    largura.value     = localStorage.getItem("largura");
    posIni.value      = localStorage.getItem("posIni");
	espelhado.value   = localStorage.getItem("espelhado");
	espelhado.checked = espelhado.value === "1" ? true : false;
	maiusc.value      = localStorage.getItem("maiusc");
	maiusc.checked    = maiusc.value === "1" ? true : false;
	
    c.value           = localStorage.getItem("c");
    tcIni.value = localStorage.getItem("tcIni").toUpperCase();
    tcRei.value = localStorage.getItem("tcRei").toUpperCase();
    tcAva.value = localStorage.getItem("tcAva").toUpperCase();
    tcRec.value = localStorage.getItem("tcRec").toUpperCase();
    tcAce.value = localStorage.getItem("tcAce").toUpperCase();
    tcRed.value = localStorage.getItem("tcRed").toUpperCase();
    tcAla.value = localStorage.getItem("tcAla").toUpperCase();
    tcEst.value = localStorage.getItem("tcEst").toUpperCase();
    tcAum.value = localStorage.getItem("tcAum").toUpperCase();
    tcDim.value = localStorage.getItem("tcDim").toUpperCase();
    tcTel.value = localStorage.getItem("tcTel").toUpperCase();
    tcSai.value = localStorage.getItem("tcSai").toUpperCase();
  }//if
}//carregarDados()

/*
Gravar dados no localStorage do navegador para reuso posterior
*/
function gravarDados(){
  localStorage.setItem("veloc",velocf.value);
  localStorage.setItem("tamanho", tamanho.value);
  localStorage.setItem("largura",largura.value);
  localStorage.setItem("posIni",posIni.value);
  localStorage.setItem("espelhado",espelhado.checked ? "1" : "0");
  localStorage.setItem("maiusc",maiusc.checked ? "1" : "0");
  
  localStorage.setItem("c",c.value);

  localStorage.setItem("tcIni",tcIni.value);
  localStorage.setItem("tcRei",tcRei.value);
  localStorage.setItem("tcAva",tcAva.value);
  localStorage.setItem("tcRec",tcRec.value);
  localStorage.setItem("tcAce",tcAce.value);
  localStorage.setItem("tcRed",tcRed.value);
  localStorage.setItem("tcAla",tcAla.value);
  localStorage.setItem("tcEst",tcEst.value);
  localStorage.setItem("tcAum",tcAum.value);
  localStorage.setItem("tcDim",tcDim.value);
  localStorage.setItem("tcTel",tcTel.value);
  localStorage.setItem("tcSai",tcSai.value);
}//gravarDados()

/*
Rolar o texto do conteúdo
*/
function rolarTexto() {
  if (!rolando)
    return;
  posTopo = posTopo - veloc ;
  conteudo.style.top = posTopo + 'px'; //rolagem da div de baixo para cima
  setTimeout(rolarTexto, 500);
}//rolarTexto()

/*
Executar teleprompter ao ocorrer evento de chamada
*/
function execTeleprompter() {
  //Grava dados no localStorage
  gravarDados();
  
  //Inicializa atributos
  rolando = false;
  veloc = parseInt(velocf.value);
  telaEdicao.style.display  = 'none'; //oculta tela de edicao
  
  posTopo = parseInt(posIni.value);
  conteudo.style.width      = largura.value + '%';
  conteudo.style.marginLeft = '-' + Math.ceil(largura.value/2) + '%';
  conteudo.style.top        = posTopo + 'px';
  conteudo.style.fontSize   = tamanho.value + 'px';
  conteudo.style.lineHeight = '1.4em'; //1.4x o tamanho da fonte corrente
  
  //Faz espelhamento - usa compatibilidades com diferentes navegadores
  transformacao = espelhado.checked ? 'scaleX(-1)' : '';
  conteudo.style.msTransform     = transformacao;
  conteudo.style.MozTransform    = transformacao;
  conteudo.style.webkitTransform = transformacao;
  conteudo.style.OTransform      = transformacao;
  conteudo.style.transform       = transformacao;
  
  //Coloca em maiúsculas
  conteudo.style.textTransform = maiusc.checked ? 'uppercase' : 'none';
  
  //Monta o texto dentro da div de rolagem
  conteudo.innerHTML = c.value.replace(/(\r\n|\r|\n)/g,"<br>");
  
  //Exibe tela de execução  
  telaExec.style.display = 'block';

  //Aguarda teclar algo e chama função se ocorrer 
  document.onkeydown = function(e) { navTeclas(e); }
}//execTeleprompter()

/*
Executar ação a partir da tecla pressionada
Use o site https://keycode.info/ para conhecer os códigos das teclas
*/
function navTeclas(e) {
  var teclou = false;
  /*
  Códigos de tecla úteis (usar ASCII e Unicode)
  - letra A e a: 65 e 97
  - letra Z e z: 90 e 122
  - Esc 27, Enter 13, Space 32, / 193
  - setas: esq 37, sup 38, dir 39, inf 40
  - TAB ENTER BACKSPACE
    CAPSLOCK SCROLLLOCK NUMLOCK
    INSERT DELETE HOME END PAGEUP PAGEDOWN
    ARROWUP ARROWDOWN ARROWLEFT ARROWRIGHT
	CONTROL SHIFT ALTGRAPH ALT
	AUDIOVOLUMEUP AUDIOVOLUMEDOWN MEDIATRACKPREVIOUS MEDIATRACKNEXT MEDIAPLAYPAUSE
    AB Shutter: botão IOS é 175 (Vol+), botão Android é 13 (Enter)
  */
  var tecla = e.key.toUpperCase();
  switch (tecla){ //(e.keyCode) {
	//Iniciar / Pausar  
    case tcIni.value: case "ENTER":
      if (rolando)
  	    rolando = false;
      else {
        rolando = true;
        rolarTexto();
      }
      teclou = true;
      break;
	//Reiniciar rolagem  
    case tcRei.value:
      rolando = false;
      posTopo  = parseInt(posIni.value);
      conteudo.style.top = posTopo + 'px';
      teclou = true;
      break;
	//Avançar rolagem
    case tcAva.value:
      posTopo = posTopo - 150;
      conteudo.style.top = posTopo + 'px';
      teclou = true;
      break;
	//Recuar rolagem
    case tcRec.value:
      posTopo = posTopo + 150;
      conteudo.style.top = posTopo + 'px';
      teclou = true;
      break;
	//Acelerar rolagem
    case tcAce.value:
      if (veloc < 90)
        veloc = veloc + 5;
      velocf.value = veloc;
      teclou = true;
      break;
	//Reduzir rolagem
    case tcRed.value:
      veloc = veloc - 5;
      if (veloc < 1)
        veloc = 1; // para veloc ter um valor mínimo
      velocf.value = veloc;
      teclou = true;
      break;
	//Aumentar tamanho fonte
    case tcAum.value:
      tamanho.value = parseInt(tamanho.value) + 2;
      conteudo.style.fontSize = tamanho.value + 'px';
      teclou = true;
      break;
	//Diminuir tamanho fonte
    case tcDim.value:
      tamanho.value = parseInt(tamanho.value) - 2;
      if (tamanho.value < 16)
		tamanho.value = 16;//valor mínimo
      conteudo.style.fontSize = tamanho.value + 'px';
      teclou = true;
      break;
	//Alargar conteudo
    case tcAla.value:
      largura.value = parseInt(largura.value) + 2;
	  if (largura.value > 100)
		  largura.value = 100;//valor máximo
      conteudo.style.width = largura.value + '%';
      conteudo.style.marginLeft = '-' + Math.ceil(largura.value/2) + '%';//centralizar
      teclou = true;
      break;
	//Estreitar conteudo
    case tcEst.value:
      largura.value = parseInt(largura.value) - 2;
      if (largura.value < 10)
        largura.value = 10;
      conteudo.style.width = largura.value + '%';
      conteudo.style.marginLeft = '-' + Math.ceil(largura.value/2) + '%';
      teclou = true;
      break;
	//Ativar/desativar tela cheia
	case tcTel.value:
	  if (!document.fullscreenElement) 
        document.documentElement.requestFullscreen();
	  else 
        if (document.exitFullscreen) 
          document.exitFullscreen();
	  teclou = true;
	  break;
	//Sair da rolagem
    case tcSai.value: case "AUDIOVOLUMEUP":
      rolando = false;
      document.onkeydown = false;
      telaExec.style.display   = 'none' ;
      telaEdicao.style.display = 'block';
	  btExecutar.focus();
      teclou = true;
      break;
    default:
      break;
  }; //switch
  
  if (teclou)
    e.preventDefault();
  return teclou;
}//navTeclas()

/*
Seleciona todo o texto da textbox para agilizar colagem/apagamento
*/
function selecConteudo(){
  c.select();
}//selecConteudo()


/*
===============================================================================
PROGRAMA PRINCIPAL
===============================================================================
*/ 

//Inicializa variáveis globais
veloc      = 0;
posTopo    = 0;
rolando    = false;
telaEdicao = false;
c          = false;
conteudo   = false;
telaExec   = false;

velocf     = false;
tamanho    = false; 
largura    = false;
posIni     = false;
espelhado  = false;

//Associa variáveis aos elementos HTML da página chamadora
telaExec   = document.getElementById('divExecucao');
conteudo   = document.getElementById('divConteudo');
telaEdicao = document.getElementById('divEdicao');

velocf     = document.getElementById('inVeloc');
tamanho    = document.getElementById('inTam');
largura    = document.getElementById('inLargura');
posIni     = document.getElementById('inPosIni');
espelhado  = document.getElementById('chkEspelhado');
maiusc     = document.getElementById('chkMaiusc');
c          = document.getElementById('inConteudo');
executar   = document.getElementById("btExecutar");

tcIni = document.getElementById("inTcIni");
tcRei = document.getElementById("inTcRei");
tcAva = document.getElementById("inTcAva");
tcRec = document.getElementById("inTcRec");
tcAce = document.getElementById("inTcAce");
tcRed = document.getElementById("inTcRed");
tcAla = document.getElementById("inTcAla");
tcEst = document.getElementById("inTcEst");
tcAum = document.getElementById("inTcAum");
tcDim = document.getElementById("inTcDim");
tcTel = document.getElementById("inTcTel");
tcSai = document.getElementById("inTcSai");
  
//Carregamento das configurações  
carregarDados();

//Tratamento de eventos
c.addEventListener("click",selecConteudo);

//executar.addEventListener("touchstart",execTeleprompter);
executar.addEventListener("click",execTeleprompter);
btExecutar.focus();

//FIM DO PROGRAMA