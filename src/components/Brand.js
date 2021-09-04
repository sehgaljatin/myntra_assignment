import React from 'react';
import {Menu , Checkbox } from 'semantic-ui-react';

const BrandMenu = ({brand, Key, brandSelected, handleChange})=>{
    return(
      <>
        <Menu.Item>
             <Checkbox 
             label={brand} 
             name='brandSelected'
             value={brand} 
             onChange={ handleChange }/>
        </Menu.Item>
      </>
      )
  }
export default BrandMenu;