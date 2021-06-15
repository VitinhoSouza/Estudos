import { useContext, useEffect, useState } from 'react'
import { getCategories } from '../../../api/categoriesAPI';
import { AuthContext, Context } from '../../../App'
import { SearchAndAdd } from '../../commom/SearchAndAdd/SearchAndAdd'
import { ModalDeleteCategory } from '../ModalDeleteCategory/ModalDeleteCategory';
import { ModalEditCategory } from '../ModalEditCategory/ModalEditCategory';
import styles from './categories.module.scss'

function TableRow({toggleModalEdit,toggleModalDelete,category,setIdCurrent}){

    return(
        <tr>
            <td>{category.categoriaId}</td>
            <td>{category.nome}</td>
            <td><button onClick={() => { toggleModalEdit(); setIdCurrent(category.categoriaId);}}>Editar</button></td>
            <td><button onClick={() => { toggleModalDelete(); setIdCurrent(category.categoriaId);}}>Excluir</button></td>
        </tr>
    )
}

function TableCategories({toggleModalEdit,toggleModalDelete,categories,setIdCurrent}){

    let tableRows = categories.map((category)=>(
        //console.log(category);
        <TableRow category={category} toggleModalEdit={toggleModalEdit} 
            toggleModalDelete={toggleModalDelete} setIdCurrent={setIdCurrent}></TableRow>
    ))

    return(
        <table>
            <tr>
                <th>ID</th>
                <th>Categoria</th>
                <th></th>
                <th></th>
            </tr>
            {tableRows}
        </table>
    )
}

export function Categories(){

    const [modalEditIsOn, setModalEditIsOn] = useState(false);
    const [modalDeleteIsOn, setModalDeleteIsOn] = useState(false);
    const [categories,setCategories] = useState([]);
    const {auth} = useContext(AuthContext);
    const {setIdCurrent} = useContext(Context);


    useEffect(()=>{
        getCategories(auth.token)
        .then((response)=>{
            console.log(response.data);
            setCategories(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
    },[])

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

    return(
        <div className={styles.container}>

            {modalEditIsOn && <ModalEditCategory toggleModalEdit={toggleModalEdit}></ModalEditCategory>}

            {modalDeleteIsOn && <ModalDeleteCategory toggleModalDelete={toggleModalDelete}></ModalDeleteCategory>}

            <TableCategories toggleModalEdit={toggleModalEdit} toggleModalDelete={toggleModalDelete}
                categories={categories} setIdCurrent={setIdCurrent}></TableCategories >

            <SearchAndAdd></SearchAndAdd>
        </div>
    )
}