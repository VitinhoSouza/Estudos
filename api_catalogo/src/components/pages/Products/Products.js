import { useContext, useEffect, useState } from 'react';
import { getProducts } from '../../../api/productsAPI';
import { AuthContext, Context } from '../../../App';
import { SearchAndAdd } from '../../commom/SearchAndAdd/SearchAndAdd'
import { ModalDeleteProduct } from '../ModalDeleteProduct/ModalDeleteProduct';
import { ModalEditProduct } from '../ModalEditProduct/ModalEditProduct';
import styles from './products.module.scss'

function TableRow({toggleModalEdit,toggleModalDelete,product,setIdCurrent}){

    return(
    
        <tr>
            <td>{product.produtoId}</td>
            <td>{product.nome}</td>
            <td>{product.descricao}</td>
            <td>{product.preco}</td>
            <td>10</td>
            <td>{product.categoriaId}</td>
            <td><button onClick={()=>{toggleModalEdit();setIdCurrent(product.produtoId)}}>Editar</button></td>
            <td><button onClick={()=>{toggleModalDelete();setIdCurrent(product.produtoId)}}>Excluir</button></td>
        </tr>
    )
}

function TableProducts({toggleModalEdit,toggleModalDelete,products,setIdCurrent}){

    let tableRows = products.map((product)=>(
        //console.log(product)
        <TableRow product={product} toggleModalEdit={toggleModalEdit} 
            toggleModalDelete={toggleModalDelete} setIdCurrent={setIdCurrent}></TableRow>
    ))

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
            {tableRows}
        </table>
    )
}

export function Products(){

    const [modalEditIsOn, setModalEditIsOn] = useState(false);
    const [modalDeleteIsOn, setModalDeleteIsOn] = useState(false);
    const [products,setProducts] = useState([]);
    const {auth} = useContext(AuthContext);
    const {setIdCurrent} = useContext(Context);

    useEffect(()=>{
        getProducts(auth.token)
        .then((response)=>{
            console.log(response.data);
            setProducts(response.data);
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

            {modalEditIsOn && <ModalEditProduct toggleModalEdit={toggleModalEdit}></ModalEditProduct>}

            {modalDeleteIsOn && <ModalDeleteProduct toggleModalDelete={toggleModalDelete}></ModalDeleteProduct>}

            <TableProducts toggleModalEdit={toggleModalEdit} toggleModalDelete={toggleModalDelete} 
                products={products} setIdCurrent={setIdCurrent}></TableProducts>

            <SearchAndAdd></SearchAndAdd>
        </div>
    )
}