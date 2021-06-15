import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { deleteProducts, getProductsById } from "../../../api/productsAPI";
import { AuthContext, Context } from "../../../App";
import history from "../../../history";
import styles from "./modaldeleteproduct.module.scss"

export function ModalDeleteProduct({toggleModalDelete}){

    const {idCurrent} = useContext(Context);
    const {auth} = useContext(AuthContext);
    const {handleSubmit} = useForm();
    const [product,setProduct] = useState({});

    function deleteProduct(){
        deleteProducts(auth.token,idCurrent)
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

        getProductsById(auth.token,idCurrent)
        .then((response)=>{
            //console.log(response.data);
            setProduct(response.data);
        })
        .catch((error)=>{
            console.log(error);
            history.push("/products");
        })

    },[])

    

    return(
        
        <div className={styles.overlay}>
            <div className={styles.modalEditAndDeleteProduct}>

                <h1>Tem certeza que deseja realizar mudanças?</h1>
                <form onSubmit={handleSubmit(deleteProduct)}>

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
                            <td>{product.nome}</td>
                            <td>{product.descricao}</td>
                            <td>{product.preco}</td>
                            <td>10</td>
                            <td>{product.categoriaId}</td>
                        </tr>

                    </table>
                    <div>
                        <div onClick={toggleModalDelete}>Não, cancelar.</div>
                        <button type="submit" className={styles.buttonDelete}>Sim, excluir!</button>  
                    </div> 
                </form>
            </div>
        </div>
    )
}