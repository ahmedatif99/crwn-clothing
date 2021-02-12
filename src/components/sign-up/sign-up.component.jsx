import React from 'react';
import './sign-up.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

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

        const { displayName, email, password, confrimPassword } = this.state;

        if (password !== confrimPassword) {
            alert("Password don't match");
            return
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocument(user, { displayName });

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confrimPassword: ''
            });

        } catch (error) {
            console.error(error);
        }

    };

    handelChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { displayName, email, password, confrimPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
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

            </div>
        );
    }
}

export default SignUp;