import { useEffect, useState } from "react"
import axios from "axios"
import { Alarme } from "../../../../types/alarme"
import "../../main.css";

export default function DeleteAlarme() {
    const [id, setId] = useState(0)
    const [alarmes, setAlarmes] = useState<Array<Alarme>>([])

    useEffect(() => {
        axios.get('http://localhost:30105/api/alarmes')
            .then(response => {
                setAlarmes(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar alarmes:", error);
            });
    }, []);

    function deletar() {
        axios.delete(`http://localhost:30105/api/alarme/deletar/${id}`)
            .then(() => {
                alert("Alarme deletado com sucesso!")
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            <div id="DeleteAlarme">
                <hr />
                <div id="Title_Section">
                    <h3>Deletar um Alarme</h3>
                </div>

                <div id="Inputs_Camp">
                    <p>
                        Selecione o alarme que deseja deletar:
                        <select value={id} onChange={(e) => setId(Number(e.target.value))}>
                            <option value="">Selecione um alarme</option>
                            {alarmes.map((alarme) => (
                                <option key={alarme.cod_alarme} value={alarme.cod_alarme}>
                                    {alarme.nome}
                                </option>
                            ))}
                        </select>
                    </p>
                </div>

                <div id="Action">
                    <button onClick={deletar}>
                        Deletar
                    </button>
                </div>
            </div>
        </>
    )
}
