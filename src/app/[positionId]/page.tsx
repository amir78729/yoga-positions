'use client'
import {useQuery} from "react-query";
import {Position} from "@/app/types";
import {getYouTubeEmbedSourceFromUrl} from "@/app/utils";
import {Rating, Skeleton, Stack, styled, Typography} from "@mui/material";
import Icon from "@/app/components/Icon";
import React from "react";
import FavoriteButton from "@/app/components/FavoriteButton";
import {Star, StarOutline} from "@mui/icons-material";
import COLORS from "@/app/constants/colors";

export default function Page({params}: { params: { positionId: string } }) {

    const {data: position} = useQuery<Position>(['position', params?.positionId], () => fetch(`/api?id=${params.positionId}`).then(res => res.json()));

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: COLORS.SECONDARY,
        }
    });

    return (
        <Stack gap={3} py={3} px={12}>
            <Typography color="#000" component="h1" variant="h6" className="flex items-center gap-5">
                <Icon position={position}/>
                {position ? <span>{position?.sanskritName}</span> : <Skeleton width="100px" />}
                <FavoriteButton position={position} />
            </Typography>
            <div className="flex gap-10 justify-between items-center">

                <Stack gap={3}>
                    {position?.englishName && (<>
                        <div>
                            <Typography color="secondary" variant="caption">English Name</Typography>
                            <Typography>{position.englishName}</Typography>
                        </div>
                    </>)}
                    {position?.persianName && (<>
                        <div>
                            <Typography color="secondary" variant="caption">Persian Name</Typography>
                            <Typography>{position.persianName}</Typography>
                        </div>
                    </>)}
                    {(<>
                        <div>
                            <Typography color="secondary" variant="caption">Difficulty</Typography>
                            <div>
                                <StyledRating
                                    color="primary"
                                    icon={<Star fontSize="inherit" />}
                                    emptyIcon={<StarOutline fontSize="inherit" />}
                                    readOnly value={3} />
                            </div>
                        </div>
                    </>)}
                </Stack>
                {position?.video && (
                    <iframe id="ytplayer" width="640" height="360"
                            src={getYouTubeEmbedSourceFromUrl(position.video)}
                            frameBorder="0"/>
                )}
            </div>
        </Stack>
    )
}