import { Button, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { registerUser } from "../../Store/Auth/Action";
import { days, months, years } from "../Util/Date";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
})

const SignupForm = () => {

    const dispatch=useDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: "",
            password: '',
            birthDate:{
                day:1,
                month:"January",
                year: new Date().getFullYear(),
            }
        },
        validationSchema,
        onSubmit: (values) => {
            const {day,month,year}=values.birthDate;
            const birthDate=`${year}-${month}-${day}`;

            values.birthDate=birthDate;

            dispatch(registerUser(values));
        }
    });

    const handleDateChange=(name)=>(event)=>{
        formik.setFieldValue("birthDate",{
            ...formik.values.birthDate,
            [name]:event.target.value
        })
    }

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                        helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                </Grid>

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

                <Grid xs={4} item>
                    <InputLabel>Day</InputLabel>
                    <Select
                    name="day"
                    value={formik.values.birthDate.day}
                    fullWidth
                    onChange={handleDateChange('day')}
                    onBlur={formik.handleBlur}
                    >
                        {days.map((day)=> (
                            <MenuItem key={day} value={day}>{day}</MenuItem>
                        ))}
                    </Select>

                </Grid>

                <Grid xs={4} item>
                    <InputLabel>Month</InputLabel>
                    <Select
                    name="month"
                    fullWidth
                    value={formik.values.birthDate.month}
                    onChange={handleDateChange('month')}
                    onBlur={formik.handleBlur}
                    >
                        {months.map((month)=> (
                            <MenuItem key={month.value} value={month.label}>{month.label}</MenuItem>
                        ))}
                    </Select>

                </Grid>

                <Grid xs={4} item>
                    <InputLabel>Year</InputLabel>
                    <Select
                    name="year"
                    fullWidth
                    value={formik.values.birthDate.year}
                    onChange={handleDateChange('year')}
                    onBlur={formik.handleBlur}
                    >
                        {years.map((year)=> (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>

                </Grid>

                <Grid className="mt-20" item xs={12}>
                    <Button
                        type="submit"
                        sx={{ borderRadius: "8px", py: "15px" }}
                        variant="contained"
                        fullWidth
                        size="large"
                    >SignUp</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default SignupForm;