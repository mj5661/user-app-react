import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Button, MenuItem, Select, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AddUser, UpdateUser } from '../../redux/slices/userSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const AddNewUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { state } = useLocation();
    const roles = useSelector((state) => state.role.roles);
    const [user, setUser] = useState({ 
        name: '', 
        username: '', 
        mobile: '', 
        email: '', 
        password: '', 
        roleKey: 'admin' 
    });

    useEffect(() => {
        if (state && state.user) {
            setUser({ ...state.user, password: '' });
        }
    }, [state]);

    const onCreateUser = (values) => {
        dispatch(AddUser(values));
        navigate('/');
    };

    const onUpdateUser = (values) => {
        dispatch(UpdateUser(values));
        navigate('/');
    };
    
    return (
        <div>
            <Typography sx={{ fontSize: 24, textAlign: 'center', width: '100%', marginTop: "50px" }}>{user?.id ? 'Update User' : 'Add New User'}</Typography>
            <div style={{padding: 100}}>
                <Formik
                    enableReinitialize
                    initialValues={user}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Required";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                          errors.email = "Invalid email address";
                        }
                        if (!values.mobile) {
                          errors.mobile = "Required";
                        } else if (
                          !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/i.test(
                            values.mobile
                          )
                        ) {
                          errors.mobile = "Invalid phone number";
                        }
                        return errors;
                    }}
                    onSubmit={(values) => {
                        if (values && user?.id) {
                            onUpdateUser({id: user?.id, ...values});
                        } else {
                            onCreateUser({id: Math.random(), ...values});
                        }
                    }}
                    >
                    {({ isSubmitting }) => (
                        <Form>
                        <Field 
                            component={TextField}
                            name="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Field 
                            component={TextField}
                            name="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Field 
                            component={TextField}
                            name="mobile"
                            label="Mobile"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Field 
                            component={TextField}
                            name="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Field 
                            component={TextField}
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        />
                        <Typography sx={{marginTop: '10px', marginBottom: '15px'}}>Role Key</Typography>
                        <Field
                            name="roleKey"
                            as={Select}
                            label="Role Key"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.key} value={role.key}>
                                    {role.label}
                                </MenuItem>
                            ))}
                        </Field>
                        <Button sx={{ marginTop: 5}} type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                            Submit
                        </Button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddNewUser;
