import { NavegadorSuperior } from '../../commom/NavegadorSuperior/NavegadorSuperior';
import {FormPostar} from '../FormPostar/FormPostar'
import './PaginaPostar.css'

export function PaginaPostar(){
    return(
        <div className= "pagina-postar">
            <NavegadorSuperior></NavegadorSuperior>
            <FormPostar></FormPostar>
        </div>
    )
}