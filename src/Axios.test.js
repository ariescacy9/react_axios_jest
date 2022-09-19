/*
npm install jest
npm i jest-mock-axios
npm install axios --save
crear archivo en src  .babelrc
  //contenid
{
  "presets": ["@babel/react", "@babel/env"]
}
*/

import axios from 'axios';
import { fetchData, API} from "./AxiosShow";
// se ejecuta antes de los test
beforeEach(() => {
  axios.get.mockClear()
})
//
jest.mock('axios');

describe( "fetchData", () => {
  it ("Api resibido" , async () => {
    const data = {}
    axios.get.mockResolvedValueOnce(Promise.resolve(data)); //promesa que trae la data
    await expect(fetchData('algo')).resolves.toEqual(data); // espectativa que espera para comparar
    expect(axios.get).toHaveBeenCalledWith (`${API}/search?query=algo`,) // se compara la data con la del Api
    })
})

it ("Api denegado" , async () => {
  const mensajeError = "error de conexion"; 
  axios.get.mockImplementationOnce(() => 
  Promise.reject(new Error(mensajeError)),); // reject crea el error
  await expect(fetchData()).rejects.toThrow(mensajeError); // espera la data y devuelve el error creado
})
