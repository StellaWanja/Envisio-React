
import React from 'react';


  
class Password extends React.Component {
    constructor(props) {
    super();
    this.state = {
      input: {},
      errors: {}
    };
        
    this.handleChange = this.handleChange.bind(this);
                       this.handleSubmit = this.handleSubmit.bind(this)
  }

   handleChange = (e) =>  {
    let input = this.state.input;
    input[e.target.name] = e.target.value;
  
    this.setState({
      input
    });
  }
     
  handleSubmit= (e) =>  {
    e.preventDefault();
  
    if(this.validate()){
        console.log(this.state);
  
        let input = {};
        input["username"] = "";
        input["email"] = "";
        input["password"] = "";
        input["confirm_password"] = "";
        this.setState({input:input});
  
        alert('Details are submitted');
    }
  }

  
  
   validate = (e) => {
      let input = this.state.input;
      let errors = {};
      let isValid = true;
   
      if (!input["username"]) {
        isValid = false;
        errors["username"] = "Please enter your username.";
      }
  
      if (typeof input["username"] !== "undefined") {
        const re = /^\S*$/;
        if(input["username"].length < 6 || !re.test(input["username"])){
            isValid = false;
            errors["username"] = "Please enter valid username.";
        }
      }
  
      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
      }
  
      if (typeof input["email"] !== "undefined") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
  
      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
      }
  
      if (typeof input["password"] !== "undefined") {
        if(input["password"].length < 6){
            isValid = false;
            errors["password"] = "Please add at least 6 charachter.";
        }
      }
  
      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["password"] !== input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
        }
      }
  
      this.setState({
        errors: errors
      });
     
      return isValid;
      
  }

render(){
return (
        <div className="card col-12 col-lg-4 password-card mt-2 hv-center">
        <span className="h3">Reset Password</span>
      <p>OOoops forgot password?</p> 
       <p>Input the registered details with new password and then confirm new password!</p> 
      <label for="username">Hospital name:</label>
      <input type="username" 
                       className="form-control" 
                       id="username" 
                       placeholder="username" 
                       value={this.state.input.username}
                       onClick={this.handleChange}
                />
                <br/>
      <div/>
      <label for="email">Email address:</label>
      <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="enter email" 
                       value={this.state.input.email}
                       onClick={this.handleChange}
                />
                <br/>
      <div/>
      <label for="email">Password:</label>
      <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="password"
                        value={this.state.input.password}
                        onClick={this.handleChange} 
                    />
      <div/>

        <div/>
      <label for="email">Confirm password:</label>
      <input type="confirm_password" 
                        className="form-control" 
                        id="confirm_password" 
                        placeholder="confirm_password"
                        value={this.state.input.confirm_password}
                        onClick={this.handleChange} 
                    />
      <div/>

       <div className="card col-12 col-lg-4 password-card mt-2 hv-center">
          <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}> Confirm</button>
          
      </div>
    </div>
   )
;
}
}
export default Password;
