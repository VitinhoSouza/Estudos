import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getCategoriesById, postCategories } from '../../../api/categoriesAPI';
import { getProductsById, postProducts } from '../../../api/productsAPI';
import { AuthContext, Context } from '../../../App';
import history from '../../../history';
import styles from './searchandadd.module.scss'

function ModalRegisterCategory({toggleModal}){

    const {register, handleSubmit} = useForm();
    const {auth} = useContext(AuthContext);

    function registerCategory(data){
        let category = {
            "nome": data.text,
            "imagemUrl": "http://www.teste-front.net/imagem.jpg",
        }
        postCategories(auth.token,category)
        .then((response)=>{
            toggleModal();
            history.push("/");
        })
        .catch((error)=>{
            console.log(error);
            toggleModal();
        })

    }

    return(
        <div className={styles.overlay}>
            <div className={styles.modalCategory}>
                <h1>Cadastro de uma nova categoria</h1>
                <form onSubmit={handleSubmit(registerCategory)}>
                    <div>
                        <label>Nome da Categoria: </label>
                        <input type="text" id="text" placeholder=" Digite um nome para a categoria" 
                            {...register('text', { required: true })}/>
                    </div>
                    <div>
                        <div onClick={toggleModal}>Cancelar</div>
                        <button type="submit">Cadastrar</button>  
                    </div> 
                </form>
            </div>
        </div>
    )
}

function ModalRegisterProduct({toggleModal}){

    const {register, handleSubmit} = useForm();
    const {auth} = useContext(AuthContext);

    function registerProduct(data){
        //console.log(data);
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        let product = {
            "nome": data.name,
            "descricao": data.desc,
            "preco": data.price,
            "imagemUrl": "http://www.macoratti.net/Imagens/alterado.jpg",
            "estoque": data.quant,
            "dataCadastro": today.toDateString(),
            "categoriaId": data.cat
        }
        postProducts(auth.token,product)
        .then((response)=>{
            toggleModal();
            history.push("/");
        })
        .catch((error)=>{
            console.log(error);
            toggleModal();
        })
    }


    return(
        <div className={styles.overlay}>
            <div className={styles.modalProduct}>
                <h1>Cadastro de um novo produto</h1>
                <form onSubmit={handleSubmit(registerProduct)}>
                    <div>
                        <label>Nome do Produto: </label>
                        <input type="text" id="name" placeholder=" Digite um nome do produto"
                            {...register('name', { required: true })}/>
                    </div>

                    <div>
                        <label>Descrição do Produto: </label>
                        <input type="text" id="desc" placeholder=" Digite uma descrição para o produto"
                            {...register('desc', { required: true })}/>
                    </div>

                    <div>
                        <label>Preço do Produto: </label>
                        <input type="text" id="price" placeholder=" Digite o preço do produto"
                            {...register('price', { required: true })}/>
                    </div>
                    <div>
                        <label>Qtd em estoque: </label>
                        <input type="text" id="quant" placeholder=" Digite a quantidade em estoque"
                            {...register('quant', { required: true })}/>
                    </div>
                    <div>
                        <label>Categoria do Produto: </label>
                        <input type="text" id="cat" placeholder=" Digite a categoria do produto"
                            {...register('cat', { required: true })}/>
                    </div>
                        

                    <div className={styles.buttons}>
                        <div onClick={toggleModal}>Cancelar</div>
                        <button type="submit">Cadastrar</button>  
                    </div> 
                </form>
            </div>
        </div>
    )
}

export function SearchAndAdd(){
    
    const {navActive} = useContext(Context);
    const [modalIsOn, setModalIsOn] = useState(false);
    const {register, handleSubmit} = useForm();

    function toggleModal(){
        if(modalIsOn === true){
            setModalIsOn(false);
        }else{
            setModalIsOn(true);
        }
    }

    /* Tentativa de requisitar um produto por id na rota e por campo de texto [Não conseguido ainda]
    function searchByIdInput(id){
        getProductsById(auth.token,id.text)
        .then((response)=>{
            setSearchByIdActive(true);
            //console.log(response.data);
            setElementById(response.data);
            setIdFormIsOn(true);
            history.push("/products/"+id.text);
        })
        .catch((error)=>{
            console.log(error);
            setSearchByIdActive(false);
            history.push("/products");
        })}*/
    
    function submit(id){
        console.log(id.text);
    }

    return(
        <div className={styles.containerFooterUp}>

            {modalIsOn && (
                navActive === "products" ? (<ModalRegisterProduct modalIsOn={modalIsOn} toggleModal={toggleModal}></ModalRegisterProduct>)
                : (<ModalRegisterCategory  modalIsOn={modalIsOn} toggleModal={toggleModal}></ModalRegisterCategory>)
            )}

            <div className={styles.containerFooter}>
                <footer className={styles.footer}>
                    <h3>Pesquise por ID: </h3>
                    <form className={styles.form} onSubmit={handleSubmit(submit)}>
                    
                        <input type="text" id="text" placeholder=" Digite um id" {...register('text', { required: true })}/>
                        <button type="submit" >Pesquisar</button>
                        
                    </form>
                    <button onClick={toggleModal}>Inserir</button>
                </footer>
            </div>

        </div>
    )
}