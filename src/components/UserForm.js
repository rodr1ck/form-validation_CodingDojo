import React, { useRef, useState } from  'react';
import verify from '../hooks/useFormVerification';

const UserForm = (props) => {
    const [formInfo, setFormInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const formRef = useRef(null);
    const [formSuccess, setFormSuccess] = useState(false);

    const showError = (errores) => {
        formRef.current
            .querySelectorAll(`[data-error-de]`)
            .forEach((span) => (span.innerText = ''));
        errores.forEach((err) => {
            const { location, msg } = err;
            const span = formRef.current.querySelector(
                `[data-error-de="${location}"]`,
            );
            span.innerText = msg;
        });
    };

    const getFormData = (target) => {
        const form = target.closest('form');
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) data[key] = value;
        return data;
    };

    const onChange = (e) => {
        e.preventDefault();
        const data = getFormData(e.target);
        setFormInfo(data);
        const { errores } = verify(data);
        showError(errores);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const verified = verify(formInfo, true);
        if (verified.exito === true) {
            console.log('%cExito!', 'font-size: 2rem; color: limegreen;');
            setFormSuccess(true);
            formRef.current.style.display = 'none';
        } else {
            showError(verified.errores);
            console.error(verified.errores);
        }
    };

    const { firstName, lastName, email, password, confirmPassword } = formInfo;
    
    const formMessage = (<h3>{
         formSuccess ? 
         "Thank you for submitting the form!":
         "Welcome, please submit the form."
     }</h3>);

    return(
        <div className="container">
        { formMessage}
        <form onSubmit={ onSubmit } onChange={onChange} ref={formRef}> 
            <div>
                <label htmlFor="firstName">First Name: </label> 
                <input id="firstName" type="text" name="firstName"/>
                <span data-error-de="firstName" className="errorSentence"></span>
            </div>
            <div>
                <label htmlFor="lastName">Last Name: </label> 
                <input id="lastName" type="text" name="lastName"/>
                <span data-error-de="lastName" className="errorSentence"></span>
            </div>
            <div>
                <label htmlFor="email">Email Address: </label> 
                <input id="email" type="email" name="email"/>
                <span data-error-de="email" className="errorSentence"></span>
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input id="password"  type="password" name="password"/>
                <span data-error-de="password" className="errorSentence"></span>
            </div>
            <div>
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input id="confirmPassword" type="password" name="confirmPassword"/>
                <span data-error-de="confirmPassword" className="errorSentence"></span>
            </div>
            <input type="submit" value="Create User" />
        </form>
        <div>
            <h2>{setFormSuccess ? "Results" : "Enviado"}</h2>
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Email: {email}</p>
            <p>Password: {password}</p>
            <p>Confirm Password: {confirmPassword}</p>
        </div>
        </div>
    );
};
    
export default UserForm;