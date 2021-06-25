import { FormEvent, useState } from 'react'
import {useHistory, useParams} from 'react-router-dom'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import {Button} from '../components/Button'
import {RoomCode} from '../components/RoomCode'
import {Question} from '../components/Question'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

import "../styles/room.scss"
import { useRoom } from '../hooks/useRoom'

type RoomParams = {
    id:string;
}

export function AdminRoom() {
    const params = useParams<RoomParams>();
    const [newQuestion,setNewQuestion] = useState('');
    
    const roomId = params.id;
    const {user} = useAuth();
    const history = useHistory();
    const {questions,title} = useRoom(roomId);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault()

        if(newQuestion.trim() === ''){
            return;
        }

        if(!user){
            throw new Error("You must be logged in.");
        }

        const question = {
            content:newQuestion,
            author:{
                name:user.name,
                avatar:user.avatar,

            },
            isHighlighted:false,
            isAnswered:false,
        }

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion('');

    }

    async function handleEndRoom(){
        if(window.confirm("Tem certeza que deseja encerrar essa sala?")){
            await database.ref(`rooms/${roomId}`).update({
                endedAt: new Date(),
            });

            history.push("/");
        }
    }

    async function handleDeleteQuestion(questionId:string){
        if(window.confirm("Tem certeza que deseja excluir essa pergunta?")){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswered(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered:true,
        });
    }
    
    async function handleHighlightQuestion(questionId:string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted:true,
        });
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                        <RoomCode code={roomId}></RoomCode>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                        placeholder="O que você quer perguntar?"
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}    
                    />

                    <div className="form-footer">
                        {user?(
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ):(
                            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>

                <div className="question-list">
                    {questions.map((question)=> {
                        return(
                            <Question key={question.id} content={question.content} author={question.author}
                                isAnswered={question.isAnswered} isHighlighted={question.isHighlighted}>
                                {!question.isAnswered && (
                                    <>
                                        <button type="button" onClick={()=> handleCheckQuestionAsAnswered(question.id)}>
                                            <img src={checkImg} alt="Marcar pergunta como respondida"/>
                                        </button>
                                        <button type="button" onClick={()=> handleHighlightQuestion(question.id)}>
                                            <img src={answerImg} alt="Dar destaque à pergunta"/>
                                        </button>
                                    </>
                                )}
                                <button type="button" onClick={()=> handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover pergunta"/>
                                </button>
                            </Question>
                        )
                    })}
                </div>

                
            </main>
        </div>
    )
}