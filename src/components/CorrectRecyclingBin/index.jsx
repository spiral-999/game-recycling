import { useEffect, useState } from "react";
import './style.css';

import BinYellow from '../../assets/recycle-bin-yellow.png';
import BinBlue from '../../assets/recycle-bin-blue.png';
import BinGreen from '../../assets/recycle-bin.png';
import BinRed from '../../assets/recycle-bin-red.png';
import ButtonBack from '../ButtonBack';

import Mail from '../../assets/mail.png';
import PlasticBottle from '../../assets/plastic-bottle.png';
import Paper from '../../assets/papers.png';
import CocktailGlass from '../../assets/cocktail-glass.png';
import BrokenGlass from '../../assets/broken-glass.png';
import PlasticCup from '../../assets/plastic-cup.png';
import Pot from '../../assets/pot.png';
import SodaCan from '../../assets/soda-can.png';


export default function CorrectRecyclingBin() {
    const items = [
        { id: 1, name: 'mail', img: Mail, bin: 'blue' },
        { id: 2, name: 'plasticBottle', img: PlasticBottle, bin: 'red' },
        { id: 3, name: 'paper', img: Paper, bin: 'blue' },
        { id: 4, name: 'cocktailGlass', img: CocktailGlass, bin: 'green' },
        { id: 5, name: 'brokenGlass', img: BrokenGlass, bin: 'green' },
        { id: 6, name: 'plasticCup', img: PlasticCup, bin: 'red' },
        { id: 7, name: 'pot', img: Pot, bin: 'yellow' },
        { id: 8, name: 'sodaCan', img: SodaCan, bin: 'yellow' },
    ];

    // embaralha
    function shuffle(array) {
        return [...array].sort(() => Math.random() - 0.5);
    }

    const [shuffledItems, setShuffledItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const randomized = shuffle(items);
        setShuffledItems(randomized);
        setCurrentIndex(0);
        setScore(0);
        setFinished(false);
    }, []);

    function checkBin(binName) {
        const currentItem = shuffledItems[currentIndex];

        if (!currentItem) return;

        if (binName === currentItem.bin) {
            setScore(prev => prev + 1);

            if (currentIndex + 1 < shuffledItems.length) {
                setCurrentIndex(prev => prev + 1);
            } else {
                setFinished(true);
            }
        }
    }

    function restartGame() {
        const randomized = shuffle(items);
        setShuffledItems(randomized);
        setCurrentIndex(0);
        setScore(0);
        setFinished(false);
    }

    const currentItem = shuffledItems[currentIndex];

    return (
        <>
            <ButtonBack />

            <div className="correct-bin-container">
                <h2>Qual é a lixeira correta?</h2>

                <div className="score">
                    Pontuação: {score}
                </div>

                <button onClick={restartGame} className="reset-btn">
                    Reiniciar
                </button>

                {/* Se terminou, mostra parabéns */}
                {finished ? (
                    <h3>🎉 Parabéns! Você acertou todos os itens! 🎉</h3>
                ) : (
                    <div className='itens-container'>
                        {currentItem && (
                            <img
                                src={currentItem.img}
                                alt={currentItem.name}
                                className="item-img"
                            />
                        )}
                    </div>
                )}

                <div className="bins">
                    <div className="bin-item" onClick={() => checkBin("yellow")}>
                        <img src={BinYellow} alt="Lixeira Amarela" />
                        <p>Lixeira Amarela</p>
                    </div>
                    <div className="bin-item" onClick={() => checkBin("blue")}>
                        <img src={BinBlue} alt="Lixeira Azul" />
                        <p>Lixeira Azul</p>
                    </div>
                    <div className="bin-item" onClick={() => checkBin("green")}>
                        <img src={BinGreen} alt="Lixeira Verde" />
                        <p>Lixeira Verde</p>
                    </div>
                    <div className="bin-item" onClick={() => checkBin("red")}>
                        <img src={BinRed} alt="Lixeira Vermelha" />
                        <p>Lixeira Vermelha</p>
                    </div>
                </div>
            </div>
        </>
    );
}
