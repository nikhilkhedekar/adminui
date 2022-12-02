import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/Header";
import { useDispatch } from "react-redux";
import { createStore } from "../actions/storeActions";

const CreateStore = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();

    const handleFormSubmit = (values) => {
        console.log(values);
        dispatch(createStore(values));
    };    

    return (
        <Box m="20px" width="1080px" >
            <Header title="CREATE STORE" subtitle="Create a New Store" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Store Code"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.storeCode}
                                name="storeCode"
                                error={!!touched.storeCode && !!errors.storeCode}
                                helperText={touched.storeCode && errors.storeCode}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Address"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.address}
                                name="address"
                                error={!!touched.address && !!errors.address}
                                helperText={touched.address && errors.address}
                                sx={{ gridColumn: "span 2" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Store
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>            
        </Box>
    );
};

const checkoutSchema = yup.object().shape({
    storeCode: yup.string().required("required").max(3),
    address: yup.string().required("required")
});

const initialValues = {
    storeCode: "",
    address: ""
};

export default CreateStore;
