const express = require('express');
const _ = require('underscore')
const Impresora = require('../models/impresora')

const app = express();

app.get('/impresora', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;
    limite = Number(limite)

    Impresora.find({}, 'marca modelo serie color ip precio')
        .skip(desde)
        .limit(limite)
        .exec((err, impresoras) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Impresora.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    impresoras,
                    numero: conteo
                });
            });

        });
});

app.post('/impresora', (req, res) => {
    let body = req.body //cuerpo de la peticion
    let impresora = new Impresora({ //creando un nuevo objeto
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        contador: body.contador,
        precio: body.precio
            //password: bcrypt.hashSync(body.password, 10), //Para encriptar
    });
    //guardar en la bd
    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //usuarioDB.password = null; // muestra la palabra password
        res.json({
            ok: true,
            usuario: impresoraDB
        });
    });
});

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['serie', 'contador', 'marca']); //solo se pueden cambiar estos parámetros

    Impresora.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            impresora: impresoraDB
        });
    });
});

app.delete('/impresora/:id', (req, res) => {
    let id = req.params.id;

    Impresora.findByIdAndDelete(id, (err, impresoraEliminada) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Algo salió mal, vuelve a intentarlo',
                err
            });
        }
        if (!impresoraEliminada) {
            res.json({
                ok: false, //porq no fue hayado
                err: {
                    message: "Impresora no encontrada"
                }
            });
        } else {
            res.json({
                ok: true,
                impresora: impresoraEliminada,
                message: 'impresora eliminada'
            });
        }
    });
});
module.exports = app