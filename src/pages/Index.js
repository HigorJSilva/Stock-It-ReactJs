import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchBar from 'material-ui-search-bar';

import axios from 'axios';
import io from 'socket.io-client';

import api from '../services/api';
import './index.css';

class Feed extends Component{
    constructor(props) {
        super(props);
        this.state = {
            feed: [],
            open: false,
			acao:false,
			textFieldValue: '',
			postId: null,
			busca:''
        };
      }

    async componentDidMount(){
        this.registerToSocket();

        const response = await api.get('/produtos');
        this.setState({ feed: response.data });
	}

	registerToSocket = () =>{
        const socket = io('http://localhost:3333');

        socket.on('post', newPost =>{
            this.setState({feed: [newPost, ...this.state.feed]});
		});

		socket.on('adicionado', addPost =>{
            this.setState({
                feed: this.state.feed.map( post =>
                    post._id == addPost._id ? addPost : post
            ) 
			});
		});
		
		socket.on('removido', addPost =>{
            this.setState({
                feed: this.state.feed.map( post =>
                    post._id == addPost._id ? addPost : post
            ) 
			});
			
        });
    }

	addProduto = id => {
		this.setState({ open: false, postId:id });
		var bodyFormData = new FormData();
		bodyFormData.set('quantidade', this.state.textFieldValue);
		axios({
			method: 'post',
			url: `http://localhost:3333/atualizaEstoque/${id}/addProduto`,
			data: bodyFormData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
			});
	}

	removeProduto = id => {
		this.setState({ open: false, postId:id });
		var bodyFormData = new FormData();
		bodyFormData.set('quantidade', this.state.textFieldValue);
		axios({
			method: 'post',
			url: `http://localhost:3333/atualizaEstoque/${id}/subProduto`,
			data: bodyFormData,
			config: { headers: {'Content-Type': 'multipart/form-data' }}
			});


	}
	
	handleOnChange = event => {
		this.setState({textFieldValue: event.target.value});
		console.log(event.target.value);
	};

	processaData(data){
		var now = new Date(data);
		var date = now.toLocaleDateString('en-GB');
		var time = now.toLocaleTimeString();
		return time+"  "+date;
	}

     render(){
		let novoFeed = this.state.feed.filter(
			(post) => {
				return post.nome.indexOf(this.state.busca) !== -1;
			}
		);
		const adiciona = this.state.acao;
		let dialogtext;
		let button;

		if (adiciona) {
			dialogtext =   <DialogContentText>
				Insira a quantidade que deseja adicionar
			</DialogContentText>;

			button = <Button variant="outlined" onClick={() => this.addProduto(this.state.postId)} color="primary">
            Adicionar
          </Button>;
		} 
		else {
			dialogtext = <DialogContentText>
				Insira a quantidade que deseja remover
			</DialogContentText>;

			button = <Button variant="outlined" onClick={() => this.removeProduto(this.state.postId)} color="primary">
            Remover
          </Button>;
		}
        return (
            <Container fixed id="post-list">
                <div className="root">
				<SearchBar 
					placeholder="Procurar..."
					onChange={(textoBusca) => this.setState({ busca: textoBusca })}
					onRequestSearch={console.log(this.state.busca)}
					style={{
						margin: '0 auto',
						maxWidth: 800
					}}
				/>
                    <Grid container spacing={3} id ="holder">		

                    {novoFeed.map(post => (
                          <Paper className="paper" key={post._id} square={true}>
                                <Grid item xs={12} sm container id="gridItem"  key={post._id}>
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs >
                                            <Typography gutterBottom variant="body1">
                                            <Box fontWeight="fontWeightBold" fontSize="24">
                                                {post.nome}
                                            </Box>
                                            </Typography>
                                            <Typography variant="subtitle1"  gutterBottom>
                                                Última alteração:
                                            </Typography>
                                            <Typography variant="subtitle1" gutterBottom>
											{this.processaData(post.updatedAt) }
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item className="quantidade">
                                        <Typography variant="subtitle1">{post.quantidade} - {post.unidade}</Typography>
                                    </Grid>
                                    <Grid item className="actions"> 
										<Button size="medium" variant="contained" color="primary"  
											onClick={() =>this.setState({ open: true, acao:true, postId: post._id  })}
                                        className="button"> Adicionar
                                        </Button>
										<Button size="medium" variant="contained" color="secondary" 
											onClick={() =>this.setState({ open: true, acao:false, postId: post._id  })}
											className="button"> Remover
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Dialog open={this.state.open} onClose={() =>this.setState({ open: false })} aria-labelledby="form-dialog-title">
									<DialogTitle id="form-dialog-title">Insira a quantidade</DialogTitle>
									<DialogContent>
											{dialogtext}
									<TextField  onChange={this.handleOnChange}
										autoFocus
										margin="dense"
										id="quantidade"
										label="Quantidade"
										type="number"
										fullWidth
									/>
									</DialogContent>
									<DialogActions>
									<Button  onClick={() =>this.setState({ open: false })} color="secondary">
										Cancelar
									</Button>
										{button}
									</DialogActions>
								</Dialog>
                             </Paper>
                             
                             ))}
                    </Grid>
                  
                </div>
            </Container>
        );
    }
}
export default Feed