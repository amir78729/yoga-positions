import {NextRequest} from "next/server";
import {Position} from "@/app/types";

export async function GET(request: NextRequest) {
    const res = await fetch('https://raw.githubusercontent.com/amir78729/front-end-roadmap/main/projects/yoga-positions/sample-positions.json', {})
    const data = await res.json() as Position[];

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (id) {
        return Response.json(data.find((row) => row.id === parseInt(id, 10)))
    }

    return Response.json(data)
}