// Quando clica nas imagens, aparece o testo
function iniiTabNav() {  
  const tabMenu = document.querySelectorAll('.js-tabmenu li')
  const tabContent = document.querySelectorAll('.js-tabcontent section')

  if(tabMenu.length && tabContent.length) { 
  tabContent[0].classList.add('ativo')


  function activeTab(index) {
     tabContent.forEach((section) => {
      section.classList.remove('ativo')
     })
     tabContent[index].classList.add('ativo')
    }

    tabMenu.forEach((itemMenu, index) => {
     itemMenu.addEventListener('click', () => {
      activeTab(index)
     })
    })
   }
}
iniiTabNav()

//Quando clica no titulo da aba FAQ aparece o texto
function initAccordion() {  
  const accordionList = document.querySelectorAll('.js-accordion dt')
  const activeClass = 'ativo'

  if(accordionList.length) { 
    accordionList[0].classList.add(activeClass)
    accordionList[0].nextElementSibling.classList.add(activeClass)


    function activeAccordion() {
      this.classList.toggle(activeClass)
      this.nextElementSibling.classList.toggle(activeClass)
    }

    accordionList.forEach((item) => {
      item.addEventListener('click', activeAccordion)
    })
  }
}
initAccordion()

function initiScrollSuave() { 
  const linkInternos = document.querySelectorAll('.js-menu a[href^="#"]')

  function scrollToSection(event) {
    event.preventDefault()
    const href = event.currentTarget.getAttribute('href')
    const section = document.querySelector(href)
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  linkInternos.forEach((link) => {
    link.addEventListener('click', scrollToSection)
  })
}
initiScrollSuave()

function initAnimacaoScroll() { 
  const sections = document.querySelectorAll('.js-scroll')
  if(sections.length) { 
    const windowMetade = window.innerHeight * 0.6

    function animaScroll() {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top - windowMetade
        if(sectionTop < 0) {
          section.classList.add('ativo')
        }
      })
    }
    animaScroll()
    window.addEventListener('scroll', animaScroll)
  }
}
initAnimacaoScroll()

// Fazer uma API do Correio, no campo CONTATO
async function buscaEndereco(cep) {
   
   var mensagemErro = document.getElementById('erro')
   mensagemErro.InnerHTML = ''

  try { 
 var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
 var consultaCEPCovertida = await consultaCEP.json()
  
  if(consultaCEPCovertida.erro) {
    throw Error('Cep não existe')
  }
   var cidade = document.getElementById('cidade')
   var logradouro = document.getElementById('endereco')
   var estado = document.getElementById('estado')
   var bairro = document.getElementById('bairro')

   cidade.value = consultaCEPCovertida.localidade
   logradouro.value = consultaCEPCovertida.logradouro
   estado.value = consultaCEPCovertida.uf
   bairro.value = consultaCEPCovertida.bairro

   console.log(consultaCEPCovertida)

   return consultaCEPCovertida
} catch(erro) {
  mensagemErro.innerHTML = `<p> CEP inválido. Digita o cep novamente </p>`
  console.log(erro)
 }
}

var cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))
 
