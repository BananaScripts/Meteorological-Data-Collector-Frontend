import { useState } from "react"
import "./index.css"

export default function Interface_Controle_Usuarios() {

    return(
        <>
            <div id="Box_Usuarios">

                <div id="Title_Box">
                    <h2> Controle dos Usuarios </h2>
                </div>

                <hr />

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Cpf</th>
                            <th>Senha</th>
                            <th>Data de Nasc.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Exemplo 1</td>
                            <td>exemplo.um@gmail.com</td>
                            <td>000.000.000-01</td>
                            <td>**********</td>
                            <td>31/02/2003</td>
                        </tr>
                        <tr>
                            <td>Exemplo 2</td>
                            <td>exemplo.dois@gmail.com</td>
                            <td>000.000.000-02</td>
                            <td>**********</td>
                            <td>32/02/1987</td>
                        </tr>

                    </tbody>
                </table>


            </div>
        </>
    )
}