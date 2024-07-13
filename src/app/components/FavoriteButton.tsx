import React, {useEffect, useState} from 'react';
import {addYogaPositionToFavorites, isYogaPositionFavorite, removeYogaPositionFromFavorites} from "@/app/utils";
import {Position} from "@/app/types";
import {IconButton} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";


type Props = {
    position?: Position;
}

const FavoriteButton = ({position}: Props) => {
    const [isFav, setIsFav] = useState<boolean | null>(null)

    const update = () => {
        if (position) setIsFav(isYogaPositionFavorite(position));
    }

    const handleAddToFavorite = () => {
        if (position) {
            addYogaPositionToFavorites(position);
            update();
        }
    }

    const handleRemoveFromFavorite = () => {
        if (position) {
            removeYogaPositionFromFavorites(position);
            update();
        }
    }


    useEffect(() => {
        if (position) update();
    }, [position])

    if (isFav === null) return (
        <IconButton disabled>
            <FavoriteBorder/>
        </IconButton>
    )
    return (
        <IconButton color="primary" onClick={isFav ? handleRemoveFromFavorite : handleAddToFavorite}>
            {isFav ? <Favorite/> : <FavoriteBorder/>}
        </IconButton>
    );
};

export default FavoriteButton;