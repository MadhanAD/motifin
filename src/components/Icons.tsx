import React from 'react'

export class IconsProps {
    width?: number = 1;
    height?: number = 1;
    color?: string = "#000"
}

export const Icons = (props: IconsProps) => {

    return (
        <svg className="bi bi-x-circle" width={`${props.width}em`} height={`${props.height}em`} viewBox="0 0 16 16"
             fill={`${props.color}`}
             xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 15A7 7 0 108 1a7 7 0 000 14zm0 1A8 8 0 108 0a8 8 0 000 16z"
                  clipRule="evenodd"/>
            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 010 .708l-7 7a.5.5 0 01-.708-.708l7-7a.5.5 0 01.708 0z"
                  clipRule="evenodd"/>
            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 000 .708l7 7a.5.5 0 00.708-.708l-7-7a.5.5 0 00-.708 0z"
                  clipRule="evenodd"/>
        </svg>
    )
}
