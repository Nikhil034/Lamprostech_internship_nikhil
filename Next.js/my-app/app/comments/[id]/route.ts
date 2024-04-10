import { redirect } from "@/node_modules/next/navigation";
import { type NextRequest } from "@/node_modules/next/server";
import {comments} from "../data";

// export async function GET(request:NextRequest){
//     const searchParams=request.nextUrl.searchParams;
//     const query=searchParams.get("query");
//     const filteredComments=query?comments.filter((comment)=>comment.text.includes(query)):comments;
//     return Response.json(filteredComments);
// }
export async function GET(_request:Request,{params}:{params:{id:string}}) {
    if(parseInt(params.id)>comments.length){
        redirect("/comments");
    }
    const comment=comments.find((comment)=>comment.id===parseInt(params.id));
    return Response.json(comment);
}


export async function POST(request:Request) {
    const comment=await request.json();
    const newcomment={
        id:comments.length+1,
        text:comment.text,
    };
    comments.push(newcomment);
    return new Response(JSON.stringify(newcomment),{
        headers:{
            "Content-Type":"application/json",
        },
        status:201,
    });
}

export async function PATCH(request:Request,{params}:{params:{id:string}}){
    const body=await request.json();
    const {text}=body;
    const index=comments.findIndex((comment)=>comment.id===parseInt(params.id));
    comments[index].text=text;
    return Response.json(comments[index]);
    
}

export async function DELETE(request:Request,{params}:{params:{id:string}}){
    const index=comments.findIndex((comment)=>comment.id===parseInt(params.id));
    const deletedComment=comments[index];
    comments.slice(index,1);
    return Response.json(deletedComment);
}