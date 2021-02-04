const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    nome_cliente:String,
    resp_razao:String,
    cpf_cnpj:String,
    telefone:String,
    email:String,
    rg_ie:String,
    cep:String,
    logradouro:String,
    numero:String,
    complemento:String,
    bairro:String,
    cidade:String,
    uf:String
    //qtd_cliente:{type:Number,default:0}
},{
    timestamps:true
});

const clientes = mongoose.model('Clientes',DataSchema);
module.exports = clientes;