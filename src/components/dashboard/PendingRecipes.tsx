// import { useEffect, useState } from "react";
// import { approvedRecipe, getPendingRecipes, rejectedRecipes } from "../../services/RecipeAPI";
// import { FaCheckCircle } from 'react-icons/fa'
// import { IoCloseCircle } from "react-icons/io5";
// import { showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts";

// interface Recipe{
//     _id: string;
//     title: string;
//     user: { name: string };
//     food: { name: string };
//     ingredients: string
//     step: string
//     readyIn:string
//     status: string;
//     date: string;
//     images: string[]
// }

// export default function PendingRecipes(){

//     const [pendingRecipes, setPendingRecipes] = useState<Recipe[]>([])
//     const [page, setPage] = useState(1)
//     const [totalPages, setTotalPages] = useState(1)

//     useEffect(()=>{
//         const loadPendingRecipes =  async ()=>{
//             try{
//                 const response = await getPendingRecipes(page, 3)
//                 setPendingRecipes(response.data.data.recipes)
//                 setTotalPages(response.data.totalPages)
//             }catch(error){
//                 console.error(error)
//             }

//         }
//         loadPendingRecipes()
//     },[page])

//     const handleApproved = async (id: string)=>{
//         try{
//             await approvedRecipe(id)
//             showSuccessAlert('Approved' , "Recipe has been approved and is now public")
//             setPendingRecipes(pendingRecipes.filter(rec => rec._id !== id))
//         }catch(error){
//             console.error(error)
//             showErrorAlert('Error' , "Failed to approve recipe")
//         }
//     }

//     const handleReject = async (id:string) =>{
//         try{
//             await rejectedRecipes(id)
//             showSuccessAlert('Reject' , "Recipe has been Rejected ")
//         }catch(error){
//             console.error(error)
//             showErrorAlert('Error' , "Failed to reject recipe")
//         }
//     }



//     return(
//         <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
//             <h2 className="text-2xl font-bold mb-4 text-white">Pending Recipes</h2>
//             {pendingRecipes.length === 0 ? (
//                 <p className="text-gray-300">No Pending Recipes</p>
//             ):(
//                 <div className="w-full overflow-x-auto">
//                     <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1000px]">
//                         <thead className="uppercase tracking-wider  bg-black/70 backdrop-blur-md border-b border-white/20">
//                             <tr>
//                                 <th scope="col" className="py-2 px-4 w-[10%]">Title</th>
//                                 <th scope="col" className="py-2 px-4 w-[8%]">Food</th>
//                                 <th scope="col" className="py-2 px-4 w-[8%]">User</th>
//                                 <th scope="col" className="py-2 px-4 w-[12%]">Ingradiants</th>
//                                 <th scope="col" className="py-2 px-4 w-[8%]">Ready In</th>
//                                 <th scope="col" className="py-2 px-4 w-[8%]">Date</th>
//                                 <th scope="col" className="py-2 px-4 w-[25%]">Step</th>
//                                 <th scope="col" className="py-2 px-4 w-[12%]">Images</th>
//                                 <th scope="col" className="py-2 px-4 w-[9%]">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {pendingRecipes.map((recipe)=>(
//                                 <tr key={recipe._id} className="border-b border-gray-700 hover:bg-black/25">
//                                     <td className="px-4 py-2 font-medium text-white align-top">{recipe.title}</td>
//                                     <td className="px-4 py-2 align-top">{recipe.food?.name || <span className="text-red-400">Unknown Food</span>}</td>
//                                     <td className="px-4 py-2 align-top">{recipe.user?.name || <span className="text-red-400">Unknown User</span>}</td>
//                                     <td className="py-4 px-2 align-top">
//                                         {(()=>{
//                                             const ingre = recipe.ingredients
//                                             if(Array.isArray(ingre)){
//                                                 return ingre.join(", ")
//                                             }
//                                             try{
//                                                 return JSON.parse(ingre).join(", ")
//                                             }catch{
//                                                 return ingre
//                                             }
//                                         })()}
//                                     </td>
//                                     <td className="px-4 py-2 align-top">{recipe.readyIn}</td>
//                                     <td className="px-4 py-2 align-top">
//                                         {new Date(recipe.date).toLocaleDateString()}
//                                     </td>
//                                     <td className="px-4 py-2 align-top">
//                                         <div className="break-words whitespace-pre-wrap max-h-40 overflow-y-auto pr-1">
//                                             {recipe.step}
//                                         </div>
//                                     </td>
//                                     <td className="py-4 px-2 flex gap-2 align-top justify-center">
//                                         {recipe.images && recipe.images.length > 0 ? (
//                                             recipe.images.map((imageUrl, idx)=>(
//                                                 <img
//                                                     key={idx}
//                                                     src={imageUrl}
//                                                     alt={`${recipe.title} ${idx + 1}`}
//                                                     className="w-16 h-16 object-cover rounded-md">
                                                    
//                                                 </img>
//                                             ))
//                                         ):(
//                                             <span>No Images</span>
//                                         )}
//                                     </td>
//                                     <td className="px-4 py-2 align-top">
                                        
//                                        <div className="flex items-center justify-center gap-3">
        
//                                             <button 
//                                                 className="text-green-400 hover:text-green-600 transition-colors"
//                                                 onClick={() => handleApproved(recipe._id)}
//                                                 title="Approve"
//                                             >
//                                                 <FaCheckCircle size={20} />
//                                             </button>

//                                             <button 
//                                                 className="text-red-400 hover:text-red-600 transition-colors"
//                                                 title="Reject"
//                                                 onClick={() => handleReject(recipe._id)}>
//                                                 <IoCloseCircle size={22} /> {/* size eka poddak wadi kala lassanata penanna */}
//                                             </button>
                                            
//                                         </div>
                                        
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>  
//             )}
//             <div className="flex justify-center items-center gap-4 mt-10">
//                 <button
//                 disabled={page === 1}
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
//                     page === 1
//                     ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                     : "text-gray-700 border-gray-300 hover:bg-gray-100"
//                 }`}
//                 >
//                 Prev
//                 </button>

//                 <span className="text-gray-600 text-sm">
//                 Page <span className="font-semibold">{page}</span> of{" "}
//                 <span className="font-semibold">{totalPages}</span>
//                 </span>

//                 <button
//                 disabled={page === totalPages}
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                 className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
//                     page === totalPages
//                     ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                     : "text-gray-700 border-gray-300 hover:bg-gray-100"
//                 }`}
//                 >
//                 Next
//                 </button>
//             </div>
//         </div>
//     )
// }


import { useEffect, useState } from "react";
import { approvedRecipe, getPendingRecipes, rejectedRecipes } from "../../services/RecipeAPI";
import { FaCheckCircle, FaRegClock, FaRegCalendarAlt } from 'react-icons/fa'
import { IoCloseCircle } from "react-icons/io5";
import { showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts";

interface Recipe {
    _id: string;
    title: string;
    user: { name: string };
    food: { name: string };
    ingredients: string
    step: string
    readyIn: string
    status: string;
    date: string;
    images: string[]
}

export default function PendingRecipes() {

    const [pendingRecipes, setPendingRecipes] = useState<Recipe[]>([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const loadPendingRecipes = async () => {
            try {
                const response = await getPendingRecipes(page, 3)
                setPendingRecipes(response.data.data.recipes)
                setTotalPages(response.data.totalPages)
            } catch (error) {
                console.error(error)
            }
        }
        loadPendingRecipes()
    }, [page])

    const handleApproved = async (id: string) => {
        try {
            await approvedRecipe(id)
            showSuccessAlert('Approved', "Recipe has been approved and is now public")
            setPendingRecipes(pendingRecipes.filter(rec => rec._id !== id))
        } catch (error) {
            showErrorAlert('Error', "Failed to approve recipe")
        }
    }

    const handleReject = async (id: string) => {
        try {
            await rejectedRecipes(id)
            showSuccessAlert('Rejected', "Recipe has been rejected")
            setPendingRecipes(pendingRecipes.filter(rec => rec._id !== id))
        } catch (error) {
            showErrorAlert('Error', "Failed to reject recipe")
        }
    }

    return (
        <div className="bg-[#001529] border border-yellow-600/20 p-8 rounded-[2rem] shadow-2xl">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-widest">
                    Pending <span className="opacity-80">Recipes</span>
                </h2>
                <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1 ml-1">Review and moderate community submissions</p>
            </div>

            {pendingRecipes.length === 0 ? (
                <div className="py-20 text-center bg-black/20 rounded-[2rem] border border-dashed border-yellow-600/20">
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Queue is empty. No recipes to review.</p>
                </div>
            ) : (
                <div className='w-full overflow-x-auto rounded-[1.5rem] border border-yellow-600/10 bg-black/20'>
                    <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1200px] border-collapse">
                        <thead className="uppercase tracking-[0.2em] text-[10px] font-black bg-yellow-600/5 text-yellow-500/80 border-b border-yellow-600/10">
                            <tr>
                                <th className="py-6 px-6 w-[12%]">Recipe Info</th>
                                <th className="py-6 px-6 w-[10%]">Dish</th>
                                <th className="py-6 px-6 w-[10%]">Contributor</th>
                                <th className="py-6 px-6 w-[15%]">Ingredients</th>
                                <th className="py-6 px-6 w-[25%]">Cooking Steps</th>
                                <th className="py-6 px-6 w-[15%] text-center">Gallery</th>
                                <th className="py-6 px-6 w-[13%] text-center">Moderation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow-600/5">
                            {pendingRecipes.map((recipe) => (
                                <tr key={recipe._id} className="hover:bg-yellow-600/[0.03] transition-colors group">
                                    <td className="py-6 px-6 align-top">
                                        <p className="font-bold text-gray-100 group-hover:text-yellow-500 transition-colors mb-2">{recipe.title}</p>
                                        <div className="flex flex-col gap-1.5">
                                            <span className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase"><FaRegClock className="text-yellow-600" /> {recipe.readyIn}</span>
                                            <span className="flex items-center gap-2 text-[9px] text-gray-500 font-bold uppercase"><FaRegCalendarAlt className="text-yellow-600" /> {new Date(recipe.date).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 align-top">
                                        <span className="bg-yellow-600/10 text-yellow-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border border-yellow-600/20">
                                            {recipe.food?.name || "Unknown"}
                                        </span>
                                    </td>
                                    <td className="py-6 px-6 align-top">
                                        <p className="text-xs font-bold text-gray-400">{recipe.user?.name}</p>
                                        <p className="text-[9px] text-gray-600 italic underline decoration-yellow-600/30 cursor-help">View Profile</p>
                                    </td>
                                    <td className="py-6 px-6 align-top leading-relaxed">
                                        <p className="text-xs text-gray-400 line-clamp-4">
                                            {(() => {
                                                const ingre = recipe.ingredients
                                                if (Array.isArray(ingre)) return ingre.join(", ")
                                                try { return JSON.parse(ingre).join(", ") }
                                                catch { return ingre }
                                            })()}
                                        </p>
                                    </td>
                                    <td className="py-6 px-6 align-top leading-relaxed">
                                        <div className="text-xs text-gray-500 line-clamp-4 italic">
                                            {recipe.step}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 align-top">
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {recipe.images && recipe.images.length > 0 ? (
                                                recipe.images.map((imageUrl, idx) => (
                                                    <img
                                                        key={idx}
                                                        src={imageUrl}
                                                        alt="preview"
                                                        className="w-12 h-12 object-cover rounded-xl border border-yellow-600/20 hover:border-yellow-500 transition-all shadow-md transform hover:scale-110"
                                                    />
                                                ))
                                            ) : (
                                                <span className="text-[9px] text-gray-700 font-black uppercase tracking-widest">No Media</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 align-top">
                                        <div className="flex items-center justify-center gap-3">
                                            <button
                                                className="p-3 bg-green-500/10 text-green-400 rounded-2xl hover:bg-green-500 hover:text-white transition-all shadow-lg border border-green-500/10"
                                                onClick={() => handleApproved(recipe._id)}
                                                title="Approve Recipe"
                                            >
                                                <FaCheckCircle size={18} />
                                            </button>
                                            <button
                                                className="p-3 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-lg border border-red-500/10"
                                                onClick={() => handleReject(recipe._id)}
                                                title="Reject Recipe"
                                            >
                                                <IoCloseCircle size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-6 mt-12">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={`px-6 py-2 rounded-xl border font-black uppercase text-[10px] tracking-[0.2em] transition-all ${
                        page === 1
                            ? "text-gray-700 border-gray-800 cursor-not-allowed"
                            : "text-yellow-600 border-yellow-600/30 hover:bg-yellow-600 hover:text-black shadow-lg"
                    }`}
                >
                    Prev
                </button>

                <div className="flex items-center gap-3 bg-black/40 px-5 py-2.5 rounded-2xl border border-yellow-600/10">
                    <span className="text-gray-600 text-[9px] font-black uppercase tracking-widest">Page</span>
                    <span className="text-yellow-500 font-black text-sm">{page}</span>
                    <span className="text-gray-700 text-xs">/</span>
                    <span className="text-gray-400 font-bold text-sm">{totalPages}</span>
                </div>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={`px-6 py-2 rounded-xl border font-black uppercase text-[10px] tracking-[0.2em] transition-all ${
                        page === totalPages
                            ? "text-gray-700 border-gray-800 cursor-not-allowed"
                            : "text-yellow-600 border-yellow-600/30 hover:bg-yellow-600 hover:text-black shadow-lg"
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    )
}