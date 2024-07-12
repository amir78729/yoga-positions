'use client'
import {TextField} from "@mui/material";
import {useQuery} from "react-query";
import {Position} from "@/app/types";
import PositionSidebarPreview from "@/app/components/PositionPreview";
import {useState} from "react";

export default function Home() {
    const [searchString, setSearchString] = useState<string>('')
    const {data} = useQuery<Position[]>(['all'], () => fetch('/api').then(res => res.json()));

    const getFilteredData = () => data?.filter(position => [position.englishName, position.sanskritName, position.persianName].reduce((a, b) => (a || b?.toLowerCase()?.includes(searchString?.toLowerCase())), false))

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <header><TextField value={searchString} onChange={(e) => setSearchString(e.target.value)}/></header>
            <section>
                <main>
                    {getFilteredData()?.map(position => (
                        <PositionSidebarPreview key={position.id} position={position}/>
                    ))}
                </main>
            </section>
        </main>
    );
}
