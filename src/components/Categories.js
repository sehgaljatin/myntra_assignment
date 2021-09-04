import React from 'react';
import {Menu , Checkbox } from 'semantic-ui-react';
const CategoryMenu = ({category, Key, categorySelected, handleChange})=>{

    return(
      <>
        <Menu.Item>
             <Checkbox 
             label={category} 
             name='categorySelected'
             value={category} 
             onChange={ handleChange }/>
        </Menu.Item>
      </>
      )
  } 
export default CategoryMenu;