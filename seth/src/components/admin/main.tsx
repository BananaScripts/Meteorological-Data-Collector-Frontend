import { useState } from "react";
import "./main.css"

import Interface_Controle_Alarmes from "./alarmes";
import Interface_Controle_Estacoes from "./estacoes";
import Interface_Controle_Usuarios from "./usuarios";
import Interface_Controle_Parametros from "./parametros";



export default function AdminComponent() {

  return (
    <>
      <div id="body_Admin_Page">
        

          <div id="Colluns_Admin">



              <div id="Alarmes_Box" className="Box">

                <Interface_Controle_Alarmes />

              </div>

              <div id="Image_Box" className="Box">

                

              </div>



          </div>

          <div id="Usuarios_Box" className="Box">

            <Interface_Controle_Usuarios />

          </div>
          

          <div id="Colluns_Admin">

            <div id='Parametros_Box' className="Box">

              <Interface_Controle_Parametros />

            </div>

            <div id="Image_Box" className="Box">

                

            </div>


          </div>

          <div id="Estacoes_Box" className="Box">

            <Interface_Controle_Estacoes />

          </div><br />
          
          
        
      </div>


    </>
  );
}