import { useNavigate } from "react-router-dom";
import "./App.css";

export default function App() {
  const  navigate  = useNavigate();
  return (
    <>
      <header className="header">
        <h1 className="title">Bem-vindo ao <span className="highlight">ReciclaKey!</span></h1>
        <p className="subtitle">
          Escolha um minigame e aprenda sobre reciclagem de forma divertida.
        </p>
      </header>

      <main className="menu">
        <button className="menu-button" onClick={() => navigate('memory-quiz')}>Jogo da Memória</button>
        <button className="menu-button" onClick={() => navigate('recycling-quiz')}>Quiz da Reciclagem</button>
        <button className="menu-button" onClick={() => navigate('correct-recycling-bin')}>Lixeira Correta</button>
      </main>
    </>
  );
}
