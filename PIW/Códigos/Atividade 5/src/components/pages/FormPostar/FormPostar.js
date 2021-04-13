import './FormPostar.css'
import history from '../../../history'

export function FormPostar(){
    
    function click() {
        history.push("./")
    }

    return(
        <div className= "form-postar">
            <input className="texto-mensagem" type="textarea" name="texto-post" placeholder="Escreva o texto do seu post."/>
            <input className="submit-postar" type="submit" name="submit-post" placeholder="Postar" onClick={click}/>
        </div>
    )
}