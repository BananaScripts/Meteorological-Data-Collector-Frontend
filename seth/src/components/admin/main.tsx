
import "./main.css"


import Interface_Controle_Alarmes from "./alarmes";
import Interface_Controle_Estacoes from "./estacoes";
import Interface_Controle_Usuarios from "./usuarios";
import Interface_Controle_Parametros from "./parametros";

import imagemAlarme from "../../assets/imgs/climate-change.png"
import imagemEstacao from "../../assets/imgs/climate-change(1).png"


export default function AdminComponent() {

  return (
    <>
      <div id="body_Admin_Page">
        

          <div id="Colluns_Admin">



              <div id="Alarmes_Box" className="Box">

                <Interface_Controle_Alarmes />

              </div>

              <div id="Image_Box" className="Box">

                <h5>  Alarmes que foram Acionados Recentemente <br /> (EM DESENVOLVIMENTO)</h5>
                

                <img src={imagemAlarme} alt="Alarmes Acionados" />

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

              <h5>  Ultimos Uploads de Dados nas Ultimas Horas <br /> (EM DESENVOLVIMENTO)</h5>

              <img src={imagemEstacao} alt="Ultimos Uploads de Dados" />

            </div>


          </div>

          <div id="Estacoes_Box" className="Box">

            <Interface_Controle_Estacoes />

          </div><br />
          
          
        
      </div>


    </>
  );
}