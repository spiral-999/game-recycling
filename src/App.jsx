import { useNavigate } from "react-router-dom";
import "./App.css";

export default function App() {
  const navigate = useNavigate();
  return (
    <>
      <header className="header">
        <h1 className="title">Recicla<span className="highlight">Key</span></h1>
        <p className="subtitle">Brinque e aprenda a salvar o planeta!</p>
      </header>

      <main className="menu-container">
        
        {/* 1. Área de Estudo (Voltou para o topo) */}
        <section className="study-section">
            <div className="study-card" onClick={() => navigate('learning')}>
                <div className="study-icon">📚</div>
                <div className="study-info">
                    <h2>Galeria da Reciclagem</h2>
                    <p>Aprenda as cores e itens!</p>
                </div>
                <div className="arrow-icon">➜</div>
            </div>
        </section>

        {/* 2. Minigames */}
        <section className="games-section">
            <h3 className="section-title">🎮 Escolha um Jogo</h3>
            <div className="games-grid">
                <button className="game-card" onClick={() => navigate('memory-quiz')}>
                    <span className="game-emoji">🧠</span>
                    Jogo da Memória
                </button>
                <button className="game-card" onClick={() => navigate('correct-recycling-bin')}>
                    <span className="game-emoji">♻️</span>
                    Lixeira Correta
                </button>
                <button className="game-card" onClick={() => navigate('recycling-quiz')}>
                    <span className="game-emoji">❓</span>
                    Verdadeiro ou Falso
                </button>
            </div>
        </section>

      </main>

      {/* 3. Rodapé com Créditos */}
      <footer className="footer">
        <p><strong>Equipe:</strong> Augusto César, Elizadora Mendonça e Mateus Lima.</p>
        <p>Educação Ambiental • Prof. Paulo Armando</p>
      </footer>
    </>
  );
}