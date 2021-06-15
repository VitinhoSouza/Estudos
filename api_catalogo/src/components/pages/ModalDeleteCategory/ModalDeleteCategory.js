import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteCategories, getCategoriesById } from "../../../api/categoriesAPI";
import { AuthContext, Context } from "../../../App";
import history from "../../../history";
import styles from "./modaldeletecategory.module.scss"

export function ModalDeleteCategory({toggleModalDelete}){

    const {idCurrent} = useContext(Context);
    const {auth} = useContext(AuthContext);
    const {handleSubmit} = useForm();
    const [category,setCategory] = useState({});

    function deleteCategory(){
        deleteCategories(auth.token,idCurrent)
        .then((response)=>{
            console.log(response);
            toggleModalDelete(false);
            history.push("/");
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    useEffect(()=>{

        getCategoriesById(auth.token,idCurrent)
        .then((response)=>{
            console.log(response.data);
            setCategory(response.data);
        })
        .catch((error)=>{
            console.log(error);
            history.push("/products");
        })

    },[])

    return(
        <div className={styles.overlay}>
            <div className={styles.modalEditAndDeleteCategory}>
                <h1>Tem certeza que deseja realizar mudanças?</h1>
                <form onSubmit={handleSubmit(deleteCategory)}>
            
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Categoria</th>
                        </tr>
                        
                        <tr>
                            <td className={styles.widthId}>{idCurrent}</td>
                            <td>{category.nome}</td>
                        </tr>

                    </table>

                    <div>
                        <div onClick={toggleModalDelete}>Não, cancelar.</div>
                        <button type="submit"  className={styles.buttonDelete}>Sim, excluir!</button>  
                    </div> 

                </form>
            </div>
        </div>
    )
}

