import React, { useEffect, useState } from 'react';

interface ButtonProps {
    onClick: () => void;
    name: string;
    style?: string;
    submitColor?: boolean;
}

const Button = ({onClick,name,style,submitColor} : ButtonProps) => {
    const bg = submitColor === true
    
    return (
        <button onClick={onClick} type="button" className={`p-1 h-30 rounded text-body3 ${bg ? 'bg-primary1' : 'bg-gray4'} ${bg ? 'text-white' : 'text-black'} ${style && style}`}>
            {name}
        </button>
    );
};

export default Button;