import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

const SignUp = ({ signUpStart }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confrimPassword: ''
    });
    const { email, displayName, password, confrimPassword } = userCredentials;

    const handelSubmit = async event => {
        event.preventDefault();

        if (password !== confrimPassword) {
            alert("Password don't match");
            return
        }

        signUpStart({ displayName, email, password });

    };

    const handelChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <SignUpContainer>
            <SignUpTitle >I do not have an account</SignUpTitle >
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handelSubmit}>
                <FormInput
                    type='text'
                    name='displayName'
                    value={displayName}
                    onChange={handelChange}
                    label='Display Name'
                    required
                />

                <FormInput
                    type='email'
                    name='email'
                    value={email}
                    onChange={handelChange}
                    label='Email'
                    required
                />

                <FormInput
                    type='password'
                    name='password'
                    value={password}
                    onChange={handelChange}
                    label='Password'
                    required
                />

                <FormInput
                    type='password'
                    name='confrimPassword'
                    value={confrimPassword}
                    onChange={handelChange}
                    label='Confrim Password'
                    required
                />

                <CustomButton type='submit'>SIGN UP</CustomButton>

            </form>

        </SignUpContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);