import React from 'react'
import {StyledTitle} from './CustomTitle.styles'

interface CustomTitleProps{
    title: string
}

const CustomTitle: React.FC<CustomTitleProps> = ({title}) =>{
    return (
    <StyledTitle>{title}</StyledTitle>
    )
}

export default CustomTitle