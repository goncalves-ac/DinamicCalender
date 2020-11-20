import React from "react";
import {Link} from "react-router-dom";

const PoliticaDeDados = () => {
    return (
        <section className="use-terms-modal">
            <h2>Política de Dados (Privacidade)</h2>
            <p>
                A sua privacidade é importante para nós. É política do Calendário Dinâmico respeitar a sua privacidade em relação
                a qualquer informação sua que possamos coletar no site <Link to="/login">Calendário Dinâmico</Link>, e outros sites que
                possuímos e operamos.
            </p>
            <p>
                Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo
                por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e
                como será usado.
            </p>
            <p>
                Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos
                dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso,
                divulgação, cópia, uso ou modificação não autorizados.
            </p>
            <p>
                Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
            <p>
                O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos
                controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas
                 <Link to='https://politicaprivacidade.com' target='_BLANK'> políticas de privacidade</Link>.
            </p>
            <p>
                Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer
                alguns dos serviços desejados.
            </p>
            <p>
                O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e
                informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais,
                entre em contacto connosco.
            </p>
        </section>
    );
}

export default PoliticaDeDados;