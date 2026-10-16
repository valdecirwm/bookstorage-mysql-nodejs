require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const pool = require('./db/conn')
const exphbs = require('express-handlebars')

// Configura o template engine Handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// Middlewares para parsing de corpo de requisições e arquivos estáticos
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Rota de Cadastro de Livro (POST)
app.post('/livros/cadastrar', (req, res) => {
    const { titulo, descricao, paginas, author } = req.body
    const sql = 'INSERT INTO livros (titulo, descricao, paginas, author) VALUES (?, ?, ?, ?)'
    const values = [titulo, descricao, paginas, author]

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.log(`HOUVE ERRO NO CADASTRO DO LIVRO: ${err}`)
            return res.status(500).send('Erro ao cadastrar o livro.')
        } 
        console.log(`LIVRO CADASTRADO COM SUCESSO! ID: ${results.insertId}`)
        res.redirect('/livros')
    })
})

// Rota de Edição de Livro (POST)
app.post('/livros/editar', (req, res) => {
    const { id, titulo, descricao, paginas, author } = req.body
    const sql = 'UPDATE livros SET titulo = ?, descricao = ?, paginas = ?, author = ? WHERE id = ?'
    const values = [titulo, descricao, paginas, author, id]

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.log(`HOUVE ERRO AO EDITAR ESSE LIVRO: ${err}`)
            return res.status(500).send('Erro ao editar o livro.')
        } 
        console.log(`LIVRO EDITADO COM SUCESSO! ID: ${id}`)
        res.redirect('/livros')
    })
})

// Rota de Deleção de Livro (POST seguro)
app.post('/livros/deletar/:id', (req, res) => {
    const id = req.params.id
    const sql = 'DELETE FROM livros WHERE id = ?'

    pool.query(sql, [id], (err, results) => {
        if (err) {
            console.log(`HOUVE ERRO AO DELETAR ESSE LIVRO: ${err}`)
            return res.status(500).send('Erro ao deletar o livro.')
        } 
        console.log(`LIVRO DELETADO COM SUCESSO! ID: ${id}`)
        res.redirect('/livros')
    })
})

// Listagem de Livros
app.get('/livros', (req, res) => {
    const sql = 'SELECT * FROM livros ORDER BY id DESC'

    pool.query(sql, (err, results) => {
        if (err) {
            console.log(`HOUVE ERRO ${err}`)
            return res.status(500).send('Erro no banco de dados.')
        } 
        res.render('livros', { livros: results })
    })
})

// Busca Segura por Título (LIKE)
app.get('/livros/busca', (req, res) => {
    const titulo = req.query.titulo || ''
    const sql = 'SELECT * FROM livros WHERE titulo LIKE ? ORDER BY id DESC'
    const searchValue = `%${titulo}%`

    pool.query(sql, [searchValue], (err, results) => {
        if (err) {
            console.log(`HOUVE ERRO ${err}`)
            return res.status(500).send('Não foi possível realizar sua busca!')
        } 
        res.render('livros', { livros: results, termoBusca: titulo })
    })
})

// Visualizar um único Livro
app.get('/livro/:id', (req, res) => {
    const id = req.params.id
    const sql = 'SELECT * FROM livros WHERE id = ?'

    pool.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            console.log(`HOUVE ERRO ${err}`)
            return res.status(404).send('Livro não encontrado.')
        } 
        res.render('livro', { livro: results[0] })
    })
})

// Renderizar Formulário de Edição
app.get('/livros/editar/:id', (req, res) => {
    const id = req.params.id
    const sql = 'SELECT * FROM livros WHERE id = ?'
    
    pool.query(sql, [id], (err, results) => {
        if (err || results.length === 0) {
            console.log(`HOUVE ERRO ${err}`)
            return res.status(404).send('Livro não encontrado para edição.')
        } 
        res.render('editarlivro', { livro: results[0] })
    })
})

// Página Inicial / Home
app.get('/', (req, res) => {
    res.render('home')
})

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`🚀 APLICATIVO RODANDO NA PORTA ${PORT}`)
})