import React from 'react'
import {useField} from 'formik'


function CheckBox({ className, children, ...props}){ 
    const [field] = useField({...props, type:'checkbox'});
    
    return(
        <div className={className}>
            <label>
            <input
                type="checkbox"
                {...field}
                {...props}
            />
                {children}
            </label>
        </div>
    )
}



export default CheckBox