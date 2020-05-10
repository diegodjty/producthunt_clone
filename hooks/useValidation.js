import React,{useState, useEffect} from 'react';



const useValidation = (initialState,validate, fn) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({})
    const [submitForm, setSubmitForm] = useState(false);


    useEffect( () => {
        if(submitForm){
            const noError = Object.keys(errors).length === 0;
            if(noError){
                fn(); // function that executes in the component
            }
            setSubmitForm(false)
        }
    
    },[errors])

    // function that execute when user writes somethign
    const handelChange = (e) =>{
        setValues({
            ...values,
            [e.target.name] : e.target.value
        })
    }
    // when user submits
    const handelSubmit = e =>{
        e.preventDefault()
        const validationError = validate(values)
        setErrors(validationError)
        setSubmitForm(true)

     }

     const handleBlur = () =>{
        const validationError = validate(values)
        setErrors(validationError)
     }

    return {
        values,
        errors,
        submitForm,
        handelChange,
        handelSubmit,
        handleBlur
    };
}
 
export default useValidation;