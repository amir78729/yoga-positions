import React, {useState} from 'react';
import {
    Checkbox,
    Drawer, IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListSubheader,
    Skeleton,
    TextField,
    Typography
} from "@mui/material";
import {Favorite, FavoriteBorder, Home, Menu} from "@mui/icons-material";
import PositionSidebarPreview from "@/app/components/PositionPreview";
import {useQuery} from "react-query";
import {Position} from "@/app/types";
import {useRouter} from "next/navigation";
import Icon from "@/app/components/Icon";
import {useIsMobile, useYogaPositions} from "@/app/hooks";
import {getFavoriteYogaPositionIds} from "@/app/utils";

const Sidebar = () => {

    const {data: positions, isLoading} = useYogaPositions();
    const router = useRouter();
    const isMobile = useIsMobile()

    const [open, setOpen] = useState<boolean>()

    const renderSkeletons = () => (
        <>
            {[...Array(30)].map((i) => (
                <ListItemButton key={i} sx={{height: '40px'}}>
                    <ListItemIcon>
                        <Icon size="sm"/>
                    </ListItemIcon>
                    <Typography variant="subtitle2"><Skeleton width='100px'/></Typography>
                </ListItemButton>
            ))}
        </>
    )
    const [searchString, setSearchString] = useState<string>('')
    const [showFav, setShowFav] = useState<boolean>(false)

    const getFilteredData = () =>
        positions?.filter((position) => getFavoriteYogaPositionIds()?.includes(position.id) || !showFav)?.filter?.(position => [position.englishName, position.sanskritName, position.persianName].reduce((a, b) => (a || b?.toLowerCase()?.includes(searchString?.toLowerCase())), false))

    const renderSidebarContent = () => (
        <aside
            className={`fixed left-0 top-0 bottom-0 h-[100vh] w-[300px] overflow-auto bg-[--primary] text-[--background-primary]`}>
            <List>
                <ListItemButton sx={{height: '40px'}} onClick={() => router.push(`/`)}>
                    <ListItemIcon sx={{color: 'var(--primary)'}}>
                        <Home sx={{color: '#000'}}/>
                    </ListItemIcon>
                    <Typography variant="subtitle2">Introduction</Typography>
                </ListItemButton>

                <ListSubheader sx={{py: 1, color: '#fff', bgcolor: 'var(--primary)'}}>
                    <div className="flex gap-3">
                        <TextField color="info" fullWidth size="small" label="search" value={searchString}
                                   onChange={(e) => setSearchString(e.target.value)}/>
                        <IconButton title="show favorites" onClick={() => setShowFav(!showFav)}>
                            {showFav ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                    </div>
                </ListSubheader>
                {isLoading ? renderSkeletons() : getFilteredData()?.map((position) => (
                    <PositionSidebarPreview key={position.id} position={position}/>
                ))}
            </List>
        </aside>
    )
    if (isMobile) {
        return (
            <>
                <IconButton onClick={() => setOpen(true)}>
                    <Menu/>
                </IconButton>
                <Drawer open={open} onClose={() => setOpen(false)}>
                    {renderSidebarContent()}
                </Drawer>
            </>
        )
    }

    return (
        <>{renderSidebarContent()}</>
    );
};

export default Sidebar;