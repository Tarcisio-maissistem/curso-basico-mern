import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import api from '../../../services/api';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

}));


export default function ClientesListagem() {
  const classes = useStyles();

  const [clientes, setclientes] = useState([]);

  useEffect(() => {

    async function loadclientes() {
      const response = await api.get("/api/clientes");
      setclientes(response.data)
    }
    loadclientes();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir este cliente?")) {
      var result = await api.delete('/api/clientes/' + id);
      if (result.status === 200) {
        window.location.href = '/admin/clientes';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  return (
    <div className={classes.root}>

      <MenuAdmin title={'CLIENTES'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{ marginBotton: 10 }} variant="contained" color="primary" href={'/admin/clientes/cadastrar/'}>Cadastrar</Button>
              <Paper className={classes.paper}>
                <h2>Listagem de Clientes</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell><b>Nome</b></TableCell>
                            <TableCell align="center" ><b>CPF/CNPJ</b></TableCell>
                            <TableCell align="center"><b>Telefone</b></TableCell>
                            <TableCell align="center"><b>Data Cadastro</b></TableCell>
                            <TableCell align="center"><b>Opções</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {clientes.map((row) => (
                            <TableRow key={row._id}>
                              <TableCell component="th" scope="row">
                                {row.nome_fantasia}
                              </TableCell>
                              <TableCell align="center">{row.cpf_cnpj}</TableCell>
                              <TableCell align="center">{row.telefone}</TableCell>
                              <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                              <TableCell align="center">
                                <ButtonGroup aria-label="outlined primary button group">
                                  <Button variant="contained" color="primary" href={'/admin/clientes/editar/' + row._id}>Editar</Button>
                                  <Button variant="contained" color="secondary" onClick={() => handleDelete(row._id)}>Excluir</Button>
                                </ButtonGroup>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
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