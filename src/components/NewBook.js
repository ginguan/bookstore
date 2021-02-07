import React, { useState , useEffect } from 'react';
import Store from '../redux/Store';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import './BookInfo.css';

function NewBook(){
    const [open, setOpen] = useState(false);
    const {totalCount,visible}  =  Store.getState();
    const [id,setId] = useState(0);
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");

    
    const clear = ()=>{
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setOpen(false)
    }
    
    const item = {
      id,
      name,
      price,
      category,
      description,
      finished:false
  }
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const getAddItemAction= (item)=>({
        type:'Add',
        item
    });
    const submitAction = ()=>{
      const action = getAddItemAction(item);
      Store.dispatch(action);
      setOpen(false)
    }

    const onSubmit = ()=>{
      
      if(item.name.trim().length ===0 || item.price == '' || item.description.trim() == '' || item.category.trim() == ''){
        alert('Blank input detected');
        return;
      }
      if(!(/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(item.price))){
        alert('Invalid price, please enter a number');
        return;
      }
      setId(totalCount);
    }

    useEffect(() => {
      (id !== 0 ) && submitAction()
      setId(0)
    },[id])

    return (
        <div style={{margin:'0 auto', width:'7rem', marginBottom:'1rem'}}>
          <Button 
          style={{left:"300%"}}
          variant="outlined" variant="contained" color="primary" onClick={handleClickOpen}>
            Add Book
          </Button>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle 
            className="dialogTitle"
            id="form-dialog-title">New Book</DialogTitle>
            <DialogContent
             className="dialog-content">
              <TextField
              InputLabelProps={{style: { color: '#cee5e7' },}}
              InputProps={{style: { color: '#e9f4f5' },}}
                className="dialog-input"
                autoFocus
                margin="dense"
                id="name"
                label="Book Name"
                type="text"
                fullWidth
                onChange={(e) => {setName(e.target.value)}}
              />
               <TextField
               InputLabelProps={{style: { color: '#cee5e7' },}}
               InputProps={{style: { color: '#e9f4f5' },}}
                className="dialog-input"
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                onChange={(e) => {setPrice(e.target.value)}}
              />
               <TextField
               InputLabelProps={{style: { color: '#cee5e7' },}}
               InputProps={{style: { color: '#e9f4f5' },}}
               className="dialog-input"
                margin="dense"
                id="category"
                label="Category"
                type="text"
                fullWidth
                onChange={(e) => {setCategory(e.target.value)}}
              />
               <TextField
               InputLabelProps={{style: { color: '#cee5e7' },}}
               InputProps={{style: { color: '#e9f4f5' },}}
               className="dialog-input"
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                multiline
                onChange={(e) => {setDescription(e.target.value)}}
              />
            </DialogContent>
            <DialogActions className="dialog-action">
              <Button onClick={clear} variant="contained" color="secondary">
                Cancel
              </Button>
              <Button onClick={onSubmit} variant="contained" color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );

    }

export default NewBook;
