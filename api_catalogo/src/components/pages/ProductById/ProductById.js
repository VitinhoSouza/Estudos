import { useContext, useEffect, useState } from "react";
import { getProductsById } from "../../../api/productsAPI";
import { AuthContext, Context } from "../../../App";
import history from "../../../history";
import { Menu } from "../../commom/Menu/Menu";
import { SearchAndAdd } from "../../commom/SearchAndAdd/SearchAndAdd";
import { ModalDeleteProduct } from "../ModalDeleteProduct/ModalDeleteProduct";
import { ModalEditProduct } from "../ModalEditProduct/ModalEditProduct";
import styles from "./productbyid.module.scss"

function TableRow({toggleModalEdit,toggleModalDelete,elementById}){

    return(
        <tr>
            <td>{elementById.produtoId}</td>
            <td>{elementById.nome}</td>
            <td>{elementById.descricao}</td>
            <td>{elementById.preco}</td>
            <td>10</td>
            <td>{elementById.categoriaId}</td>
            <td><button onClick={toggleModalEdit}>Editar</button></td>
            <td><button onClick={toggleModalDelete}>Excluir</button></td>
        </tr>
    )
}

function TableProducts({toggleModalEdit,toggleModalDelete,elementById}){

    return(
        <table>
            <tr>
                <th>ID</th>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Categoria</th>
                <th></th>
                <th></th>
            </tr>

            <TableRow elementById={elementById} toggleModalEdit={toggleModalEdit} 
                    toggleModalDelete={toggleModalDelete}></TableRow>
            
        </table>
    )
}

export function ProductById(props){

    console.log(props.match.params.id);
    let idParams = props.match.params.id;

    const [modalEditIsOn, setModalEditIsOn] = useState(false);
    const [modalDeleteIsOn, setModalDeleteIsOn] = useState(false);
    const {elementById,setSearchByIdActive,setElementById} = useContext(Context);
    const {auth} = useContext(AuthContext);

    function toggleModalEdit(){
        if(modalEditIsOn === true){
            setModalEditIsOn(false);
        }else{
            setModalEditIsOn(true);
        }
    }

    function toggleModalDelete(){
        if(modalDeleteIsOn === true){
            setModalDeleteIsOn(false);
        }else{
            setModalDeleteIsOn(true);
        }
    }

    useEffect(()=>{
        //console.log(id);
        getProductsById(auth.token,idParams)
        .then((response)=>{
            setSearchByIdActive(true);
            //console.log(response.data);
            setElementById(response.data);
        })
        .catch((error)=>{
            console.log(error);
            setSearchByIdActive(false);
            history.push("/products");
        })
    },[])

    return(
        <div>
            <Menu></Menu>

            <div className={styles.container}>
            
                {modalEditIsOn && <ModalEditProduct toggleModalEdit={toggleModalEdit}></ModalEditProduct>}

                {modalDeleteIsOn && <ModalDeleteProduct toggleModalDelete={toggleModalDelete}></ModalDeleteProduct>}

                {useEffect}

                <TableProducts toggleModalEdit={toggleModalEdit} toggleModalDelete={toggleModalDelete} 
                    elementById={elementById}></TableProducts>

                <SearchAndAdd></SearchAndAdd>

            </div>
        </div>
        
    )
}