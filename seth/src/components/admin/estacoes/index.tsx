import { useState } from "react"
import "./index.css"

export default function Interface_Controle_Estacoes() {

    return (
        <>
            <div id="Box_Estacoes">

                <div id="Title_Box">
                    <h2> Controle de Estações </h2>
                </div>

                <hr />

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mac Adress</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Cep</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Exemplo 1</td>
                            <td>M4C_4drss:00.456.001.01</td>
                            <td>Sâo Paulo</td>
                            <td>São Paulo</td>
                            <td>04657-432</td>
                        </tr>
                        <tr>
                            <td>Exemplo 2</td>
                            <td>M4C_4drss:20.485.029.02</td>
                            <td>Rio de Janeiro</td>
                            <td>Rio de Janeiro</td>
                            <td>84580-456</td>
                        </tr>

                    </tbody>
                </table>


            </div>
        </>
    )
}