import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { signUpStart } from '../../redux/user/user.actions';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';

class SignUp extends React.Component {
    constructor() {
        super ();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confrimPassword: ''
        };
    }

    handelSubmit = async event => {
        event.preventDefault();

        const { email, displayName, password, confrimPassword } = this.state;
        const { signUpStart } = this.props;

        if (password !== confrimPassword) {
            alert("Password don't match");
            return
        }

        signUpStart({ displayName, email, password });

    };

    handelChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confrimPassword } = this.state;
        return (
            <SignUpContainer>
                <SignUpTitle >I do not have an account</SignUpTitle >
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handelSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handelChange}
                        label='Display Name'
                        required
                    />

                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handelChange}
                        label='Email'
                        required
                    />

                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handelChange}
                        label='Password'
                        required
                    />

                    <FormInput
                        type='password'
                        name='confrimPassword'
                        value={confrimPassword}
                        onChange={this.handelChange}
                        label='Confrim Password'
                        required
                    />

                    <CustomButton type='submit'>SIGN UP</CustomButton>

                </form>

            </SignUpContainer>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials))
});

export default connect(null, mapDispatchToProps)(SignUp);