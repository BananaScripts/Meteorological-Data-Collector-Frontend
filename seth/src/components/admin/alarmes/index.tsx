import { useState } from "react";
import "./index.css"

export default function Interface_Controle_Alarmes() {
  

  return (
    <>
        <div id="Box_Alarmes">

            <div id="Title_Box">
                <h2> Controle de Alarmes </h2>
            </div>
            
            <hr />
            
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Condição</th>
                        <th>Valor</th>
                        <th>Parâmetro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Exemplo 1</td>
                        <td>Maior Que:</td>
                        <td>100</td>
                        <td>Celcius</td>
                    </tr>
                    <tr>
                        <td>Exemplo 2</td>
                        <td>Menor Que:</td>
                        <td>20</td>
                        <td>km/h</td>
                    </tr>
            
                </tbody>
            </table>

            
        </div>
    </>
  );
}
