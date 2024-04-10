import { headers,cookies } from "@/node_modules/next/headers";
import { type NextRequest } from "@/node_modules/next/server";

export async function GET(request:NextRequest){
    const requestHeaders=new Headers(request.headers);
    cookies().set("resultPerPage","20");
    const theme=request.cookies.get("theme");
    console.log(requestHeaders.get("Authorization"));
    console.log(theme);
    console.log(cookies().get("resultPerPage"));
    return new Response("<h1>Profile Api data</h1>",{headers:{"Content-Type":"text/html","Set-Cookie":"theme=dark"},});
}