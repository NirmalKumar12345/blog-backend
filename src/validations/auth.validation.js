export const LoginValidationSchema ={
    email:{
        notEmpty:{
            errorMessage: "Email Id msut not be empty"
        },
        isEmail: {
            errorMessage: "Invalid Email"
        },
        isString: {
            errorMessage: "Email Id must be String"
        }
    },
    password:{
        notEmpty: {
            errorMessage: "Password must not be empty"
        },
        isString: {
            errorMessage: "Password must be String"
        }
    }
}

export const SignUpValidationSchema = {
     email: {
        notEmpty: {
            errorMessage: "Email id must not be empty"
        },
        isEmail: {
            errorMessage: "Invalid email id"
        },
        isString: {
            errorMessage: "Email id must be string"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password must not be empty"
        },
        isString: {
            errorMessage: "Password must be string"
        }
    },
    confirmPassword: {
        notEmpty: {
            errorMessage: "Confirm Password must not be empty"
        },
        isString: {
            errorMessage: "Confirm Password must be string"
        },
        custom: {
            options: (value,{req})=>{
                if(value!== req.body.password){
                    throw new Error("Password and confirmPassword does not match")
                }
                return true;
            }
        }
    }
}