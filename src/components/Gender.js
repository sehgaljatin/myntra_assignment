import React from 'react';
import {Menu,Radio } from 'semantic-ui-react';
const GenderMenu = ({gender, Key, genderSelected, handleChange})=>{
    return(
      <>
        <Menu.Item>
         <Radio
            label={gender}
            name='genderSelected'
            value={gender}
            checked={ genderSelected === gender }
            onChange={ handleChange }
          />
        </Menu.Item>
      </>
      )
  }
export default GenderMenu;