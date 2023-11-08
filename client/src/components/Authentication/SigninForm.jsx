import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { loginUser } from "../../Store/Auth/Action";

const validationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid email").required("Email is required"),
    password:Yup.string().required("Password is required")
})

const SigninForm=()=>{

    const dispatch=useDispatch();

    const formik=useFormik({
        initialValues:{
            email:"",
            password:''
        },
        validationSchema,
        onSubmit:(values)=> {
            dispatch(loginUser(values));
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                     />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                     />
                </Grid>

                <Grid className="mt-20" item xs={12}>
                    <Button 
                    type="submit" 
                    sx={{borderRadius:"8px", py:"15px"}} 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    >Sign in</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default SigninForm;