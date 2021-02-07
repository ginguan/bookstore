import React,{ useState } from 'react';
import Store from '../redux/Store'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './BookInfo.css';


 function BookInfo(props){

    const { item } = props;
    const [id,setId] = useState(item.id);
    const [open, setOpen] = useState(false);
    const [name,setName] = useState(item.name);
    const [price,setPrice] = useState(item.price);
    const [category,setCategory] = useState(item.category);
    const [description,setDescription] = useState(item.description);

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const getEditItemAction= (item)=>({
        type:'Edit',
        item
    });
    const getDelItemAction= (itemId)=>({
        type:'Delete',
        itemId
    });


    const clear = ()=>{
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setOpen(false)
    }
    const onDelete = function(itemId){
        const action = getDelItemAction(itemId);
        Store.dispatch(action);
    }
    var newBook = {
        id,
        name,
        price,
        category,
        description,
        finished:false
    }
    const onSubmit = ()=>{
        
        if(newBook.name.trim() == '' || newBook.price == '' || newBook.description == '' || newBook.category == ''){
            alert('Form can not be blank');
            return;
          }
          if(!(/^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/.test(newBook.price))){
            alert('Invalid price format, please input a number!');
            return;
          }
        const action = getEditItemAction(newBook);
        Store.dispatch(action);
        setOpen(false);
    }

    

    return (
        <tr>
            <td onClick={handleClickOpen}>{item.name}</td>
            <td onClick={handleClickOpen}>{item.price}</td>
            <td onClick={handleClickOpen}>{item.category}</td>
            <td onClick={handleClickOpen}>{item.description}</td>
            <td>
                
                
                <button
                    className="btn btn-danger text-black delBtn"
                    onClick={()=> onDelete(item.id)}
                    >
                    Remove
                </button>  
                
                
                <Dialog open={open} onClose={handleClose} className="dialog" aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" className="dialogTitle">Book Info</DialogTitle>
                    <DialogContent className="dialog-content"
                    >
                    Book Name
                    <TextField
                        InputProps={{style: { color: '#e9f4f5' },}}
                        className="dialog-input"
                        margin="dense"
                        id="name"
                        type="text"
                        defaultValue={item.name}
                        fullWidth
                        onChange={(e) => {setName(e.target.value)}}
                    />
                    Price
                    <TextField
                        InputProps={{style: { color: '#e9f4f5' },}}
                        className="dialog-input"
                        margin="dense"
                        id="price"
                        type="text"
                        defaultValue={item.price}
                        fullWidth
                        onChange={(e) => {setPrice(e.target.value)}}
                    />
                    Category
                    <TextField
                        InputProps={{style: { color: '#e9f4f5' },}}
                        className="dialog-input"
                        margin="dense"
                        id="category"
                        type="text"
                        defaultValue={item.category}
                        fullWidth
                        onChange={(e) => {setCategory(e.target.value)}}
                    />
                    Description
                    <TextField
                        InputProps={{style: { color: '#e9f4f5' },}}
                        className="dialog-input"
                        margin="dense"
                        id="description"
                        type="text"
                        defaultValue={item.description}
                        fullWidth
                        onChange={(e) => {setDescription(e.target.value)}}
                        multiline
                    />
                    
                    </DialogContent>
                    <DialogActions className="dialog-action">
                    <Button onClick={clear} variant="contained" color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={onSubmit} variant="contained" color="primary">
                        Save
                    </Button>
                    </DialogActions>
                </Dialog>
            </td>
            
        </tr>
    )

};

export default BookInfo;
