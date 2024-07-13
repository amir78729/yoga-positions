import React from 'react';
import {Rating, Skeleton, Box, styled, Typography} from "@mui/material";
import {Star, StarOutline} from "@mui/icons-material";
import {Position} from "@/app/types";
import COLORS from "@/app/constants/colors";
import {useIsMobile} from "@/app/hooks";

type Props = {
    isLoading: boolean;
    position?: Position;
}

const PositionInfo = ({isLoading, position}: Props) => {
const isMobile = useIsMobile()
    const renderInfoSkeleton = () => (
        <div>
            <Skeleton width="60px"/>
            <Skeleton width="80px"/>
        </div>
    )

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: COLORS.SECONDARY,
        }
    });

    return (
        <Box display={"flex"} gap={3} width={isMobile ? '100%' : '200px'} justifyContent="space-between" flexDirection={isMobile ? 'row' : 'column'}>
            {isLoading ? (
                <>
                    {renderInfoSkeleton()}
                    {renderInfoSkeleton()}
                    {renderInfoSkeleton()}
                </>
            ) : (
                <>
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
                                    icon={<Star fontSize="inherit"/>}
                                    emptyIcon={<StarOutline fontSize="inherit"/>}
                                    readOnly value={position?.difficulty}/>
                            </div>
                        </div>
                    </>)}
                </>
            )}
        </Box>
    );
};

export default PositionInfo;