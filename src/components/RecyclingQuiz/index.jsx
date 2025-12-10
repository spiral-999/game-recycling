import { useState, useEffect } from "react";
import ButtonBack from "../ButtonBack";
import "./styles.css";
import Mascot from "../../assets/trash-can.png";

const allQuestions = [ // perguntas do quizz aq, precisa só de um id, o texto da pergunta, se a resposta é verdadeiro ou falso e o texto que vai aparecer na explicação
    {
        id: 1,
        text: "Casca de banana e restos de maçã devem ir na lixeira vermelha (Plástico).",
        isTrue: false,
        explanation: "Falso! Restos de comida são lixo orgânico e vão na lixeira Marrom."
    },
    {
        id: 2,
        text: "A lixeira Azul serve para jogar papéis, caixas de papelão e jornais.",
        isTrue: true,
        explanation: "Verdade! Tudo isso é papel e deve ir na lixeira Azul."
    },
    {
        id: 3,
        text: "Devemos passar uma água nas embalagens sujas de comida antes de reciclar?",
        isTrue: true,
        explanation: "Sim! Restos de comida podem atrair bichos e atrapalhar a reciclagem."
    },
    {
        id: 4,
        text: "Papel engordurado (como caixa de pizza usada) pode ser reciclado na lixeira Azul.",
        isTrue: false,
        explanation: "Falso. Papel com gordura ou óleo não recicla. Vai no lixo comum!"
    },
    {
        id: 5,
        text: "Garrafas de vidro podem demorar até 4.000 anos para desaparecer na natureza.",
        isTrue: true,
        explanation: "Verdade! Por isso é muito importante jogar o vidro na lixeira Verde."
    },
    {
        id: 6,
        text: "A cor da lixeira para Metal (latinhas de refrigerante) é Amarelo.",
        isTrue: true,
        explanation: "Verdade! Lembre-se: Metal = Amarelo."
    },
    {
        id: 7,
        text: "Vidros quebrados podem ser jogados direto na sacola sem proteção.",
        isTrue: false,
        explanation: "Perigo! Vidro quebrado deve ser embrulhado em jornal ou caixa para não machucar ninguém."
    },
    {
        id: 8,
        text: "É bom amassar as garrafas PET e latinhas antes de jogar fora.",
        isTrue: true,
        explanation: "Verdade! Assim elas ocupam menos espaço na lixeira."
    },
    {
        id: 9,
        text: "Sacos plásticos e potes de iogurte devem ir na lixeira Verde.",
        isTrue: false,
        explanation: "Falso. Verde é para Vidro. Plástico vai na lixeira Vermelha!"
    },
    {
        id: 10,
        text: "O lixo da lixeira Marrom (Orgânico) pode virar adubo para as plantas.",
        isTrue: true,
        explanation: "Verdade! Esse processo se chama compostagem."
    }
];

export default function RecyclingQuiz() {
    const [questions, setQuestions] = useState([]);
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [answerStatus, setAnswerStatus] = useState(null);
    useEffect(() => {
        restart();
    }, []);

    function restart() {
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        setQuestions(shuffled);
        setScore(0);
        setCurrent(0);
        setShowResult(false);
        setAnswerStatus(null);
    }

    function handleAnswer(userChoseTrue) {
        if (!questions[current]) return;

        const question = questions[current];
        const isCorrect = (userChoseTrue === question.isTrue);

        if (isCorrect) {
            setScore(prev => prev + 1);
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('wrong');
        }
        setTimeout(() => {
            setAnswerStatus(null);
            if (current + 1 < questions.length) {
                setCurrent(prev => prev + 1);
            } else {
                setShowResult(true);
            }
        }, 3000);
    }

    if (questions.length === 0) return null;

    const question = questions[current];

    return (
        <>
            <ButtonBack />
            <div className="quiz-container">
                {showResult ? (
                    <div className="result-card">
                        <img src={Mascot} alt="Mascote" className="mascot-big" />
                        <h2>Quiz Finalizado!</h2>
                        <p>Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong>!</p>
                        
                        <div className="feedback-final">
                            {score === questions.length ? "🏆 Perfeito! Você sabe tudo de reciclagem!" : 
                             score >= 7 ? "🌟 Muito bem! Você aprendeu direitinho!" : 
                             "📚 Que tal visitar a Galeria da Reciclagem de novo?"}
                        </div>

                        <button onClick={restart} className="btn-restart">Jogar Novamente</button>
                    </div>
                ) : (
                    <div className="question-card">
                        <div className="mascot-area">
                            <img src={Mascot} alt="Mascote" className="mascot-small" />
                            <div className="speech-bubble">
                                {answerStatus ? (
                                    <span className={answerStatus === 'correct' ? 'text-green' : 'text-red'}>
                                        {answerStatus === 'correct' ? "Acertou! " : "Errou... "}
                                        {question.explanation}
                                    </span>
                                ) : (
                                    question.text
                                )}
                            </div>
                        </div>

                        {!answerStatus && (
                            <div className="buttons-area">
                                <button 
                                    className="btn-true" 
                                    onClick={() => handleAnswer(true)}>
                                    VERDADEIRO 👍
                                </button>
                                <button 
                                    className="btn-false" 
                                    onClick={() => handleAnswer(false)}>
                                    FALSO 👎
                                </button>
                            </div>
                        )}
                        
                        <div className="progress">
                            Pergunta {current + 1} de {questions.length}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}