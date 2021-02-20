import React, {Fragment, useState, useEffect} from "react";
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import {Button, Modal, ModalBody, ModalHeader} from 'react-bootstrap'; 
import { FormGroup } from "@material-ui/core";

const Clients = () => {
  const { user } = useAuth0();
  const { name, picture, email } = user;

  const [usuarios, setUsuarios] = useState([])
  useEffect(() => {
    axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then( res => {
            setUsuarios(res.data)
        })
        .catch( err => {
            console.log(err)
        })
  }, []);

  
  const[show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    phone: '' 
  })

  const handleShow = register => {
    setShow(true)
    setForm({...register})
  };

  return (
    <Fragment>
      <div>
        <div className="row align-items-center profile-header">
          <div className="col-md-2 mb-3">
            <img
              src={picture}
              alt="Clients"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </div>
          <div className="col-md text-center text-md-left">
            <h2>{name}</h2>
            <p className="lead text-muted">{email}</p>
          </div>
        </div>
        <div className="row">
          <pre className="col-12 text-light bg-dark p-4">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>
      <h1 className="text-center mt-4 mb-0">Table</h1>
      <div className="row align-items-center pt-5">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone number</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map( usuario => (
          <tr key={usuario.id}>
            <th scope="row">{usuario.id}</th>
            <td>{usuario.name}</td>
            <td>{usuario.email}</td>
            <td>{usuario.phone}</td>
            <td>
              <IconButton onClick={() => handleShow(usuario)}>
                <VisibilityIcon></VisibilityIcon>
              </IconButton>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar registro con ID: {form.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>    
          <FormGroup>
            <label>Name:</label>
            <input 
              readOnly
              className="form-control" 
              name="name" 
              type="text"
              value={form.name}
            />
          </FormGroup>
          <FormGroup>
            <label>Username: </label>
            <input 
              readOnly
              className="form-control" 
              name="phone" 
              type="text"
              value={form.username} 
            />
          </FormGroup>
          <FormGroup>
            <label>Email:</label>
            <input
              readOnly 
              className="form-control" 
              name="email" 
              type="text"
              value={form.email} 
            />
          </FormGroup>
          <FormGroup>
            <label>Phone: </label>
            <input 
              readOnly
              className="form-control" 
              name="phone" 
              type="text"
              value={form.phone} 
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default Clients;
