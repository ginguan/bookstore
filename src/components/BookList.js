import React, {Component} from 'react';
import Table from 'react-bootstrap/Table'
import './BookList.css';
import BookInfo from "./BookInfo";
import Store from '../redux/Store';
import NewBook from './NewBook';


export default class BookList extends Component {
    constructor(props){
        super(props);
        this.state = Store.getState();
    }

    componentDidMount() {
        Store.subscribe(this.onChangeStore);
    }

    onChangeStore = ()=>{
       this.setState(Store.getState());
    };


    render() {
        const {items} = this.state;

        return (
            <div className="background">
            <h1 >BookStore</h1>
            <div className="container">
                
                
                <div className="dataTable">
                <Table striped bordered hover size = "sm" >
                    <thead key={-1} className="thead-dark" >
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope='col'></th>
                        </tr>
                    </thead>
                    <tbody >
                        {items.map((item, index)=>(
                            <BookInfo item={item} key={index} />
                        ))}
                    </tbody>
                </Table>
                </div>               
                <NewBook/>
            </div>
            </div>
        )
    }
}