import { useState } from "react"
import "./index.css"

export default function Interface_Controle_Parametros() {

    return(
        <>
            <div id="Box_Parametros">

                <div id="Title_Box">
                    <h2> Controle de Parametros </h2>
                </div>

                <hr />

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Fator</th>
                            <th>Offset</th>
                            <th>Unidade de Medida</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Exemplo 1</td>
                            <td>Pluviométrico</td>
                            <td>-20 g/m3</td>
                            <td> g/m3</td>
                            
                        </tr>
                        <tr>
                            <td>Exemplo 2</td>
                            <td>Velocidade do Vento</td>
                            <td>+6 km/h</td>
                            <td> km/h</td>
                            
                        </tr>

                    </tbody>
                </table>


            </div>
        </>
    )
}