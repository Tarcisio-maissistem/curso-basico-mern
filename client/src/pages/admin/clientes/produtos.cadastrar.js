import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import swal from 'sweetalert';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';

import Button from '@material-ui/core/Button';

import api from '../../../services/api';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex', },
  title: { flexGrow: 1, },
  appBarSpacer: theme.mixins.toolbar,
  content: { flexGrow: 1, height: '100vh', overflow: 'auto', },
  container: { paddingTop: theme.spacing(4), paddingBottom: theme.spacing(4), },
  paper: { padding: 35, display: 'flex', overflow: 'auto', flexDirection: 'column', },
  formControl: { width: '100%' },
  btnSucess:{ backgroundColor:"green", color: "#fff", "&:hover":{backgroundColor:"#12b912"}}
}));

export default function ProdutoCadastrar() {
  const classes = useStyles();

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [qtd, setQtd] = useState('');
  const [descricao, setDescricao] = useState('');

  const { idProduto } = useParams();


  useEffect(() => {
    async function getProduto() {
      var response = await api.get('/api/produtos/' + idProduto);

      setNome(response.data.nome_produto);
      setPreco(response.data.preço_produto);
      setQtd(response.data.qtd_produto);
      setDescricao(response.data.descricao_produto);
    }

    getProduto();
  }, [])

  async function handleSubmit() {

    const data = {
      nome_produto: nome,
      preco_produto: preco,
      qtd_produto: qtd,
      descricao_produto: descricao,
      _id: idProduto
    }

    if (nome !== '' && preco !=='' && qtd !== '' && descricao !== '') {
      const response = await api.post('/api/produtos/', data);

      if (response.status === 200) {
        swal("Good job!", "You clicked the button!", "success");
        window.location.href = '/admin/produtos'
      } else {
        alert('Erro ao Cadastrar o Produto!');
      }
    } else {
      alert('Por favor, preencha todos os dados!');
    }

  }

  return (
    <div className={classes.root}>

      <MenuAdmin title={'PRODUTOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper className={classes.paper}>
                <h2>Cadastro de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome do Produto"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="descricao"
                      name="descricao"
                      label="Descricao do Produto"
                      fullWidth
                      autoComplete="descricao"
                      value={descricao}
                      onChange={e => setDescricao(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      type="number"
                      id="preco"
                      name="preco"
                      label="Preco do Produto"
                      fullWidth
                      autoComplete="preco"
                      value={preco}
                      onChange={e => setPreco(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="number"
                      required
                      id="qtd"
                      name="qtd"
                      label="Qtd"
                      fullWidth
                      autoComplete="qtd"
                      value={qtd}
                      onChange={e => setQtd(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button variant="contained" onClick={handleSubmit} className={classes.btnSucess}>
                      Salvar
                  </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}