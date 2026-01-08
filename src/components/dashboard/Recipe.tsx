import { useEffect, useState } from "react"
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts"
import { IoMdAdd } from "react-icons/io"
import { FaEdit, FaTrash } from "react-icons/fa"
import { RecipeForm } from "./RecipeForm"
import { useDispatch, useSelector } from "react-redux"
import type { AppDisPatch, RootState } from "../../redux/store"
import { deleteRecipeAction, fetchAllRecipess, setSelectedRecipe } from "../../redux/slices/recipeSlice"

// ... (Interfaces remain the same)

export default function Recipes(){
    const [page, setPage] = useState(1)
    const [showForm, setShoeForm] = useState(false)
    const dispatch = useDispatch<AppDisPatch>();
    const { recipes, loading, totalPages } = useSelector((state: RootState) => state.recipe);

    useEffect(()=>{
        dispatch(fetchAllRecipess({ page, limit: 3 }));
    },[dispatch, page])

    const handleSavedRecipe = () =>{
        dispatch(fetchAllRecipess({ page, limit: 3 }));
        handleCloseForm();
    }

    const handleEditRecipe = (recipe: any) =>{
        dispatch(setSelectedRecipe(recipe))
        setShoeForm(true)
    }

    const handleAddClick = () =>{
        dispatch(setSelectedRecipe(null))
        setShoeForm(true)
    }
    const handleCloseForm = () =>{
        dispatch(setSelectedRecipe(null))
        setShoeForm(false)
    }

    const handleDelete = (recipeDelete : any)=>{
        showConfirmDialog(
           'Are you sure?',
            `${recipeDelete.title} Do you want to delete? `,
            'Yes, Delete it!' 
        ).then(async(result)=>{
            if(result.isConfirmed){
                try{
                     dispatch(deleteRecipeAction(recipeDelete._id));
                    showSuccessAlert('Deleted' ,`${recipeDelete.title} has been Deleted`)
                }catch(error){
                    console.error(error)
                    showErrorAlert('error', 'Failed to delete')
                }
            }
        })
    }

    return(
        <>
        {/* Background changed to Dark Blue (#001f3f or similar) */}
        <div className="bg-[#001529] p-6 rounded-xl shadow-2xl border border-gold/20">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700">
                    Recipes Management
                </h2>
                <button 
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg"
                    onClick={handleAddClick}>
                    <IoMdAdd className="text-xl"/> Add New Recipe
                </button>
            </div>

            {loading && <p className="text-yellow-500 animate-pulse">Loading recipes...</p>}
            
            <div className="w-full overflow-auto rounded-lg border border-yellow-900/30">
                <table className="w-full text-left text-sm text-gray-200 table-fixed min-w-[1000px]">
                    {/* Header with Darker Blue and Gold border bottom */}
                    <thead className="uppercase tracking-wider bg-[#000c17] text-yellow-500 border-b-2 border-yellow-600/50">
                        <tr>
                            <th className="py-4 px-4 w-[12%]">Title</th>
                            <th className="py-4 px-4 w-[8%]">Food</th>
                            <th className="py-4 px-4 w-[8%]">User</th>
                            <th className="py-4 px-4 w-[12%]">Ingredients</th>
                            <th className="py-4 px-4 w-[20%]">Steps</th>
                            <th className="py-4 px-4 w-[8%]">Ready In</th>
                            <th className="py-4 px-4 w-[8%]">Date</th>
                            <th className="py-4 px-4 w-[16%] text-center">Images</th>
                            <th className="py-4 px-4 w-[8%] text-center">Action</th> 
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-yellow-900/20">
                        {recipes.map((recipe, index)=>(
                            <tr key={index} className="bg-[#001f3f]/40 hover:bg-[#002b55] transition-colors">
                                <td className="py-4 px-4 font-medium text-white">{recipe.title}</td>
                                <td className="py-4 px-4">{recipe.food?.name}</td>
                                <td className="py-4 px-4 text-gray-400">{recipe.user?.name}</td>
                                <td className="py-4 px-4">
                                    <span className="line-clamp-2">
                                        {Array.isArray(recipe.ingredients) ? recipe.ingredients.join(", ") : recipe.ingredients}
                                    </span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="max-h-20 overflow-y-auto text-xs text-gray-400 italic">
                                        {recipe.step}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-yellow-500 font-semibold">{recipe.readyIn}</td>
                                <td className="py-4 px-4">{new Date(recipe.date).toLocaleDateString()}</td>
                                
                                <td className="py-4 px-4 flex gap-2 justify-center">
                                    {recipe.images && recipe.images.length > 0 ? (
                                        recipe.images.slice(0, 2).map((imageUrl, idx)=>(
                                            <img
                                                key={idx}
                                                src={imageUrl}
                                                alt="recipe"
                                                className="w-12 h-12 object-cover rounded border border-yellow-600/30 shadow-md">
                                            </img>
                                        ))
                                    ):(
                                        <span className="text-gray-600 text-xs italic">No Images</span>
                                    )}
                                </td>

                                <td className="py-4 px-4">
                                    <div className="flex justify-center gap-3">
                                        <button className="text-yellow-500 hover:text-yellow-300 transition-colors"
                                            onClick={()=> handleEditRecipe(recipe)}>
                                            <FaEdit size={18}/>
                                        </button>
                                        <button className="text-red-500 hover:text-red-400 transition-colors"
                                            onClick={()=> handleDelete(recipe)}>
                                            <FaTrash size={17}/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination with Gold styling */}
            <div className="flex justify-center items-center gap-6 mt-8">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={`px-4 py-2 rounded-md border-2 font-bold transition-all ${
                        page === 1
                        ? "border-gray-700 text-gray-600 cursor-not-allowed"
                        : "border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black shadow-[0_0_10px_rgba(202,138,4,0.2)]"
                    }`}
                >
                    PREV
                </button>

                <span className="text-gray-300 font-medium">
                    PAGE <span className="text-yellow-500 font-bold px-2 text-lg">{page}</span> OF {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={`px-4 py-2 rounded-md border-2 font-bold transition-all ${
                        page === totalPages
                        ? "border-gray-700 text-gray-600 cursor-not-allowed"
                        : "border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black shadow-[0_0_10px_rgba(202,138,4,0.2)]"
                    }`}
                >
                    NEXT
                </button>
            </div>
        </div>

        {showForm && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-[#001529] border-2 border-yellow-600 rounded-2xl max-w-2xl w-full shadow-[0_0_50px_rgba(234,179,8,0.1)]">
                    <RecipeForm onClose={handleCloseForm} onSave={handleSavedRecipe} />
                </div>
            </div>
        )}
        </>
    )
}