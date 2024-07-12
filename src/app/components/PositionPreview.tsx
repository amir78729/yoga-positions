'use client'
import React from 'react';
import {Position} from "@/app/types";
import {ListItemButton, ListItemIcon, Typography} from "@mui/material";
import {useRouter} from 'next/navigation';
import Icon from "@/app/components/Icon";

type Props = {
    position: Position
}

const PositionSidebarPreview = ({position}: Props) => {
    const router = useRouter()
    return (
            <ListItemButton sx={{ height: '40px'}} onClick={() => router.push(`/${position.id}`)}>
                <ListItemIcon sx={{ color: 'var(--primary)' }}>
                    <Icon size="sm" position={position}/>
                </ListItemIcon>
                <Typography variant="subtitle2">{position.sanskritName}</Typography>
            </ListItemButton>
    );
};

export default PositionSidebarPreview;