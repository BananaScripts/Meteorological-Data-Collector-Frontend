
import "./main.css"


import INTERFACE_CONTROLE_ALARMES from "./alarmes"; 
import INTERFACE_CONTROLE_ESTACOES from "./estacoes";
import INTERFACE_CONTROLE_USUARIOS from "./usuarios";
import INTERFACE_CONTROLE_PARAMETROS from "./parametros";
/* import INTERFACE_DADOS_ESTACOES from "./dados"; */

import imagemAlarme from "../../assets/imgs/climate-change.png"
import imagemEstacao from "../../assets/imgs/climate-change(1).png"



export default function AdminComponent() {

  return (
    <>
      <div id="body_Admin_Page">
        

          <div id="Colluns_Admin">



              <div id="Alarmes_Box" className="Box">

                <INTERFACE_CONTROLE_ALARMES />

              </div>

              <div id="Image_Box" className="Box">

                <h5>  Alarmes que foram Acionados Recentemente <br /> (EM DESENVOLVIMENTO)</h5>
                

                <img src={imagemAlarme} alt="Alarmes Acionados" />

              </div>


          </div>

          <div id="Usuarios_Box" className="Box">

            <INTERFACE_CONTROLE_USUARIOS />

          </div>
          

          <div id="Colluns_Admin">

            <div id="Parametros_Box" className="Box">

              <INTERFACE_CONTROLE_PARAMETROS />

            </div>

            <div id="Image_Box" className="Box">

              <h5>  Ultimos Uploads de Dados nas Ultimas Horas <br /> (EM DESENVOLVIMENTO)</h5>

              <img src={imagemEstacao} alt="Ultimos Uploads de Dados" />

            </div>


          </div>

          <div id="Estacoes_Box" className="Box">

            <INTERFACE_CONTROLE_ESTACOES />

          </div><br />

        {/*
        <div id="Dados_Box" className="Box">

            <INTERFACE_DADOS_ESTACOES />

          </div><br />
          */}
          
        
      </div>


    </>
  );
}