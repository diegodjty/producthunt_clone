export default function validateCreateaccount(values){
    let errors = {};

    // validate name of user
    if(!values.name){
        errors.name = "Name is required"
    }
    
    // validate email of user
    if(!values.email){
        errors.name = "Email is required"
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email ="Email not valid"
    }

    // validate password of user
    if(!values.password){
        errors.password ="Password is required";
    }else if(values.password.length < 6){
        errors.password ="Password needs to be at least 6 characters"
    }

    return errors
}