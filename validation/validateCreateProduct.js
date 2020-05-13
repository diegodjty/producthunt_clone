export default function validateCreateProduct(values){
    let errors = {};

    // validate name of user
    if(!values.name){
        errors.name = "Name is required"
    }
    
    // validate compnay
    if(!values.company){
        errors.company = "Name of the company is required"
    }

    // validate url
    if(!values.url){
        errors.url = "url is required";
    } else if(!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)){
        errors.url = "Invalid url";
    }

    // validate description
    if(!values.description){
        errors.description = "description is required"
    }

   

    return errors
}