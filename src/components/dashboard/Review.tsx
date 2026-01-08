// import { useEffect, useState } from "react";
// import { deleteReview, getAllReviews } from "../../services/ReviewAPI";
// import {  FaTrash } from "react-icons/fa"
// import { FaStar } from "react-icons/fa";
// import { showConfirmDialog, showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts";



// interface User {
//   _id: string;
//   name: string;
// }

// interface Recipe {
//   _id: string;
//   title: string;
// }
// interface ReviewItem{
//     _id: string
//     user:User
//     recipe:Recipe
//     rating : number
//     description : string
//     date:Date

// }
// export default function Review(){

//     const [page,setPage] = useState(1)
//     const [totalPages, setTotalPages] = useState(1)
//     const [review, setReview] = useState<ReviewItem[]>([])

//     useEffect (()=>{
//         const fetchReviews = async ()=>{
//             try{
//                 const response = await getAllReviews(page, 3)
//                 setReview(response.data.data.reviews)
//                 setTotalPages(response.data.totalPages)
//             }catch(error){
//                 console.error(error)
//             }
//         }
//         fetchReviews()
//     },[page])

//     const renderStar = (rating: number) =>{
//             return [...Array(5)].map((_, index)=>{
//                 return(
//                     <FaStar
//                         key={index}
//                         size={16}
//                         className={index < rating ? "text-yellow-500" : "text-gray-300"}/>
//                 )
//             })
//         }

//     const handleDelete = (reviewDelete: ReviewItem)=>{
//         showConfirmDialog(
//             'Are you sure?',
//             `Do you want to delete ${reviewDelete.user.name} 's Review ? `,
//             'Yes, Delete id!'
//         ).then(async(result)=>{
//             if(result.isConfirmed){
//                 try{
//                    await deleteReview(reviewDelete._id)
//                    setReview(prevReviews =>
//                         prevReviews.filter(review => review._id !== reviewDelete._id)
//                    ) 
//                    showSuccessAlert('Deleted' ,`${reviewDelete.user.name} 's Review has been Deleted`)
//                 }catch(error){
//                     console.error(error)
//                     showErrorAlert('error', 'Faild to delete')
//                 }
//             }
//         })
//     }

//     return(
//         <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
//             <div className="w-full overflow-x-auto">
//                 <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1000px]">
//                     <thead className="uppercase tracking-wider  bg-black/70 backdrop-blur-md border-b border-white/20">
//                         <tr>
//                             <th scope="col" className="py-2 px-4 w-[10%]">User</th>
//                             <th scope="col" className="py-2 px-4 w-[8%]">Recipe</th>
//                             <th scope="col" className="py-2 px-4 w-[8%]">Rating</th>
//                             <th scope="col" className="py-2 px-4 w-[12%]">Review</th>
//                             <th scope="col" className="py-2 px-4 w-[8%]">Date</th>
//                             <th scope="col" className="py-2 px-4 w-[8%]">Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {review.map((review)=>(
//                             <tr key={review._id} className="border-b border-gray-700 hover:bg-black/25">
//                                 <td className="px-4 py-2 align-top">{review.user.name}</td>
//                                 <td className="px-4 py-2 align-top">{review.recipe.title}</td>
//                                 <td className="flex gap-1 mt-3 ml-1">{renderStar(review.rating)}</td>
//                                  <td className="px-4 py-2 align-top">{review.description}</td>

//                                 <td className="px-4 py-2 align-top">
//                                         {new Date(review.date).toLocaleDateString()}
//                                 </td>
//                                 <td className="py-2 px-4">
//                                     <button className="text-blue-400 hover:text-blue-600 mx-2"
//                                         onClick={()=> handleDelete(review)}>
//                                         <FaTrash/>
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//             <div className="flex justify-center items-center gap-4 mt-10">
//                 <button
//                     disabled={page===1}
//                     onClick={()=> setPage((p)=>Math.max(1, p-1))}
//                     className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
//                     page === 1
//                     ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                     : "text-gray-700 border-gray-300 hover:bg-gray-100"
//                 }`}>
//                  Prev   
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
import { deleteReview, getAllReviews } from "../../services/ReviewAPI";
import { FaTrash, FaStar } from "react-icons/fa"
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts";

// ... (Interfaces remain the same)

export default function Review(){
    const [page,setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [review, setReview] = useState<ReviewItem[]>([])

    useEffect (()=>{
        const fetchReviews = async ()=>{
            try{
                const response = await getAllReviews(page, 3)
                setReview(response.data.data.reviews)
                setTotalPages(response.data.totalPages)
            }catch(error){
                console.error(error)
            }
        }
        fetchReviews()
    },[page])

    // Star rendering with improved Gold colors
    const renderStar = (rating: number) =>{
        return [...Array(5)].map((_, index)=>{
            return(
                <FaStar
                    key={index}
                    size={16}
                    className={index < rating ? "text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" : "text-gray-700"}/>
            )
        })
    }

    const handleDelete = (reviewDelete: any)=>{
        showConfirmDialog(
            'Are you sure?',
            `Do you want to delete ${reviewDelete.user.name}'s Review?`,
            'Yes, Delete it!'
        ).then(async(result)=>{
            if(result.isConfirmed){
                try{
                   await deleteReview(reviewDelete._id)
                   setReview(prevReviews => prevReviews.filter(r => r._id !== reviewDelete._id)) 
                   showSuccessAlert('Deleted' ,`${reviewDelete.user.name}'s Review has been Deleted`)
                }catch(error){
                    showErrorAlert('Error', 'Failed to delete')
                }
            }
        })
    }

    return(
        <div className="bg-[#001529] p-6 rounded-xl shadow-2xl border border-yellow-600/20 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
            <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700">
                User Reviews
            </h2>

            <div className="w-full overflow-x-auto rounded-lg border border-yellow-900/30">
                <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1000px]">
                    <thead className="uppercase tracking-wider bg-[#000c17] text-yellow-500 border-b border-yellow-600/50">
                        <tr>
                            <th className="py-4 px-4 w-[12%]">User</th>
                            <th className="py-4 px-4 w-[12%]">Recipe</th>
                            <th className="py-4 px-4 w-[10%] text-center">Rating</th>
                            <th className="py-4 px-4 w-[25%]">Description</th>
                            <th className="py-4 px-4 w-[10%]">Date</th>
                            <th className="py-4 px-4 w-[8%] text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-900/10">
                        {review.map((item)=>(
                            <tr key={item._id} className="bg-[#001f3f]/40 hover:bg-[#002b55] transition-colors group">
                                <td className="px-4 py-4 font-semibold text-white">{item.user.name}</td>
                                <td className="px-4 py-4 text-gray-400 italic">{item.recipe.title}</td>
                                <td className="px-4 py-4">
                                    <div className="flex justify-center gap-1">
                                        {renderStar(item.rating)}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-300 leading-relaxed">
                                    {item.description}
                                </td>
                                <td className="px-4 py-4 text-gray-500 font-mono">
                                    {new Date(item.date).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <button 
                                        className="p-2 rounded-full text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all transform hover:scale-110"
                                        onClick={()=> handleDelete(item)}>
                                        <FaTrash size={16}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Styled to Match */}
            <div className="flex justify-center items-center gap-6 mt-10">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={`px-6 py-2 rounded-full border-2 font-bold transition-all ${
                        page === 1
                        ? "border-gray-800 text-gray-700 cursor-not-allowed"
                        : "border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black shadow-lg shadow-yellow-900/20"
                    }`}
                >
                    PREV
                </button>

                <span className="text-gray-400 font-medium tracking-widest text-xs uppercase">
                    Page <span className="text-yellow-500 font-black text-lg mx-1">{page}</span> of {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={`px-6 py-2 rounded-full border-2 font-bold transition-all ${
                        page === totalPages
                        ? "border-gray-800 text-gray-700 cursor-not-allowed"
                        : "border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black shadow-lg shadow-yellow-900/20"
                    }`}
                >
                    NEXT
                </button>
            </div>
        </div>
    )
}