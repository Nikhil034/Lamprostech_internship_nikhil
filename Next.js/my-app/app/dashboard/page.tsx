"use client";

import { useState } from "react";

export default function Dashboardpage(){
    const [name,setName]=useState("");
    return(
        <div>
            <h1>Dashboard page</h1>
            <input value={name} onChange={(e)=>setName(e.target.value)} ></input>
            <p>Hello,{name}</p>
        </div>
    )
}