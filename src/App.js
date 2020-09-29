import React, {useState,useEffect,Fragment} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {


  //State del formulario
  const [ busqueda, guardarBusqueda ] = useState({
    ciudad: '',
    pais: ''
  });

  const [ error, guardarError ] = useState(false);

  const [ consultar, guardarConsultar ] = useState(false);

  const [ resultado, guardarResultado ] = useState({});

  const { ciudad, pais } = busqueda;

  //Consultar API
  useEffect ( () => {
      const consultarApi = async () =>{

        if (consultar) {

          const appId = '357187f5085510cbc8d89a22a0021318';
          const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

            guardarResultado(resultado);
            guardarConsultar(false);

            //Si se encontro el pais a consultar
            if (resultado.cod === "404") {
                guardarError(true);
            }else{
              guardarError(false);
            }
        }

      }
      consultarApi();
      // eslint-disable-next-line
  }, [consultar]);

  //Carga condicional de componentes
  let componente;
  if (error) {
    componente = <Error  mensaje="No hay resultado" />
  }else{
    componente = <Clima  resultado={resultado} />
  }

  return (
    <Fragment>
      
      <Header 
        titulo="Clima React App"
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
              <div className="col m6 s12">
                  <Formulario 
                    busqueda={busqueda}
                    guardarBusqueda={guardarBusqueda}
                    guardarConsultar={guardarConsultar}
                  />
              </div>
              <div className="col m6 s12">
                  {componente}
              </div>
          </div>
        </div>

      </div>

    </Fragment>
  );
}

export default App;
