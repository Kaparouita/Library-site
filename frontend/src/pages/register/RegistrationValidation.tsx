import { User } from '../../components/user/User'; 


export const validateRegistrationForm = (user: User, confirmPassword: string): User => {
    const errors: any = {};

    if (!user.first_name) {
        errors.first_name = 'First name is required';
    }
    if (!user.last_name) {
        errors.last_name = 'Last name is required';
    }
    if (!user.username) {
        errors.username = 'Username is required';
    }
    if (!user.password) {
        errors.password = 'Password is required';
    }
    if (!user.email) {
        errors.email = 'Email is required';
    }

    const passwordValidationMessage = validatePassword(user.password, confirmPassword);
    if (passwordValidationMessage) {
        errors.password = passwordValidationMessage;
    }

    return errors;
};

export const matchingPasswords = (userPassword: string, confirmPassword: string): boolean => {
    return userPassword === confirmPassword;
};

export const validatePassword = (password1: string, password2: string): string => {  
    if (matchingPasswords(password1, password2)) {            
        return "Passwords don't match!";
    }
    
    if ((password1 === "helmepa") || (password1 === "uoc") || (password1 === "tuc")) {
        return "Password should not contain helmepa, uoc, tuc";
    }
    
    if (isWeak(password1) || !strongPsw(password1)) {
        return "Weak password";
    }
    
    return "";
};

export const strongPsw = (psw: string): boolean => {
    let counterCaps = 0, counterSpecial = 0, counterSmall = 0;
    const special = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

    for (let x = 0; x < psw.length; x++) {        
        if (psw[x].match(special))
            counterSpecial++;
        else if (psw[x].toUpperCase() === psw[x])
            counterCaps++;
        else if (psw[x].toLowerCase() === psw[x])
            counterSmall++;
    }

    return (counterCaps >= 1 && counterSmall >= 1 && counterSpecial >= 2);
};

export const isWeak = (psw: string): boolean => {
    let length = psw.length, incorrect_length = 0;
    for (let i = 0; i < length; i++) {
        if (Number.isInteger(psw[i]))
            incorrect_length++;
    }
    
    return incorrect_length / length >= 0.5;
};
