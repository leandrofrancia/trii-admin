import React, { useState, Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useForm } from 'react-hook-form';



const NewClient = () => {
  const [message, setMessage] = useState("");
  const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:6060";

  const { getAccessTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/messages/public-message`);

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log('token', token);
      const response = await fetch(
        `${serverUrl}/api/messages/protected-message`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseData = await response.json();

      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };



  const handleChange = async () => {

  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  // };

  var generator = require('generate-password')

  var password = generator.generate({
    minLength: 8,
    numbers: true,
    symbols: true,
    uppercase: false
  })

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, event) => {
    console.log(data);
    
    event.target.reset();
  }

  console.log(password)

  return (
    <Fragment>
      <div className="row justify-content-center align-items-center flex-column">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlfor="dominio">Dominio:</label>
            <br/>
            <input 
              className="mb-3 form-control" 
              placeholder="dominio"
              name="dominio"
              ref = {register({
                required: {
                  value: true,
                  message: 'Nombre obligatorio'
                },
                maxLength: {
                  value: 12,
                  message: 'Maximo 12 caracteres'
                },
                minLength: {
                  value: 4,
                  message: 'Minimo 4 caracteres!'
                }
              })}
            />
          </div>
          <span className="text-danger text-small d-block mb-2">
              {errors?.dominio?.message}
          </span>
          <div>
            <label htmlfor="email">Email:</label>
            <br/>
            <input 
              className="mb-3 form-control"
              placeholder="Email"
              name="email"
              type="email"
              ref = {register({
                required: {
                  value: true,
                  message: 'Email obligatoria'
                },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })}
            />
          </div>
          <span className="text-danger text-small d-block mb-2">
            {errors?.email?.message}
          </span>


          <div>
            <label htmlfor="contraseña">Contraseña:</label>
            <br/>
            <input 
              className="mb-3 form-control"
              placeholder="contraseña"
              name="password"
              type="password"
              value={password}
              ref = {register({
                required: {
                  value: true,
                  message: 'Contraseña obligatoria  '
                },
                maxLength: {
                  value: 12,
                  message: 'Maximo 12 caracteres'
                },
                minLength: {
                  value: 4,
                  message: 'Minimo 4 caracteres!'
                }
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors?.password?.message}
            </span>
          </div>

          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </Fragment>
  )
};

export default NewClient;


















  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <label>
  //         Dominio:
  //           <div>
  //           <input type="text" onChange={handleChange} />
  //         </div>
  //       </label>

  //     </div>

  //     <div>
  //       <label>
  //         email:
  //           <div>
  //           <input type="text" onChange={handleChange} />
  //         </div>
  //       </label>
  //     </div>
  //     <div>
  //       <label>
  //         password:
  //           <div>
  //           <input type="text" onChange={handleChange} />
  //         </div>
  //       </label>

  //     </div>

  //     <input type="submit" value="Submit" />
  //   </form>
  // );
// -------------------------------------------------------

  //   return (
  //     <div className="container">
  //       <h1>External API</h1>
  //       <p>
  //         Use these buttons to call an external API. The protected API call has an
  //         access token in its authorization header. The API server will validate
  //         the access token using the Auth0 Audience value.
  //       </p>
  //       <div
  //         className="btn-group mt-5"
  //         role="group"
  //         aria-label="External API Requests Examples"
  //       >
  //         <button type="button" className="btn btn-primary" onClick={callApi}>
  //           Get Public Message
  //         </button>
  //         <button
  //           type="button"
  //           className="btn btn-primary"
  //           onClick={callSecureApi}
  //         >
  //           Get Protected Message
  //         </button>
  //       </div>
  //       {message && (
  //         <div className="mt-5">
  //           <h6 className="muted">Result</h6>
  //           <div className="container-fluid">
  //             <div className="row">
  //               <code className="col-12 text-light bg-dark p-4">{message}</code>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );