export const login_validation = (values) => {
    const errors = {}
    if (!values.email) {
        errors.email = "Email is required"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
    }
    if (!values.password) {
        errors.password = "Password is required"
    }
    else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Password must be between 8 to 20 characters long"
    }
    else if (values.password.includes(' ')) {
        errors.password = "Invalid password"
    }
    return errors;
}

export const register_validation = (values) => {
    const errors = {}

    // Name validation
    if (!values.name) {
        errors.name = "Required"
    }

    // Email validation
    if (!values.email) {
        errors.email = "Required"
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
    }

    // Phone validation
    if (!values.phone) {
        errors.phone = "Required"
    }
    else if (values.phone.length !== 10 || !(Number.isInteger(Number(values.phone)))) {
        errors.phone = "Invalid phone number"
    }

    // Password validation
    if (!values.password) {
        errors.password = "Required"
    }
    else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Password must be between 8 to 20 characters long"
    }
    else if (values.password.includes(' ')) {
        errors.password = "Invalid password"
    }

    // Confirm password validation
    if (!values.cpassword) {
        errors.cpassword = "Required"
    }
    else if (values.cpassword !== values.password) {
        errors.cpassword = "Password does not match"
    }

    return errors;



}