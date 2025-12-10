import { useNavigate } from "react-router-dom"
import "./style.css"

export default function ButtonBack() {
    const navigate = useNavigate()
    return (
        <button className="back-btn" onClick={() => navigate("/")}>
            ⬅ Voltar
        </button>
    )
}