import React, { BaseSyntheticEvent } from 'react';

/*export type Props = {
  name: any;
}*/

class FormUpdate extends React.Component<{}>  {

    state = {pid: "", file: undefined};
  
    handleSubmit = (event: any) => {
      alert('A procedure ID was submitted: ' + this.state.pid);
      event.preventDefault();
    }

    changePID = (event: React.FormEvent<HTMLInputElement>) => {
      this.setState({name:event.currentTarget.value});
    }

    changeFile = (event: BaseSyntheticEvent) => {
      //this.setState({file: event.currentTarget.files[0]})

      console.log(event);
    }

    render() {

    return (
        <div>
    <h2>Test Form</h2>
      <form id="FormUpdate" onSubmit={this.handleSubmit}>
        <label>
          Procedure ID:
          <input type="text" value={this.state.pid} onChange={this.changePID} />
        </label>
        <label>
          File:
          <input type="file" value={this.state.file} onChange={this.changeFile} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
    }
  }

// console.log("Form update rendered");

export default  FormUpdate;