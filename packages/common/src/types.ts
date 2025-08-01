const { z } = require("zod");

const CreateUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email({ message: "Must be a valid email address" }),

    password: z.string({
        required_error: "Password is required"
    }).min(6, { 
        message: "Password must be at least 6 characters long" 
    }),

    name: z.string({
        required_error: "Name is required"
    }).min(3, { message: "Name must be at least 3 characters" })
});

const SignInSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string"
    }).email({ message: "Must be a valid email address" }),

    password: z.string({
        required_error: "Password is required"
    }).min(6, { 
        message: "Invalid password" 
    })
});

const CreateRoomSchema = z.object({
    name: z.string().min(3, {
        message: "Room name must contain atleast 3 characters"
    }).max(20, {
        message: "Room name can have atmost 20 characters"
    }),
    shapes:z.array(z.string()).optional()
});

module.exports = {
    CreateUserSchema,
    SignInSchema,
    CreateRoomSchema
}