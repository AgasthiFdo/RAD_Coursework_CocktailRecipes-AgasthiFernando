// import { useEffect, useState } from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa'
// import { IoMdAdd } from "react-icons/io";
// import FoodForm from "../dashboard/FoodForm"
// import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts';
// import { useDispatch, useSelector } from 'react-redux';
// import type { AppDisPatch, RootState } from '../../redux/store';
// import { deleteFoodAction, fetchAllFoods, setSelectedFood, type Food } from '../../redux/slices/foodSlice';

// type FoodItem = Food

// export default function Foods() {
//     const [page, setPage] = useState(1)
//     const [showForm, setShowForm] = useState(false)
//     const dispatch = useDispatch<AppDisPatch>();
//     const { foods, loading, totalPages } = useSelector((state: RootState) => state.food);

//     useEffect(() => {
//         dispatch(fetchAllFoods({ page, limit: 3 }));
//     }, [dispatch, page])

//     const handleSavedFood = () => {
//         dispatch(fetchAllFoods({ page, limit: 3 }));
//         setShowForm(false);
//     }
//     const handleEditFood = (food: FoodItem) => {
//         dispatch(setSelectedFood(food))
//         setShowForm(true)
//     }
//     const handleAddClick = () => {
//         dispatch(setSelectedFood(null))
//         setShowForm(true)
//     }
//     const handleCloseForm = () => {
//         dispatch(setSelectedFood(null))
//         setShowForm(false)
//     }

//     const handleDelete = (foodDelete: FoodItem) => {
//         showConfirmDialog(
//             'Are you sure?',
//             `${foodDelete.name} Do you want to delete? `,
//             'Yes, Delete id!'
//         ).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     dispatch(deleteFoodAction(foodDelete._id));
//                     showSuccessAlert('Deleted', `${foodDelete.name} has been Deleted`)
//                 } catch (error) {
//                     console.error(error)
//                     showErrorAlert('error', 'Faild to delete')
//                 }
//             }
//         })
//     }

//     return (
//         <>
//             <div className="bg-[#1e293b]/40 border border-white/10 p-8 rounded-[2rem] backdrop-blur-xl shadow-2xl">
//                 <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8'>
//                     <h2 className="text-3xl font-black text-white uppercase tracking-tight">
//                         Food <span className="text-[#fbbf24]">Management</span>
//                     </h2>
//                     <button 
//                         className='flex items-center justify-center gap-2 bg-[#fbbf24] text-[#0f172a] px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all duration-300 shadow-lg active:scale-95'
//                         onClick={handleAddClick}
//                     >
//                         Add New Food <IoMdAdd className='text-xl' />
//                     </button>
//                 </div>

//                 {loading && (
//                     <div className="flex justify-center py-4">
//                         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#fbbf24]"></div>
//                     </div>
//                 )}

//                 <div className='w-full overflow-x-auto rounded-3xl border border-white/5'>
//                     <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1000px] border-collapse">
//                         <thead className="uppercase tracking-[0.2em] text-[10px] font-black bg-white/5 text-[#fbbf24] border-b border-white/10">
//                             <tr>
//                                 <th className='py-5 px-6 w-[15%]'>Name</th>
//                                 <th className='py-5 px-6 w-[10%]'>Category</th>
//                                 <th className="py-5 px-6 w-[10%]">Cuisine</th>
//                                 <th className='py-5 px-6 w-[30%]'>Description</th>
//                                 <th className='py-5 px-6 w-[25%] text-center'>Images</th>
//                                 <th className='py-5 px-6 w-[10%] text-center'>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-white/5">
//                             {foods.map((food: FoodItem, index: number) => (
//                                 <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
//                                     <td className='py-6 px-6 font-bold text-white'>{food.name}</td>
//                                     <td className='py-6 px-6'>
//                                         <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-bold border border-white/10">
//                                             {food.category}
//                                         </span>
//                                     </td>
//                                     <td className='py-6 px-6 italic text-gray-400'>{food.cuisine}</td>
//                                     <td className='py-6 px-6 leading-relaxed'>
//                                         <p className="line-clamp-2">{food.description}</p>
//                                     </td>
//                                     <td className="py-6 px-6">
//                                         <div className="flex gap-2 justify-center">
//                                             {food.images && food.images.length > 0 ? (
//                                                 food.images.slice(0, 3).map((imgUrl: string, idx: number) => (
//                                                     <img
//                                                         key={idx}
//                                                         src={imgUrl}
//                                                         alt={`${food.name}`}
//                                                         className="w-12 h-12 object-cover rounded-xl border border-white/10 group-hover:border-[#fbbf24]/50 transition-all shadow-md"
//                                                     />
//                                                 ))
//                                             ) : (
//                                                 <span className="text-gray-600 italic">No Image</span>
//                                             )}
//                                         </div>
//                                     </td>
//                                     <td className='py-6 px-6'>
//                                         <div className="flex items-center justify-center gap-2">
//                                             <button 
//                                                 className='p-3 bg-blue-500/10 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg'
//                                                 onClick={() => handleEditFood(food)}
//                                             >
//                                                 <FaEdit size={16}/>
//                                             </button>
//                                             <button 
//                                                 className='p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg'
//                                                 onClick={() => handleDelete(food)}
//                                             >
//                                                 <FaTrash size={16}/>
//                                             </button>
//                                         </div>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="flex justify-center items-center gap-6 mt-10">
//                     <button
//                         disabled={page === 1}
//                         onClick={() => setPage((p) => Math.max(1, p - 1))}
//                         className={`px-6 py-2 rounded-xl border font-bold uppercase text-[10px] tracking-widest transition-all ${
//                             page === 1
//                                 ? "text-gray-600 border-white/5 cursor-not-allowed"
//                                 : "text-white border-[#fbbf24]/30 hover:bg-[#fbbf24] hover:text-[#0f172a] shadow-lg"
//                         }`}
//                     >
//                         Prev
//                     </button>

//                     <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/10">
//                         <span className="text-gray-500 text-[10px] font-black uppercase">Page</span>
//                         <span className="text-[#fbbf24] font-bold text-sm">{page}</span>
//                         <span className="text-gray-600 text-xs">/</span>
//                         <span className="text-white font-bold text-sm">{totalPages}</span>
//                     </div>

//                     <button
//                         disabled={page === totalPages}
//                         onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                         className={`px-6 py-2 rounded-xl border font-bold uppercase text-[10px] tracking-widest transition-all ${
//                             page === totalPages
//                                 ? "text-gray-600 border-white/5 cursor-not-allowed"
//                                 : "text-white border-[#fbbf24]/30 hover:bg-[#fbbf24] hover:text-[#0f172a] shadow-lg"
//                         }`}
//                     >
//                         Next
//                     </button>
//                 </div>
//             </div>

//             {showForm && (
//                 <FoodForm
//                     onClose={handleCloseForm}
//                     onSave={handleSavedFood}
//                 />
//             )}
//         </>
//     )
// }



import { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'
import { IoMdAdd } from "react-icons/io";
import FoodForm from "../dashboard/FoodForm"
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDisPatch, RootState } from '../../redux/store';
import { deleteFoodAction, fetchAllFoods, setSelectedFood, type Food } from '../../redux/slices/foodSlice';

type FoodItem = Food

export default function Foods() {
    const [page, setPage] = useState(1)
    const [showForm, setShowForm] = useState(false)
    const dispatch = useDispatch<AppDisPatch>();
    const { foods, loading, totalPages } = useSelector((state: RootState) => state.food);

    useEffect(() => {
        dispatch(fetchAllFoods({ page, limit: 3 }));
    }, [dispatch, page])

    const handleSavedFood = () => {
        dispatch(fetchAllFoods({ page, limit: 3 }));
        setShowForm(false);
    }
    const handleEditFood = (food: FoodItem) => {
        dispatch(setSelectedFood(food))
        setShowForm(true)
    }
    const handleAddClick = () => {
        dispatch(setSelectedFood(null))
        setShowForm(true)
    }
    const handleCloseForm = () => {
        dispatch(setSelectedFood(null))
        setShowForm(false)
    }

    const handleDelete = (foodDelete: FoodItem) => {
        showConfirmDialog(
            'Are you sure?',
            `Do you want to delete "${foodDelete.name}"?`,
            'Yes, Delete it!'
        ).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    dispatch(deleteFoodAction(foodDelete._id));
                    showSuccessAlert('Deleted', `${foodDelete.name} has been deleted.`)
                } catch (error) {
                    showErrorAlert('Error', 'Failed to delete food item.')
                }
            }
        })
    }

    return (
        <>
            <div className="bg-[#001529] border border-yellow-600/20 p-8 rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-all">
                {/* Header Section */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10'>
                    <div>
                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-widest">
                            Food <span className="opacity-80">Management</span>
                        </h2>
                        <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1 ml-1">Inventory & Recipes</p>
                    </div>
                    
                    <button 
                        className='flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-600 to-amber-500 text-black px-8 py-3.5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-600/20 active:scale-95'
                        onClick={handleAddClick}
                    >
                        Add New Item <IoMdAdd className='text-xl' />
                    </button>
                </div>

                {loading && (
                    <div className="flex justify-center py-6">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                )}

                {/* Table Section */}
                <div className='w-full overflow-x-auto rounded-[1.5rem] border border-yellow-600/10 bg-black/20'>
                    <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1000px] border-collapse">
                        <thead className="uppercase tracking-[0.2em] text-[10px] font-black bg-yellow-600/5 text-yellow-500/80 border-b border-yellow-600/10">
                            <tr>
                                <th className='py-6 px-6 w-[15%]'>Name</th>
                                <th className='py-6 px-6 w-[12%]'>Category</th>
                                <th className="py-6 px-6 w-[10%]">Cuisine</th>
                                <th className='py-6 px-6 w-[28%]'>Description</th>
                                <th className='py-6 px-6 w-[20%] text-center'>Gallery</th>
                                <th className='py-6 px-6 w-[15%] text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow-600/5">
                            {foods.map((food: FoodItem, index: number) => (
                                <tr key={index} className="hover:bg-yellow-600/[0.03] transition-colors group">
                                    <td className='py-6 px-6 font-bold text-gray-100 group-hover:text-yellow-500 transition-colors'>{food.name}</td>
                                    <td className='py-6 px-6'>
                                        <span className="bg-yellow-600/10 text-yellow-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border border-yellow-600/20">
                                            {food.category}
                                        </span>
                                    </td>
                                    <td className='py-6 px-6 italic text-gray-500 text-xs'>{food.cuisine}</td>
                                    <td className='py-6 px-6 leading-relaxed'>
                                        <p className="line-clamp-2 text-xs text-gray-400 font-medium">{food.description}</p>
                                    </td>
                                    <td className="py-6 px-6">
                                        <div className="flex gap-2 justify-center">
                                            {food.images && food.images.length > 0 ? (
                                                food.images.slice(0, 3).map((imgUrl: string, idx: number) => (
                                                    <div key={idx} className="relative group/img">
                                                        <img
                                                            src={imgUrl}
                                                            alt={`${food.name}`}
                                                            className="w-11 h-11 object-cover rounded-lg border border-yellow-600/20 group-hover:border-yellow-500 transition-all shadow-md transform group-hover/img:scale-110"
                                                        />
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-700 text-[10px] uppercase font-bold tracking-widest">No Image</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className='py-6 px-6'>
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                className='p-2.5 bg-blue-500/5 text-blue-400 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg border border-blue-500/10'
                                                onClick={() => handleEditFood(food)}
                                                title="Edit Item"
                                            >
                                                <FaEdit size={14}/>
                                            </button>
                                            <button 
                                                className='p-2.5 bg-red-500/5 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg border border-red-500/10'
                                                onClick={() => handleDelete(food)}
                                                title="Delete Item"
                                            >
                                                <FaTrash size={14}/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
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

                    <div className="flex items-center gap-3 bg-black/40 px-5 py-2.5 rounded-2xl border border-yellow-600/10 shadow-inner">
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

            {showForm && (
                <FoodForm
                    onClose={handleCloseForm}
                    onSave={handleSavedFood}
                />
            )}
        </>
    )
}