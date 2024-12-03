import { useState } from "react";
import ContentRelatorios from "./contentRelatorios";
import ContentEnriquecimento from "./contentEnriquecimento";


 function Relatorios() {
        const [relatorioVisible, setRelatorioVisible] = useState(false);
        const [enriquecimentoVisible, setEnriquecimentoVisible] = useState(false);


        function showRelatorio() {
            setRelatorioVisible(true);
            setEnriquecimentoVisible(false);
        }

        function showEnriquecimento() {
            setRelatorioVisible(false);
            setEnriquecimentoVisible(true);
        }


        return (
            <>
            <div className="relatorios-container"> 
                <div className="relatorios-list"> 
                    <button className="relatorio-button" onClick={showRelatorio}>Relatórios</button>
                    <button className="relatorio-button" onClick={showEnriquecimento}>Enriquecimento</button>


                </div>
            </div>
                    {relatorioVisible && (
                        <div className="relatorio-content">
                            <ContentRelatorios />
                        </div>
                    )}
                    {enriquecimentoVisible && (
                        <div className="relatorio-content">
                            <ContentEnriquecimento />
                        </div>
                    )}
                    <br /><br /><br /><br /><br /><br />

            </>
        );
 }

 export default Relatorios;