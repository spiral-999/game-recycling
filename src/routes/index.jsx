import { Route, Routes } from "react-router-dom";
import RecyclingQuiz from "../components/RecyclingQuiz";
import MemoryGame from "../components/MemoryGame";
import CorrectRecyclingBin from "../components/CorrectRecyclingBin";
import LearningModule from "../components/LearningModule";
import App from "../App";


export default function AppRoutes(){
    return(
        <Routes>
            <Route exact path="/" element={<App/>}/>
            <Route path="/recycling-quiz" element={<RecyclingQuiz/>}/>
            <Route path="/memory-quiz" element={<MemoryGame/>}/>
            <Route path="/correct-recycling-bin" element={<CorrectRecyclingBin/>}/>
            <Route path="/learning" element={<LearningModule/>}/>
        </Routes>
    )
}