import { useEffect, useState } from "react";
import ButtonBack from '../ButtonBack';
import './style.css';

// Lixeiras (Imagens)
import BinYellow from '../../assets/recycle-bin-yellow.png';
import BinBlue from '../../assets/recycle-bin-blue.png';
import BinGreen from '../../assets/recycle-bin.png'; // Verde padrão
import BinRed from '../../assets/recycle-bin-red.png';
import BinBrown from '../../assets/recycle-bin-marrom.png'; // NOVA: Marrom

// Itens de Lixo
import Mail from '../../assets/mail.png';
import PlasticBottle from '../../assets/plastic-bottle.png';
import Paper from '../../assets/papers.png';
import PaperBag from '../../assets/paper-bag.png';
import CocktailGlass from '../../assets/cocktail-glass.png';
import BrokenGlass from '../../assets/broken-glass.png';
import PlasticCup from '../../assets/plastic-cup.png';
import Pot from '../../assets/pot.png';
import SodaCan from '../../assets/soda-can.png';
import Compost from '../../assets/compost.png'; // Orgânico
import Plant from '../../assets/plant.png';     // Orgânico

// Dicionário de Cores para o Feedback
const binNames = {
    yellow: "Metal (Amarelo)",
    blue: "Papel (Azul)",
    green: "Vidro (Verde)",
    red: "Plástico (Vermelho)",
    brown: "Orgânico (Marrom)"
};

export default function CorrectRecyclingBin() {
    // Lista Completa de Itens
    const items = [
        { id: 1, name: 'Cartas', img: Mail, bin: 'blue' },
        { id: 2, name: 'Garrafa PET', img: PlasticBottle, bin: 'red' },
        { id: 3, name: 'Papéis', img: Paper, bin: 'blue' },
        { id: 4, name: 'Saco de Papel', img: PaperBag, bin: 'blue' },
        { id: 5, name: 'Taça', img: CocktailGlass, bin: 'green' },
        { id: 6, name: 'Vidro Quebrado', img: BrokenGlass, bin: 'green' },
        { id: 7, name: 'Copo Descartável', img: PlasticCup, bin: 'red' },
        { id: 8, name: 'Panela Velha', img: Pot, bin: 'yellow' },
        { id: 9, name: 'Latinha', img: SodaCan, bin: 'yellow' },
        { id: 10, name: 'Restos de Comida', img: Compost, bin: 'brown' },
        { id: 11, name: 'Mudas de Planta', img: Plant, bin: 'brown' },
    ];

    function shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    const [shuffledItems, setShuffledItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    
    // Estados para Feedback Visual
    const [feedbackType, setFeedbackType] = useState(null); // 'success' ou 'error'
    const [feedbackMessage, setFeedbackMessage] = useState("");

    useEffect(() => {
        restartGame();
    }, []);

    function restartGame() {
        setShuffledItems(shuffle(items));
        setCurrentIndex(0);
        setScore(0);
        setFinished(false);
        setFeedbackType(null);
        setFeedbackMessage("");
    }

    function checkBin(selectedColor) {
        if (feedbackType) return; // Bloqueia cliques durante o feedback

        const currentItem = shuffledItems[currentIndex];
        if (!currentItem) return;

        if (selectedColor === currentItem.bin) {
            setScore(prev => prev + 1);
            setFeedbackType('success');
            setFeedbackMessage("✨ Isso aí! Muito bem!");
        } else {
            setFeedbackType('error');
            const correctName = binNames[currentItem.bin];
            setFeedbackMessage(`❌ Ops! Esse item vai na lixeira de ${correctName}.`);
        }

        // Delay para avançar
        setTimeout(() => {
            setFeedbackType(null);
            setFeedbackMessage("");
            
            if (currentIndex + 1 < shuffledItems.length) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setFinished(true);
            }
        }, 2000); // 2 segundos para ler
    }

    const currentItem = shuffledItems[currentIndex];

    return (
        <>
            <ButtonBack />
            <div className="correct-bin-container">
                
                {/* Cabeçalho */}
                {!finished && (
                    <div className="game-header">
                        <h2>Separe o Lixo!</h2>
                        <div className="score-badge">
                            Acertos: {score} / {items.length}
                        </div>
                    </div>
                )}

                {/* Feedback Overlay (Aparece na tela toda) */}
                {feedbackType && (
                    <div className={`feedback-overlay ${feedbackType}`}>
                        <div className="feedback-content">
                            <span className="feedback-icon">
                                {feedbackType === 'success' ? '🎉' : '🤔'}
                            </span>
                            <p>{feedbackMessage}</p>
                        </div>
                    </div>
                )}

                {/* Área do Jogo */}
                {finished ? (
                    <div className="result-area">
                        <h3>🎉 Limpeza Completa!</h3>
                        <p className="final-score">Pontuação: {score}</p>
                        <button onClick={restartGame} className="reset-btn">Jogar Novamente</button>
                    </div>
                ) : (
                    <div className='itens-container'>
                        {currentItem && (
                            <img
                                src={currentItem.img}
                                alt={currentItem.name}
                                className={`item-img ${feedbackType ? 'hidden' : ''}`} 
                            />
                        )}
                    </div>
                )}

                {/* Lixeiras (5 opções agora) */}
                <div className="bins">
                    <div className="bin-item" onClick={() => checkBin("blue")}>
                        <img src={BinBlue} alt="Papel" />
                    </div>
                    <div className="bin-item" onClick={() => checkBin("red")}>
                        <img src={BinRed} alt="Plástico" />
                    </div>
                    <div className="bin-item" onClick={() => checkBin("yellow")}>
                        <img src={BinYellow} alt="Metal" />
                    </div>
                    <div className="bin-item" onClick={() => checkBin("green")}>
                        <img src={BinGreen} alt="Vidro" />
                    </div>
                    <div className="bin-item" onClick={() => checkBin("brown")}>
                        <img src={BinBrown} alt="Orgânico" />
                    </div>
                </div>
            </div>
        </>
    );
}