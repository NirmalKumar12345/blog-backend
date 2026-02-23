export const PostValidationSchema = {
    title: {
        notEmpty: {
            errorMessage: "Title must not be empty"
        }
        ,
        isString: {
            errorMessage: "Title must be String"
        }
    },
    content: {
        notEmpty: {
            errorMessage: "Content must not be empty"
        }
        ,
        isString: {
            errorMessage: "Content must be String"
        }
    },
    tags: {
        optional: true,
        isArray: {
            errorMessage: "Tags must be an array"
        },
    },
    "authorDetails.name": {
        notEmpty: {
            errorMessage: "Author name is required"
        },
        isString: {
            errorMessage: "Author name must be String"
        }
    },
}