///7 configurar puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno 

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//base de datos

let urlDB;
/*
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {*/
urlDB = 'mongodb+srv://KarlaAdmin:kvmr210897@cluster0.toul9.mongodb.net/Cluster0'
    //}
process.env.URLDB = urlDB;