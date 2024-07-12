'use client'
import React from 'react';
import {Position} from "@/app/types";
import {Skeleton} from "@mui/material";

type Props = {
    position?: Position;
    size?: 'sm' | 'md';
}

const Icon = ({ position, size = 'md' }: Props) => {
    const sizes = {
        sm: 18,
        md: 24
    }
    return position ? (
        <img src={position?.icon} alt={`${position.sanskritName}'s icon`} width={sizes[size]} height={sizes[size]}/>
    ) : (
        <Skeleton variant="circular" width={sizes[size]} height={sizes[size]}/>
    );
};

export default Icon;