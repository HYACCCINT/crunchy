import React, { BaseSyntheticEvent } from 'react';
import { useMutation, useQuery } from 'urql';
import { updateFormQuery, formQuery } from '../query';
// import { useForm } from 'react-hook-form';

/*export type Props = {
  name: any;
}*/

let updateForm = (variables: any) : Promise<any> => new Promise(() => {});
//State = {pid: "", file: undefined};

export const FormUpdate = () =>  {
    //const [, updateForm] = useMutation(updateFormQuery)

    let state = {pid: "", file: undefined};
    //couch db
    const handleSubmit = (event: any) => {
      alert('A procedure ID was submitted: ' + state.pid);
      updateForm(event);
      event.preventDefault();
    }

    changePID = (event: React.FormEvent<HTMLInputElement>) => {
      this.setState({name:event.currentTarget.value});
    }

    changeFile = (event: BaseSyntheticEvent) => {
      this.setState({file: event.currentTarget.files[0]});
      
        // If you have any question as to why a mutation works or 
        // doesn't work, please try it out with http://localhost:5000/graphql
        // note: this requires a running backend (npm run server)
        {
          id: 'test1',
          input: {
            // it is important that we include the id again
            id: 'test1',
            procedureID: "test2",
            file: file
          }
        }
      console.log(this.state.file);
    }

    render() {

    return (
        <div>
    <h2>Test Form</h2>
      <form id="FormUpdate" onSubmit={this.handleSubmit}>
        <label>
          Procedure ID:
          <input type="text" value={this.state.pid} onChange={h} />
        </label>
        <label>
          File:
          <input type="file" value={this.state.file} onChange={handleSubmit} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
    }
  }

// console.log("Form update rendered");

export default  FormUpdate;

    /*

    const Example = () => {
      const { handleSubmit, register, errors } = useForm();
      const onSubmit = (values: any) => console.log(values);
    
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="email"
            ref={register({
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })}
          />
          {errors.email && errors.email.message}
    
          <input
            name="username"
            ref={register({
              validate: value => value !== "admin" || "Nice try!"
            })}
          />
          {errors.username && errors.username.message}
    
          <button type="submit">Submit</button>
        </form>
      );
    };
  };*/