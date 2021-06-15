import { useContext } from "react";
import { useForm } from "react-hook-form";
import { editCategories } from "../../../api/categoriesAPI";
import { Context,AuthContext } from "../../../App";
import history from "../../../history";
import styles from "./modaleditcategory.module.scss";

export function ModalEditCategory({toggleModalEdit}){

    const {idCurrent} = useContext(Context);
    const {auth} = useContext(AuthContext);
    const {register,handleSubmit} = useForm();

    function editCategory(data){
        let category = {
            "categoriaID":idCurrent,
            "nome": data.name,
            "imagemUrl": "http://www.teste-front.net/imagem.jpg",
        }
        //console.log(category);
        editCategories(auth.token,idCurrent,category)
        .then((response)=>{
            console.log(response);
            toggleModalEdit(false);
            history.push("/categories/"+idCurrent);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className={styles.overlay}>
            <div className={styles.modalEditAndDeleteCategory}>
                <h1>Tem certeza que deseja realizar mudanças?</h1>
                <form onSubmit={handleSubmit(editCategory)}>
                    <table>
                        <tr>
                            <th className={styles.widthId}>ID</th>
                            <th>Categoria</th>
                        </tr>
                        <tr>
                            <td className={styles.widthId}>{idCurrent}</td>
                            <td><input type="text" id="name" placeholder="Digite o novo nome"
                                {...register('name', { required: true })}></input></td>
                        </tr>
                    </table>
                    <div>
                        <div onClick={toggleModalEdit}>Não, cancelar.</div>
                        <button type="submit" className={styles.buttonEdit}>Sim, editar!</button>  
                    </div> 

                </form>
    
            </div>
        </div>
    )
}