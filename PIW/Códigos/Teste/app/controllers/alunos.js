let alunos = [
    {id:1, nome:"Victor", sobrenome:"Souza"},
    {id:2, nome:"José", sobrenome:"Alencar"},
    {id:3, nome:"Victor", sobrenome:"Lima"}
]

module.exports.listarAlunos = function(req, res){
    let alunos_retorno = alunos;
    if(req.query.nome){
        let nome = req.query.nome;
        alunos_retorno = alunos_retorno.filter(function(aluno){return aluno.nome == nome})    
    }
    res.json(alunos_retorno);
}

module.exports.obterAluno = function(req, res){
    let id = req.params.id;
    let aluno = alunos.find(function(aluno){return aluno.id==id;});
    if(aluno){
        res.json(aluno)
    }else{
        res.status(404).json({mensagem:"aluno não encontrado!"})
    }
}

module.exports.inserirAluno = function(req, res){
    alunos.push(req.body);
    res.status(201).json(req.body);
} 

module.exports.apagarAluno = function(req, res){
    let id = req.params.id;
    alunos = alunos.filter(function(aluno){return aluno.id!=id});
    res.json({mensagem:"Aluno removido!"});
} 