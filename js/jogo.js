const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Como é transmitido o COVID-19?",
        choice1: "Quando tomar uma água contaminada",
        choice2: "Depois de tomar a vacina",
        choice3: "Depois de pegar um resfriado",
        choice4: "Gotículas saindo pela boca ou nariz quando tossem ou respiram",
        answer: 4,
    },
    {
        question:"O que devemos fazer depois de tomar a segunda dose ?",
        choice1: "Continuar evitando contato",
        choice2: "Se livar das máscaras",
        choice3: "Sentir os efeitos colaterais",
        choice4: "Ignorar as recomendações",
        answer: 1,
    },
    {
        question: "Quais são os sintomas mais comuns do COVID-19?",
        choice1: "Febre",
        choice2: "Falta de ar",
        choice3: "Cansaço",
        choice4: "Todas as respostas anteriores",
        answer: 4,
    },
    {
        question: "Lavar as mãos podem evitar de contrair o vírus?",
        choice1: "Sim, apenas para quem contraiu a doença",
        choice2: "Sim, Sabão com água ou desinfetante para as mãos iram ajudar na prevenção do COVID-19",
        choice3: "Sim, apenas molhar já é o suficiente",
        choice4: "Não, molhar as mãos não iram ajudar a previnir o COVID-19",
        answer: 2,
    },

    {
        question: "Quais são as pessoas mais frágeis com os sintomas do COVID-19?",
        choice1: "Crianças e pré-adoslecentes",
        choice2: "Somente os adultos são os que mais sofrem com os sintomas mais grave",
        choice3: "Pessoas mais doentes com imunidade baixa e os idosos geralmente acima dos 70 anos",
        choice4: "Pessoas que tiveram efeitos colaterais da vacina",
        answer: 3,
    },
    {
        question: "Em qual lugar ocorreu o primeiro registro oficial do COVID-19?",
        choice1: "Wuhan (China)",
        choice2: "Shangai (China)",
        choice3: "Seul (Coréia do Sul)",
        choice4: "Tókio (Japão)",
        answer: 1,
    },
    {
        question: "Por quanto tempo dura o período de incubação do COVID-19?",
        choice1: "20 a 40 dias",
        choice2: "1 a 14 dias",
        choice3: "12 a 16 dias",
        choice4: "Nenhuma das anteriores",
        answer: 2,
    },
    {
        question: "Qual nome damos para as pessoas que não estão doentes?",
        choice1: "Não sintomática",
        choice2: "Insitomática",
        choice3: "Assintomática",
        choice4: "Todas as anteriores",
        answer: 3,
    },
    {
        question: "Qual foi a última pandemia que assombrou a humanidade em quantidade de mortos e doentes?",
        choice1: "Cólera",
        choice2: "Gripe espanhola",
        choice3: "Peste bubônica",
        choice4: "Varíola",
        answer: 2,
    },
    {
        question: "O COVID-19 pode ser transmitido em países quentes e frios?",
        choice1: "Sim, apenas nos países tropicais e subtropicais",
        choice2: "Não, o vírus não sobrevive ao frio",
        choice3: "Sim, o vírus consegue se adaptar a diferentes climas",
        choice4: "Não, o vírus enfraquece em países muito quentes",
        answer: 3,
    }
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('fim.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()