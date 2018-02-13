const restify = require('restify');
const errs = require('restify-errors');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host:'codeshouse.com.br',
        user:'codes475_admin',
        password:'Admin@ti',
        database:'codes475_desenv'
    }
  });

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());



server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/', function (req, res, next) {
    knex('curso_rest').then((dados)=>{
        res.send(dados);
    }, next);

    return next();
});


server.post('/create', function (req, res, next) {
    knex('curso_rest')
    .insert(req.body)
    .then((dados)=>{
        res.send(dados);
    }, next);

    return next();
});


server.get('/show/:id', function (req, res, next) {

    const {id} = req.params;

    knex('curso_rest')
    .where('id', id)
    .first()
    .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
        res.send(dados);
    }, next);

    return next();
});



server.put('/update/:id', function (req, res, next) {

    const {id} = req.params;

    knex('curso_rest')
    .where('id', id)
    .update(req.body)
    .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
        res.send('dados atualizados com sucesso!');
    }, next);

    return next();
});



server.del('/delete/:id', function (req, res, next) {

    const {id} = req.params;

    knex('curso_rest')
    .where('id', id)
    .delete()
    .then((dados)=>{
        if(!dados) return res.send(new errs.BadRequestError('nenhum registro encontrado'));
        res.send('dados excluidos com sucesso!');
    }, next);

    return next();
});
