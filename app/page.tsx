import Link from "next/link";

async function fetchBlogs() {
   const res= await fetch("http://localhost:3000/api/blog",{
    next:{
      revalidate:4
    },
   });

   const  data = await res.json();
   return data.posts;
}

export default  async function Home() {
    
   const posts= await fetchBlogs();
   console.log(posts);
   return (
    <main  className="w-full h-full"> 
      <div className="flex flex-col justify-center items-center m-auto">
           <p className="text-2xl text-slate-200 font-bold p-3">
            Add A Wonderful Blog 🚀
          </p>
      </div>    
      {/*link*/}
      <div className="flex my-5">
        <Link href={"/blog/add"} 
        className="md:w-1/6 sm:w-2/4 text-center rouonded:md p-2 m-auto bg-slate-200 "> 
             Add A New Blog 🚀 
        </Link>
     </div>
       {/*Blogs*/}
       <div className="w-full flex flex-col justify-center items-center">
         {posts?.map((post:any) =>(
           <div key={post.id} className="w-3/4 p-4  rounded-md mx-3 my-2 bg-slate-200 flex flex-col jusify-center "> 
              {/*title and Action*/}
              <div className="flex items-center my-3"> 
                <div className="mr-auto"> 
                 <h2 className="mr-auto fount-semibold">
                    { post.title}
                   </h2>
                 </div>
               <Link href={`/blog/edit/${post.id}`} className="px-4 py-2 text-center  text-xl bg-slate-900 rounded-md font-semibold text-slate-200">
                Edit
               </Link>
              </div> 
              {/*Date and Description*/}
              <div className="mr-auto my-1">
               <blockquote className="font-bold text-slate-700">
                {new Date(post.date).toDateString()}
               </blockquote>
             </div>
            <div className=" mr-auto my-1">
              <h2>{post.description}</h2>
            </div>
          </div>
          
         ))}
       </div> 
      
     </main>
    
  );
}
