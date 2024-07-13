'use client'
import {getYouTubeEmbedSourceFromUrl} from "@/app/utils";
import {Skeleton, Stack, Typography} from "@mui/material";
import Icon from "@/app/components/Icon";
import React from "react";
import FavoriteButton from "@/app/components/FavoriteButton";
import {useIsMobile, useSingleYogaPosition} from "@/app/hooks";
import PositionInfo from "@/app/components/PositionInfo";
import Sidebar from "@/app/components/Sidebar";

export default function Page({params}: { params: { positionId: string } }) {

    const {data: position, isLoading} = useSingleYogaPosition(params?.positionId);


const isMobile = useIsMobile()


    return (
        <Stack gap={3} py={3} px={isMobile ? 3: 12} width="100%">
            <Typography color="#000" component="h1" variant="h6" className="flex items-center gap-5">
                <Sidebar />
                <Icon position={position}/>
                {position ? <span>{position?.sanskritName}</span> : <Skeleton width="100px"/>}
                <FavoriteButton position={position}/>
            </Typography>
            <div className={`flex gap-10 justify-between items-center ${isMobile ? 'flex-col-reverse' : 'flex-row'}`}>
                <PositionInfo position={position} isLoading={isLoading} />
                {isLoading ? (
                    <Skeleton width="calc(100% - 300px)" height="360px"/>
                ) : (
                    <>
                        {position?.video && (
                            <>
                                {isMobile ? (
                                    <iframe id="ytplayer"
                                            width="100%"
                                            height="250"
                                            src={getYouTubeEmbedSourceFromUrl(position.video)}
                                            frameBorder="0"/>
                                ) : (
                                    <iframe id="ytplayer" width="640" height="360"
                                            src={getYouTubeEmbedSourceFromUrl(position.video)}
                                            frameBorder="0"/>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </Stack>
    )
}