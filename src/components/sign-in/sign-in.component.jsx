import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

import {
    SignInContainer,
    SignInTitle,
    ButtonsBarContainer
  } from './sign-in.styles';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: ''
        }
    }

    handelSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state;

        try {

            await auth.signInWithEmailAndPassword(email, password);

            this.setState({email: '', password: ''})

        } catch (error) {
            console.error(error);
        }
    }

    handelChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (

            <SignInContainer>
                <SignInTitle>I alredy have an account</SignInTitle>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handelSubmit}>
                    <FormInput 
                        name='email' 
                        type='email' 
                        label='email' 
                        value={this.state.email} 
                        handelChange={this.handelChange}
                        required 
                    />

                    <FormInput 
                        name='password' 
                        type='password' 
                        label='password' 
                        value={this.state.password} 
                        handelChange={this.handelChange}
                        required 
                        />

                    <ButtonsBarContainer>
                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton
                            type='button'
                            onClick={signInWithGoogle}
                            isGoogleSignIn
                        >
                            Sign in with Google 
                        </CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SignInContainer>

        );
    }
    
}

export default SignIn;