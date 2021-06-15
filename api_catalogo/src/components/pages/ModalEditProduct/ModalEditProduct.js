import { useContext } from "react";
import { useForm } from "react-hook-form";
import { editProducts } from "../../../api/productsAPI";
import { AuthContext, Context } from "../../../App";
import history from "../../../history";
import styles from "./modaleditproduct.module.scss"

export function ModalEditProduct({toggleModalEdit}){

    const {idCurrent} = useContext(Context);
    const {auth} = useContext(AuthContext);
    const {register,handleSubmit} = useForm();

    function editProduct(data){
        let product = {
            "produtoId":idCurrent,
            "nome": data.name,
            "descricao": data.desc,
            "preco": data.price,
            "imagemUrl": "http://www.macoratti.net/Imagens/alterado.jpg",
            "categoriaId": data.cat
        }
        //console.log(product);
        editProducts(auth.token,idCurrent,product)
        .then((response)=>{
            console.log(response);
            toggleModalEdit(false);
            history.push("/products/"+idCurrent);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    return(
        <div className={styles.overlay}>
            <div className={styles.modalEditAndDeleteProduct}>
                <h1>Tem certeza que deseja realizar mudanças?</h1>
                <form onSubmit={handleSubmit(editProduct)}>
                    <table>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Quantidade</th>
                            <th>Categoria</th>
                        </tr>
                        
                        <tr>
                            <td className={styles.widthId}>{idCurrent}</td>
                            <td><input type="text" id="name" placeholder=" Novo nome"
                                {...register('name', { required: true })}></input></td>
                            <td><input type="text" id="desc" placeholder=" Nova descrição"
                                {...register('desc', { required: true })}></input></td>
                            <td><input type="text" id="price" placeholder=" Novo preço"
                                {...register('price', { required: true })}></input></td>
                            <td><input type="text" id="quant" placeholder=" Nova quantidade"
                                {...register('quant', { required: true })}></input></td>
                            <td><input type="text" id="cat" placeholder=" Nova categoria"
                                {...register('cat', { required: true })}></input></td>
                        </tr>
                    
                    </table>

                    <div className={styles.buttons}>
                        <button type="submit" onClick={toggleModalEdit}>Não, cancelar.</button>
                        <button className={styles.buttonEdit} type="submit">Sim, Editar!</button>  
                    </div> 

                </form>
                
                
            </div>
        </div>
    )
}