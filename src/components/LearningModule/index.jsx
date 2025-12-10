import { useState } from "react";
import ButtonBack from "../ButtonBack";
import "./styles.css";

// Importando imagens das lixeiras
import BinBlue from '../../assets/recycle-bin-blue.png';
import BinRed from '../../assets/recycle-bin-red.png';
import BinYellow from '../../assets/recycle-bin-yellow.png';
import BinGreen from '../../assets/recycle-bin.png'; 
import BinBrown from '../../assets/recycle-bin-marrom.png'; // <--- Nova imagem!

// Importando exemplos de lixo
import Papers from '../../assets/papers.png';
import PaperBag from '../../assets/paper-bag.png';
import PlasticBottle from '../../assets/plastic-bottle.png';
import PlasticCup from '../../assets/plastic-cup.png';
import SodaCan from '../../assets/soda-can.png';
import Glass from '../../assets/broken-glass.png';
import Compost from '../../assets/compost.png';
import TrashCan from '../../assets/trash-can.png';

const learningData = [
  {
    id: 'blue',
    colorName: 'Azul',
    material: 'Papel',
    description: 'Aqui jogamos caixas, cadernos velhos, jornais e sacolas de papel. Lembre-se: papel sujo de gordura não vale!',
    binImg: BinBlue,
    items: [Papers, PaperBag],
    bgColor: '#e3f2fd',
    borderColor: '#2196f3'
  },
  {
    id: 'red',
    colorName: 'Vermelho',
    material: 'Plástico',
    description: 'Garrafas PET, potes de iogurte, sacolas plásticas e brinquedos quebrados vão aqui.',
    binImg: BinRed,
    items: [PlasticBottle, PlasticCup],
    bgColor: '#ffebee',
    borderColor: '#f44336'
  },
  {
    id: 'yellow',
    colorName: 'Amarelo',
    material: 'Metal',
    description: 'Latinhas de refrigerante, tampinhas de garrafa e lacres de alumínio.',
    binImg: BinYellow,
    items: [SodaCan],
    bgColor: '#fffde7',
    borderColor: '#fbc02d'
  },
  {
    id: 'green',
    colorName: 'Verde',
    material: 'Vidro',
    description: 'Garrafas, potes de geleia e copos. Cuidado se estiver quebrado!',
    binImg: BinGreen,
    items: [Glass],
    bgColor: '#e8f5e9',
    borderColor: '#4caf50'
  },
  {
    id: 'brown',
    colorName: 'Marrom',
    material: 'Orgânico',
    description: 'Restos de frutas, cascas de legumes e folhas. Isso vira adubo para as plantas!',
    binImg: BinBrown, 
    items: [Compost],
    bgColor: '#efebe9',
    borderColor: '#795548'
  }
];

export default function LearningModule() {
  const [selectedBin, setSelectedBin] = useState(null);

  return (
    <>
      <ButtonBack />
      <div className="learning-container">
        <div className="header-learn">
            <img src={TrashCan} alt="Mascote" className="mascot-learn" />
            <div className="text-intro">
                <h2>Galeria da Reciclagem</h2>
                <p>Toque em uma lixeira para descobrir o que vai dentro dela!</p>
            </div>
        </div>

        <div className="bins-menu">
            {learningData.map((data) => (
                <div 
                    key={data.id} 
                    className={`bin-selector ${selectedBin?.id === data.id ? 'active' : ''}`}
                    onClick={() => setSelectedBin(data)}
                >
                    <img src={data.binImg} alt={data.colorName} />
                    <span style={{color: data.borderColor}}>{data.colorName}</span>
                </div>
            ))}
        </div>

        {selectedBin && (
            <div className="details-card" style={{ borderColor: selectedBin.borderColor, backgroundColor: selectedBin.bgColor }}>
                <div className="details-header">
                    <h3 style={{ color: selectedBin.borderColor }}>{selectedBin.material} ({selectedBin.colorName})</h3>
                    <button className="close-btn" onClick={() => setSelectedBin(null)}>X</button>
                </div>
                
                <p className="description">{selectedBin.description}</p>
                
                <div className="examples-area">
                    <p><strong>Exemplos:</strong></p>
                    <div className="items-row">
                        {selectedBin.items.map((item, index) => (
                            <img key={index} src={item} alt="Exemplo" className="example-img" />
                        ))}
                    </div>
                </div>
            </div>
        )}
      </div>
    </>
  );
}