import {useQuery, UseQueryResult} from "react-query";
import {Position} from "@/app/types";
import {useMediaQuery} from "@mui/material";

export const useYogaPositions = (): UseQueryResult<Position[]> => {
    return useQuery<Position[]>(['all'], () => fetch('/api').then(res => res.json()));
}

export const useSingleYogaPosition = (id: string): UseQueryResult<Position> => {
    const { data, ...restProps} =  useYogaPositions();
    // @ts-expect-error
    return ({ data: data?.find((row) => row.id === parseInt(id, 10)), ...restProps });
}

export const useIsMobile = () => {
    return useMediaQuery('(max-width: 768px)');
}
