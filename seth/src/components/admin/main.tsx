
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
      <div id="body_Admin_Page" className="bodyAdmin">
        
      <h1>Página do Administrador</h1>
          <div className="caixacinza" id="Colluns_Admin">


              <div id="Alarmes_Box" className="caixacinzaclaro">

                <INTERFACE_CONTROLE_ALARMES />

              </div>

              <div id="Image_Box" className="caixacinzaclaro">

                <h5>  Alarmes que foram Acionados Recentemente <br /> (EM DESENVOLVIMENTO)</h5>
                

                <img src={imagemAlarme} alt="Alarmes Acionados" />

              </div>


          </div>

          <div className="caixacinza">
          <div id="Usuarios_Box" className="caixacinzaclaro">

            <INTERFACE_CONTROLE_USUARIOS />

          </div>
          </div>
          

          <div className="caixacinza" id="Colluns_Admin">

            <div id="Parametros_Box" className="caixacinzaclaro">

              <INTERFACE_CONTROLE_PARAMETROS />

            </div>

            <div id="Image_Box" className="caixacinzaclaro">

              <h5>  Ultimos Uploads de Dados nas Ultimas Horas <br /> (EM DESENVOLVIMENTO)</h5>

              <img src={imagemEstacao} alt="Ultimos Uploads de Dados" />

            </div>


          </div>

          <div className="caixacinza">
          <div id="Estacoes_Box" className="caixacinzaclaro">

            <INTERFACE_CONTROLE_ESTACOES />

          </div><br />
          </div>

        {/*
        <div id="Dados_Box" className="Box">

            <INTERFACE_DADOS_ESTACOES />

          </div><br />
          */}
          
        
      </div>


    </>
  );
}