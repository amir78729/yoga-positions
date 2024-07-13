'use client'
import Lottie from "lottie-react";
import animationData from './assets/lottiefiles/yoga-girl.json';
import {Box} from "@mui/system";
import Sidebar from "@/app/components/Sidebar";
import React from "react";
import {Typography} from "@mui/material";

export default function Home() {
    // const [searchString, setSearchString] = useState<string>('')
    // const {data} = useQuery<Position[]>(['all'], () => fetch('/api').then(res => res.json()));
    //
    // const getFilteredData = () => data?.filter(position => [position.englishName, position.sanskritName, position.persianName].reduce((a, b) => (a || b?.toLowerCase()?.includes(searchString?.toLowerCase())), false))

    return (
        <>
            <Sidebar />

            <div className="p-10 flex items-center justify-center flex-col">
            <Box width="400px">
                <Lottie
                    animationData={animationData}
                    loop
                    autoplay
                />
            </Box>
                <Typography variant="h4">Yoga Pos</Typography>
                <Typography variant="caption">a collection of yoga positions</Typography>
        </div>
        </>
    );
}
