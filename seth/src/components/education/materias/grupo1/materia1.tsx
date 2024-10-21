import React from 'react';
import '../../contentEducation.css';

const Materia1: React.FC = () => {
    return (
        <div className='aulas'>
<h2>Regra de Três</h2>
<p>A regra de três é uma maneira de resolver problemas que envolvem proporções. Em meteorologia, podemos usá-la para fazer previsões com base em dados existentes. Por exemplo, se sabemos que em uma cidade a previsão é de que haverá 30 mm de chuva em 3 dias, podemos usar a regra de três para descobrir quanto de chuva haverá em 5 dias.</p>
<p>Se 3 dias correspondem a 30 mm de chuva, podemos montar a seguinte proporção:</p>
<ul>
    <li>3 dias → 30 mm</li>
    <li>5 dias → x mm</li>
</ul>
<p>Para encontrar x, multiplicamos e dividimos: x = (30 mm × 5 dias) / 3 dias = 50 mm.</p>
<p>Assim, podemos concluir que a previsão é de 50 mm de chuva em 5 dias. A regra de três nos ajuda a fazer previsões e entender melhor a quantidade de chuva que podemos esperar em diferentes períodos.</p>
        </div>
    );
};

export default Materia1;
