import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

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
        const { emailSignInStart } = this.props;
        const {email, password} = this.state;
        
        emailSignInStart(email, password);
    }

    handelChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { googleSignInStart } = this.props;

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
    
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);