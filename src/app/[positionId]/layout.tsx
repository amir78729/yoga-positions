'use client'
import {Inter} from "next/font/google";
import {QueryClient, QueryClientProvider, useQuery} from "react-query";
import {
    createTheme,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText, ListSubheader,
    Skeleton, TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import COLORS from "@/app/constants/colors";
import {Position} from "@/app/types";
import Icon from "@/app/components/Icon";
import PositionSidebarPreview from "@/app/components/PositionPreview";
import React, {useState} from "react";
import {Home} from "@mui/icons-material";
import {useRouter} from "next/navigation";

const inter = Inter({subsets: ["latin"]});

export default function PositionLayout({
                                           children,
                                       }: Readonly<{
    children: React.ReactNode;
}>) {

    const {data: positions, isLoading} = useQuery<Position[]>(['all'], () => fetch('/api').then(res => res.json()));
    const router = useRouter();

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

    const getFilteredData = () => positions?.filter(position => [position.englishName, position.sanskritName, position.persianName].reduce((a, b) => (a || b?.toLowerCase()?.includes(searchString?.toLowerCase())), false))

    const sidebarWidth = `350px`;
    return (
        <>
            <aside
                className={`fixed left-0 top-0 bottom-0 h-[100vh] w-[300px] overflow-auto bg-[--primary] text-[--background-primary]`}>
                <List>
                    <ListItemButton sx={{ height: '40px'}} onClick={() => router.push(`/`)}>
                        <ListItemIcon sx={{ color: 'var(--primary)' }}>
                            <Home sx={{color: '#000'}} />
                        </ListItemIcon>
                        <Typography variant="subtitle2">Introduction</Typography>
                    </ListItemButton>

                    <ListSubheader sx={{ py: 1, color: '#fff', bgcolor: 'var(--primary)'}}>
                        <TextField fullWidth size="small" sx={{color: '#fff'}} label="search" value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
                    </ListSubheader>

                    {isLoading ? renderSkeletons() : getFilteredData()?.map((position) => (
                        <PositionSidebarPreview key={position.id} position={position}/>
                    ))}
                </List>
            </aside>
            <main className={`ml-[300px]`}>
                {children}
            </main>
        </>
    );
}
