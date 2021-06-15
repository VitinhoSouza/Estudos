import { useContext, useEffect, useState } from "react"
import {ModalDeleteCategory} from "../ModalDeleteCategory/ModalDeleteCategory"
import {ModalEditCategory} from "../ModalEditCategory/ModalEditCategory"
import { AuthContext, Context } from "../../../App"
import { SearchAndAdd } from "../../commom/SearchAndAdd/SearchAndAdd"
import styles from "./categorybyid.module.scss"
import { Menu } from "../../commom/Menu/Menu"
import history from "../../../history"
import { getCategoriesById } from "../../../api/categoriesAPI"

function TableRow({toggleModalEdit,toggleModalDelete,elementById}){

    return(
        <tr>
            <td>{elementById.categoriaId}</td>
            <td>{elementById.nome}</td>
            <td><button onClick={toggleModalEdit}>Editar</button></td>
            <td><button onClick={toggleModalDelete}>Excluir</button></td>
        </tr>
    )
}

function TableCategories({toggleModalEdit,toggleModalDelete,elementById}){


    return(
        <table>
            <tr>
                <th>ID</th>
                <th>Categoria</th>
                <th></th>
                <th></th>
            </tr>
            <TableRow toggleModalEdit={toggleModalEdit} toggleModalDelete={toggleModalDelete}
                elementById={elementById}></TableRow>
        </table>
    )
}

export function CategoryById(props){

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
        getCategoriesById(auth.token,idParams)
        .then((response)=>{
            setSearchByIdActive(true);
            //console.log(response.data);
            setElementById(response.data);
        })
        .catch((error)=>{
            console.log(error);
            setSearchByIdActive(false);
            history.push("/categories");
        })
    
    },[])


    return(
        <div>

            <Menu></Menu>

            <div className={styles.container}>
                
                {modalEditIsOn && <ModalEditCategory toggleModalEdit={toggleModalEdit}></ModalEditCategory>}

                {modalDeleteIsOn && <ModalDeleteCategory toggleModalDelete={toggleModalDelete}></ModalDeleteCategory>}

                {useEffect}

                <TableCategories toggleModalEdit={toggleModalEdit} toggleModalDelete={toggleModalDelete}
                    elementById={elementById}></TableCategories>

                <SearchAndAdd></SearchAndAdd>

            </div>

        </div>
    )
}