import React from 'react';

import {
    GroupContainer,
    FormInputContainer,
    FormInputLabel
  } from './form-input.styles';

const FormInput = ({ handelChange, label, ...otherProps }) => (
    <GroupContainer>
        <FormInputContainer onChange={handelChange} {...otherProps} />

        {
            label ? 
            (<FormInputLabel 
                className={otherProps.value.length ? 'shrink' : ''}
            >
            {label}
          </FormInputLabel>)

            : null
        }
    </GroupContainer>
);

export default FormInput;