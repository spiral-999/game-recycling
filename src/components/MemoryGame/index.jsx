import { useEffect, useState } from "react";
import './styles.css';

import Compost from '../../assets/compost.png';
import Eco from '../../assets/eco.png';
import PaperBag from '../../assets/paper-bag.png';
import RecycleBin from '../../assets/recycle-bin.png';
import TrashCan from '../../assets/trash-can.png';
import Plant from '../../assets/plant.png';
import ButtonBack from "../ButtonBack";


const cards = [
    { id: 1, name: 'compost', img: Compost },
    { id: 2, name: 'eco', img: Eco },
    { id: 3, name: 'paperBag', img: PaperBag },
    { id: 4, name: 'recycleBin', img: RecycleBin },
    { id: 5, name: 'trashCan', img: TrashCan },
    { id: 6, name: 'plant', img: Plant },

]

export default function MemoryGame() {
    const [deck, setDeck] = useState([]);
    const [firstChoice, setFirstChoice] = useState(null);
    const [secondChoice, setSecondChoice] = useState(null);
    const [disabled, setDisabled] = useState(false);

    const [moves, setMoves] = useState(0);
    const [matches, setMatches] = useState(0);

    const [selectedIndex, setSelectedIndex] = useState(0);

    function shuffleCards() {
        const duplicated = [...cards, ...cards]
            .sort(() => Math.random() - 0.5)
            .map(card => ({
                ...card,
                uuid: crypto.randomUUID(),
                matched: false
            }));

        setDeck(duplicated);
        setFirstChoice(null);
        setSecondChoice(null);
        setMoves(0);
        setMatches(0);
    }

    function handleChoice(card) {
        if (disabled) return;
        if (card === firstChoice) return;

        firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    }

    useEffect(() => {
        if (firstChoice && secondChoice) {
            setDisabled(true);
            setMoves(prev => prev + 1);

            if (firstChoice.name === secondChoice.name) {
                setMatches(prev => prev + 1);

                setDeck(prev =>
                    prev.map(card =>
                        card.name === firstChoice.name ? { ...card, matched: true } : card
                    )
                );
                resetTurn();
            } else {
                setTimeout(() => resetTurn(), 900);
            }
        }
    }, [firstChoice, secondChoice]);

    useEffect(() => {
        function handleKey(e) {
            if (!deck.length) return;

            const total = deck.length;
            const cols = 6; // sua grade é 2x6
            let newIndex = selectedIndex;

            switch (e.key) {
                case "ArrowRight":
                    newIndex = (selectedIndex + 1) % total;
                    break;

                case "ArrowLeft":
                    newIndex = (selectedIndex - 1 + total) % total;
                    break;

                case "ArrowDown":
                    newIndex = (selectedIndex + cols) % total;
                    break;

                case "ArrowUp":
                    newIndex = (selectedIndex - cols + total) % total;
                    break;

                case " ":
                case "Enter":
                    e.preventDefault();
                    handleChoice(deck[selectedIndex]);
                    return;
            }

            setSelectedIndex(newIndex);
        }

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [deck, selectedIndex, handleChoice]);


    function resetTurn() {
        setFirstChoice(null);
        setSecondChoice(null);
        setDisabled(false);
    }

    useEffect(() => {
        shuffleCards();
    }, []);

    return (
        <>
            <ButtonBack />
            <div className="memory-container">
                <h2>Jogo da Memória</h2>

                <div className="score">
                    🧠 Jogadas: {moves} | ⭐ Pares encontrados: {matches}/6
                </div>

                {matches === 6 && (
                    <h3>🎉 Parabéns! Você encontrou todos os 6 pares! 🎉</h3>
                )}

                <button onClick={shuffleCards} className="reset-btn">
                    Reiniciar
                </button>

                <div className="grid">
                    {deck.map((card, index) => (
                        <Card
                            key={card.uuid}
                            card={card}
                            index={index}
                            selected={index === selectedIndex}
                            handleChoice={handleChoice}
                            flipped={
                                card === firstChoice ||
                                card === secondChoice ||
                                card.matched
                            }
                        />
                    ))}

                </div>
            </div>
        </>
    );
}

function Card({ card, handleChoice, flipped, selected }) {
    return (
        <div className={`card ${selected ? "selected" : ""}`}>
            <div className={`inner ${flipped ? "flipped" : ""}`}>
                <div className="front">
                    <img src={card.img} alt={card.name} />
                </div>

                <div
                    className="back"
                    onClick={() => handleChoice(card)}
                >
                    ?
                </div>
            </div>
        </div>
    );
}
