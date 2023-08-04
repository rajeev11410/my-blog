import { NextResponse } from "next/server";

import prisma from "@/prisma";
 

 export async function main (){
    try{
        await prisma.$connect();
    }
    catch(err){
            return Error("Database Connection Unscussesful");
    }
 }



export const GET = async (req: Request, res: NextResponse) => {   
   try{
     await main()
     const posts= await prisma.post.findMany();
     return NextResponse.json({message:"Success",posts},{status:200})
   }
   catch(err){
     return NextResponse.json({message:"Error",err},{status:500});
   } finally{
    await prisma.$connect();
   }
};
     
export const POST = async (req: Request, res: NextResponse) => { 
    try{
      const {title,description} = await req.json();
       await main();

       const post= await prisma.post.create({data:{description,title}});

       return NextResponse.json({message:"Success",post},{status:201 });

    }
    catch(err){
      return NextResponse.json({message:"Error",err},{status:500});
    }
    finally{
      await prisma.$disconnect();
    }
};

    
