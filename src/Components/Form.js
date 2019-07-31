import React from "react";
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
  });

  
const valores = [
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
class Form extends React.Component {
  state = {
    nome: "",
    textoNomeErro: "",
    quantidade: "",
    textoQuantidadeErro: "",
    unidade: "",
    textoUnidadeErro: "",
  };

  change = e => {
    // this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  validate = () =>{
    let isError = false;
    const errors = {
    textoNomeErro: "",
    textoQuantidadeErro: "",
    textoUnidadeErro: "",
    };

    if (this.state.nome.length === 0) {
      isError = true;
      errors.textoNomeErro = "Nome do produto é obrigatório";
    }

    if (this.state.unidade.length === 0) {
        isError = true;
        errors.textoUnidadeErro = "Unidade de medida é obrigatória";
    }

    if (this.state.quantidade.length === 0) {
        console.log(this.state.quantidade);
        isError = true;
        errors.textoQuantidadeErro = "Quantidade do produto é obrigatório";
    }


    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  onSubmit = e => {
    e.preventDefault();
    const erro = this.validate();
    
    if(!erro){  
          
        // //limpar formulário
        this.setState({
            nome: "",
            textoNomeErro: "",
            unidade: "",
            textoUnidadeErro: "",
            quantidade: "",
            textoQuantidadeErro: "",
        });
         this.props.onSubmit(this.state);
    }
  };

  render() {  
    const { classes } = this.props;
    return (
        <form className={classes.container} noValidate autoComplete="off" onSubmit="" >
		<div className={classes.header} >
			<Typography variant="h4" component="h2">
				Cadastro
			</Typography>
		</div>
	  <TextField style={{width: "50%"}}
            required
            value={this.state.nome}
            name="nome"    
            label="Nome do produto"
			placeholder="Nome do produto"
            className={classes.textField}
            helperText={this.state.textoNomeErro}
            margin="normal"
            onChange={e => this.change(e)}
            error ={this.state.textoNomeErro.length === 0 ? false : true }
        />

		<TextField style={{width: "40%"}}
            required
            value={this.state.unidade}
            name="unidade"
			id="standard-select-currency"
			select
			label="Unidade de medida"
			placeholder="Unidade de medida"
			className={classes.textField}
            value={this.state.unidade}
			// SelectProps={{
			// 	MenuProps: {
			// 	className:  menu,
			// 	},
			// }}
			helperText="Selecione a unidade de medida"
            margin="normal"
            error ={this.state.textoUnidadeErro.length === 0 ? false : true }
            helperText={this.state.textoUnidadeErro}
            onChange={e => this.change(e)}
        >
          {valores.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      <TextField
            required
            value={this.state.quantidade}
            name="quantidade"
			type="number"
         	id="standard-with-placeholder"
      		label="Quantidade do produto"
			placeholder="Quantidade do produto"
          	className={classes.textField}
            margin="normal"
            onChange={e => this.change(e)}
            error ={this.state.textoQuantidadeErro.length === 0 ? false : true }
            helperText={this.state.textoQuantidadeErro}
        />
      
        
        <Button type="submit" onClick={e => this.onSubmit(e)}  variant="contained" size="medium" 
        color="primary" className={classes.button}>
			Salvar
		</Button>

      </form>

    );
  }
}
export default withStyles(styles)(Form);