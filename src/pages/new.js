import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api from '../services/api';

const useStyles = makeStyles(theme => ({
  container: {
  display: 'flex',
	flexWrap: 'wrap',
	width: '35%',
	margin: '0 auto',
	marginTop:'50px',
	backgroundColor: '#fff',
	padding: '20px',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  hide: {
    width: '20%',
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
	marginTop: '20px',
	width: '100%',
  },
  header:{
	  display: 'flex',
	  width: '100%',
	  justifyContent: 'center',
  },
}));

const currencies = [
  {
    value: 'Un',
    label: 'Unidade',
  },
  {
    value: 'Kg',
    label: 'Quilos',
  },
  {
    value: 'Pct',
    label: 'Pacotes',
  },
  {
    value: 'Cx',
    label: 'Caixas',
  },
];

export default function TextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    nome: '',
    quantidade: '',
    unidade: '',
    nome_error_text: ''
  });

  const handleChange = name => event => {
	setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = e => {
  // e.preventDefault();

	// const newPost = new FormData();
  //   newPost.append('nome', values.nome);
  //   newPost.append('quantidade', values.quantidade);
  //   newPost.append('unidade',values.unidade);
  //   api.post('/store', newPost);
}

// function teste() {
//     console.log("teste");
// }

const ei = e => {
	e.preventDefault();
}

  return (
    <> 
      
      <form className={classes.container} noValidate autoComplete="off" onSubmit={ei} >
		<div className={classes.header} >
			<Typography variant="h4" component="h2">
				Cadastro
			</Typography>
		</div>
	  <TextField style={{width: "50%"}}
      required
      name="nome"
			id="standard-with-placeholder"
      label="Nome do produto"
			placeholder="Nome do produto"
			className={classes.textField}
			onChange={handleChange('nome')}
			margin="normal"
        />

		<TextField style={{width: "40%"}}
			required
			id="standard-select-currency"
			select
			label="Unidade de medida"
			placeholder="Unidade de medida"
			className={classes.textField}
			value={values.unidade}
			onChange={handleChange('unidade')}
			SelectProps={{
				MenuProps: {
				className: classes.menu,
				},
			}}
			helperText="Selecione a unidade de medida"
			margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      <TextField
			required
			  type="number"
         	id="standard-with-placeholder"
      		label="Quantidade do produto"
			placeholder="Quantidade do produto"
			onChange={handleChange('quantidade')}
          	className={classes.textField}
         	margin="normal"
        />
        {/* <TextField
          id="standard-with-placeholder"
          label="With placeholder"
          placeholder="Placeholder"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-with-placeholder"
          label="With placeholder"
          placeholder="Placeholder"
          className={classes.textField}
          margin="normal"
        /> */}
      
        
		<Button type="submit" onClick={() => handleSubmit(this)}  variant="contained" size="medium" color="primary" className={classes.button}>
			Salvar
		</Button>

      </form>
      </>
  );
}