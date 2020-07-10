///configurar puerto
process.env.PORT = process.env.PORT || 3000;

//Entorno 
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//base de datos
let urlDB;
urlDB = 'mongodb+srv://KarlaAdmin:kvmr210897@cluster0.toul9.mongodb.net/Cluster0'
process.env.URLDB = urlDB;