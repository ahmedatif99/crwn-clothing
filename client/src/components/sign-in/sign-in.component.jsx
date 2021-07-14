import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './sign-in.styles';


const SignIn = ({ emailSignInStart, googleSignInStart }) => {
    const [userCredentials, setCredentials] = useState({ email: '', password: '' });
    const {email, password} = userCredentials;

    const handelSubmit = async event => {
        event.preventDefault();
        
        emailSignInStart(email, password);
    }

    const handelChange = e => {
        const { value, name } = e.target;
        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <SignInContainer>
            <SignInTitle>I alredy have an account</SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={handelSubmit}>
                <FormInput 
                    name='email' 
                    type='email' 
                    label='email' 
                    value={email} 
                    handelChange={handelChange}
                    required 
                />
                <FormInput 
                    name='password' 
                    type='password' 
                    label='password' 
                    value={password} 
                    handelChange={handelChange}
                    required 
                    />
                <ButtonsBarContainer>
                    <CustomButton type='submit'> Sign in </CustomButton>
                    <CustomButton
                        type='button'
                        onClick={googleSignInStart}
                        isGoogleSignIn
                    >
                        Sign in with Google 
                    </CustomButton>
                </ButtonsBarContainer>
            </form>
        </SignInContainer>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);