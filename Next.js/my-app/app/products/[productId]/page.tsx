import {Metadata} from "next";

type Props={
    params:{
        productId:string;
    };
};


export const generateMetadata=({params}:Props):Metadata=>{
    return {
        title:`Product ${params.productId}`
    }
}


export default function product({params}:{params:{productId:string};}:Props){
    return <h1>Product page of {params.productId}</h1>
}