'use client'
import React from 'react';
import {Position} from "@/app/types";
import {CardActionArea} from "@mui/material";
import { useRouter } from 'next/navigation';
import Icon from "@/app/components/Icon";

type Props = {
    position: Position
}

const PositionPreview = ({ position }: Props) => {
    const router = useRouter()
    return (
        <CardActionArea className="flex justify-start" onClick={() => router.push(`/${position.id}`)}>
            <Icon position={position} />
            <p>{position.sanskritName}</p>
        </CardActionArea>
    );
};

export default PositionPreview;