// import React, { useEffect, useState } from 'react'
// import ReactDOM from 'react-dom'
// import { showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts';
// import { getAllFoods } from '../../services/FoodAPI';
// import {  useDispatch, useSelector } from 'react-redux';
// import type {  AppDisPatch, RootState } from '../../redux/store';
// import { addRecipeAction, updateRecipeAction } from '../../redux/slices/recipeSlice';
// import type { AxiosError } from 'axios';


// // interface User {
// //   _id: string;
// //   name: string;
// // }

// interface Food {
//   _id: string;
//   name: string;
// }
// // interface RecipeItem{
// //     _id: string
// //     user: User
// //     food: Food
// //     title:string
// //     ingredients: string
// //     step: string
// //     readyIn : string
// //     date: Date
// //     images?: string[]

// // }
// interface FormData{
//     food: string
//     title:string
//     ingredients: string
//     step: string
//     readyIn : string
 
   
// }
// interface RecipeFormProps{
//     onClose: () => void
//     onSave: () => void
// }
// interface ApiErrorResponse {
//   message: string;
// }
// export  const RecipeForm: React.FC<RecipeFormProps> =({onClose, onSave}) =>{
// const dispatch = useDispatch<AppDisPatch>()
//     const {selectedRecipe,selectedMyRecipe, loading} = useSelector((state:RootState)=> state.recipe)
//     const [formdata, setFormdata] = useState<FormData>({
//         food: selectedRecipe?.food._id || selectedMyRecipe?.food._id || '' ,
//         title: selectedRecipe?.title || selectedMyRecipe?.title ||'',
//         ingredients: selectedRecipe?.ingredients ||  selectedMyRecipe?.ingredients ||'',
//         step: selectedRecipe?.step || selectedMyRecipe?.step ||'',
//         readyIn: selectedRecipe?.readyIn || selectedMyRecipe?.readyIn ||''
    

//     })
//     const [files, setFiles] = useState<FileList | null>(null)
//     const [existingImageUrls, setExsitingImageUrls] = useState<string[]>(selectedRecipe?.images || [])
    
//     const[error, setError] = useState<string | null> (null)
//     const [foods, setFoods] = useState<Food[]>([])
//     const { user } = useSelector((state: RootState) => state.auth);
    


//     useEffect (()=>{

//         if(selectedRecipe){
//           setFormdata({
//             food: selectedRecipe.food._id ,
//             title: selectedRecipe.title,
//             ingredients: selectedRecipe.ingredients ,
//             step: selectedRecipe.step ,
//             readyIn: selectedRecipe.readyIn 
//           })
//           setExsitingImageUrls(selectedRecipe.images || [])
//         }else if(selectedMyRecipe) {
//           setFormdata({
//             food: selectedMyRecipe.food._id ,
//             title: selectedMyRecipe.title,
//             ingredients: selectedMyRecipe.ingredients ,
//             step: selectedMyRecipe.step ,
//             readyIn: selectedMyRecipe.readyIn 
//           })
//           setExsitingImageUrls(selectedMyRecipe.images || [])
//         }else{
//           setFormdata({
//           food: '',
//           title: '',
//           ingredients: '',
//           step: '',
//           readyIn: ''
//           })
//           setExsitingImageUrls([])
//         }
//         const loadFoods = async () =>{
//             try{
//                 const res = await getAllFoods()
//                 setFoods(res.data.data.foods)
//             }catch(error){
//                 console.error(error)
//             }
//         }
//         loadFoods()
        
//     },[selectedRecipe, selectedMyRecipe])

//     const handleChange = (
//         e : React.ChangeEvent<HTMLInputElement |  HTMLTextAreaElement | HTMLSelectElement >
//       )=>{
//         const {name, value} = e.target
//         setFormdata((prevData)=>({
//             ...prevData,
//             [name] : value
//         }))
//     }

//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
//         if(e.target.files){
//             setFiles(e.target.files)
//         }
//     }

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
//         e.preventDefault()

//         if(
//             !formdata.food ||
//             !formdata.title ||
//             !formdata.ingredients ||
//             !formdata.step ||
//             !formdata.readyIn
          
//         ){
//             setError("Fill All Fields")
//             return
//         }
//         if (existingImageUrls.length === 0 && (!files || files.length === 0)) {
//             setError("Please add at least one image");
//             return;
//         }
//         const totalImage = existingImageUrls.length + (files ? files.length : 0)
//             if(totalImage > 5){
//                 setError("You can only upload 5 Images")
//                 return
//         }
//         setError(null)
       

//         const data = new FormData()
//         data.append('user', user?._id || "")
//         data.append('food', formdata.food)
//         data.append('title', formdata.title)
//         // const ingredientsArray = formdata.ingredients.split(",").map(i => i.trim())
//         data.append('ingredients', formdata.ingredients)
//         data.append('step', formdata.step)
//         data.append('readyIn', formdata.readyIn)
      

//         if(files){
//             for(let i= 0; i < files.length; i++){
//                 data.append('images', files[i])
//             }
//         }

//         try{
           
//             if(selectedRecipe){
//                 await dispatch(updateRecipeAction({id:selectedRecipe._id, data})).unwrap()
//                 showSuccessAlert('Success','Recipe Successfully Updated')
//               }else if(selectedMyRecipe){
//                 await dispatch(updateRecipeAction({id: selectedMyRecipe._id! , data})).unwrap()
//                 showSuccessAlert('Success','Your Recipe Successfully Updated')
//               }else{
//                 await dispatch(addRecipeAction(data)).unwrap()
//                 showSuccessAlert('Success','Recipe Successfully Added')
//               }
//               onSave()
          
//               onClose()
            
//         }catch(error){
//           const err = error as AxiosError<ApiErrorResponse>;
//                 const errorMessage = typeof err === 'string' ? err:'Faild to add Recipe. Please try again.';
                      
//                       setError(errorMessage);
//                       showErrorAlert('Recipe Add Failed', errorMessage);
//                       console.error(' error:', error);
          
//               }
//     }

//     const formTitle = selectedRecipe ? "Edit Recipe" : "Add Recipe"
//     const saveButtonText = selectedRecipe ? "Update" : "Save"

//   return ReactDOM.createPortal (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
//         <div className="relative bg-gradient-to-br from-[#2a2416]/90 via-[#1a1a1a]/95 to-black/95 border border-yellow-600/30 text-white p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] w-full max-w-md my-auto">
//         <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
//           {formTitle}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">

//             <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Food</label>
//             <select
//               name="food"
//               id="food"
//               value={formdata.food}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
//             >
//                <option value="">-- Select Food --</option>
//                 {foods.map((item)=>(
//                     <option key={item._id} value={item._id}>
//                         {item.name}
//                     </option>
//                 ))}

//             </select>
//             </div>
          

//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Recipe Title</label>
//             <input
//               name="title"
//                 value={formdata.title}
//               onChange={handleChange}
//               placeholder="Enter name"
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
//             />
//           </div>

//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Ingredients</label>
//             <input
//               name="ingredients"
//               value={formdata.ingredients}
//               onChange={handleChange}
//               placeholder="Enter Ingredients"
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
//             />
//           </div>

//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Steps</label>
//             <textarea
//               name="step"
//               value={formdata.step}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
//             />
//           </div>

//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Ready In</label>
//             <input
//               name="readyIn"
//               value={formdata.readyIn}
//               onChange={handleChange}
//               placeholder="Enter Ready In"
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
//             />
//           </div>
 
//           {existingImageUrls.length > 0 &&(
//              <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Current Images</label>
//             <div className="flex flex-wrap gap-2 p-2 bg-black/50 rounded-lg border border-yellow-600/20">
//               {existingImageUrls.map((url, index) => (
//                 <img
//                   key={index}
//                   src={url}
//                   alt={`Existing food ${index + 1}`}
//                   className="w-20 h-20 object-cover rounded-md"
//                 />
//               ))}
//             </div>
//             <p className="text-xs text-gray-400">
//               You can add more images below.
//             </p>
//           </div> 
//           )}

//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Images</label>
//             <input
//               name="images"
//               type="file"
//               onChange={handleFileChange}
//               multiple
//               accept='image/png, image/jpeg, image/webp'
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
//             />
//           </div> 
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-sm text-red-800">{error}</p>
//                 </div>
//               </div>
//             </div>
//           )}

          

          

//           <div className="flex justify-end space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//                 disabled={loading}
//               className="px-4 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-gray-300 hover:bg-black/80 transition"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//                 disabled={loading}
//               className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold hover:from-yellow-400 hover:to-amber-500 shadow-lg transition"
//             >
//                 {loading ? 'Saving...': saveButtonText}
//             </button>
//           </div>
//         </form>

//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
//         >
//           ✕
//         </button>
//       </div>
//     </div>,
//     document.body
//   )
// }



import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts';
import { getAllFoods } from '../../services/FoodAPI';
import {  useDispatch, useSelector } from 'react-redux';
import type {  AppDisPatch, RootState } from '../../redux/store';
import { addRecipeAction, updateRecipeAction } from '../../redux/slices/recipeSlice';
import type { AxiosError } from 'axios';

// ... (Interfaces remain the same)

export const RecipeForm: React.FC<RecipeFormProps> =({onClose, onSave}) =>{
    const dispatch = useDispatch<AppDisPatch>()
    const {selectedRecipe,selectedMyRecipe, loading} = useSelector((state:RootState)=> state.recipe)
    const [formdata, setFormdata] = useState<FormData>({
        food: selectedRecipe?.food._id || selectedMyRecipe?.food._id || '' ,
        title: selectedRecipe?.title || selectedMyRecipe?.title ||'',
        ingredients: selectedRecipe?.ingredients ||  selectedMyRecipe?.ingredients ||'',
        step: selectedRecipe?.step || selectedMyRecipe?.step ||'',
        readyIn: selectedRecipe?.readyIn || selectedMyRecipe?.readyIn ||''
    })

    const [files, setFiles] = useState<FileList | null>(null)
    const [existingImageUrls, setExsitingImageUrls] = useState<string[]>(selectedRecipe?.images || [])
    const [error, setError] = useState<string | null> (null)
    const [foods, setFoods] = useState<Food[]>([])
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect (()=>{
        // ... (useEffect logic remains the same)
        const loadFoods = async () =>{
            try{
                const res = await getAllFoods()
                setFoods(res.data.data.foods)
            }catch(error){
                console.error(error)
            }
        }
        loadFoods()
    },[selectedRecipe, selectedMyRecipe])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement >)=>{
        const {name, value} = e.target
        setFormdata((prevData)=>({ ...prevData, [name] : value }))
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.files){ setFiles(e.target.files) }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        // ... (Validation logic remains the same)
        
        const data = new FormData()
        data.append('user', user?._id || "")
        data.append('food', formdata.food)
        data.append('title', formdata.title)
        data.append('ingredients', formdata.ingredients)
        data.append('step', formdata.step)
        data.append('readyIn', formdata.readyIn)

        if(files){
            for(let i= 0; i < files.length; i++){ data.append('images', files[i]) }
        }

        try{
            if(selectedRecipe){
                await dispatch(updateRecipeAction({id:selectedRecipe._id, data})).unwrap()
                showSuccessAlert('Success','Recipe Successfully Updated')
            }else if(selectedMyRecipe){
                await dispatch(updateRecipeAction({id: selectedMyRecipe._id! , data})).unwrap()
                showSuccessAlert('Success','Your Recipe Successfully Updated')
            }else{
                await dispatch(addRecipeAction(data)).unwrap()
                showSuccessAlert('Success','Recipe Successfully Added')
            }
            onSave(); onClose();
        }catch(error){
            const err = error as AxiosError<ApiErrorResponse>;
            const errorMessage = typeof err === 'string' ? err:'Failed to process recipe.';
            setError(errorMessage);
            showErrorAlert('Error', errorMessage);
        }
    }

    const formTitle = selectedRecipe ? "Edit Recipe" : "Add New Recipe"
    const saveButtonText = selectedRecipe ? "Update Recipe" : "Save Recipe"

    return ReactDOM.createPortal (
        <div className="fixed inset-0 bg-[#000c17]/90 backdrop-blur-md flex justify-center items-center z-50 overflow-y-auto p-4 transition-all duration-500">
            <div className="relative bg-gradient-to-b from-[#001f3f] to-[#001529] border border-yellow-600/40 text-white p-8 rounded-3xl shadow-[0_0_50px_rgba(202,138,4,0.15)] w-full max-w-lg my-auto transform transition-all">
                
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-yellow-500 transition-colors">
                    <span className="text-2xl">✕</span>
                </button>

                <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700">
                    {formTitle}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Food Selection */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest ml-1">Category</label>
                        <select
                            name="food"
                            value={formdata.food}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-[#000c17] border border-yellow-900/50 text-gray-200 focus:ring-2 focus:ring-yellow-600 focus:border-transparent outline-none transition-all cursor-pointer shadow-inner"
                        >
                            <option value="" className="bg-[#001f3f]">-- Select Food Type --</option>
                            {foods.map((item)=>(
                                <option key={item._id} value={item._id} className="bg-[#001f3f]">{item.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Title */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest ml-1">Recipe Title</label>
                        <input
                            name="title"
                            value={formdata.title}
                            onChange={handleChange}
                            placeholder="e.g. Spicy Chicken Curry"
                            className="w-full px-4 py-3 rounded-xl bg-[#000c17] border border-yellow-900/50 text-white placeholder-gray-600 focus:ring-2 focus:ring-yellow-600 outline-none transition-all shadow-inner"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Ready In */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest ml-1">Cooking Time</label>
                            <input
                                name="readyIn"
                                value={formdata.readyIn}
                                onChange={handleChange}
                                placeholder="30 Mins"
                                className="w-full px-4 py-3 rounded-xl bg-[#000c17] border border-yellow-900/50 text-white focus:ring-2 focus:ring-yellow-600 outline-none shadow-inner"
                            />
                        </div>
                        {/* Image Upload */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest ml-1">Upload Images</label>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                multiple
                                accept='image/*'
                                className="w-full px-3 py-2 text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-yellow-600 file:text-black hover:file:bg-yellow-500 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Ingredients */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest ml-1">Ingredients</label>
                        <textarea
                            name="ingredients"
                            rows={2}
                            value={formdata.ingredients}
                            onChange={handleChange}
                            placeholder="Salt, Pepper, Chicken..."
                            className="w-full px-4 py-3 rounded-xl bg-[#000c17] border border-yellow-900/50 text-white focus:ring-2 focus:ring-yellow-600 outline-none shadow-inner"
                        />
                    </div>

                    {/* Steps */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-yellow-500/80 text-xs font-bold uppercase tracking-widest ml-1">Preparation Steps</label>
                        <textarea
                            name="step"
                            rows={3}
                            value={formdata.step}
                            onChange={handleChange}
                            placeholder="Step 1: Clean the chicken..."
                            className="w-full px-4 py-3 rounded-xl bg-[#000c17] border border-yellow-900/50 text-white focus:ring-2 focus:ring-yellow-600 outline-none shadow-inner"
                        />
                    </div>

                    {/* Current Images Preview */}
                    {existingImageUrls.length > 0 &&(
                        <div className="p-3 bg-black/40 rounded-xl border border-yellow-900/20">
                            <label className="text-[10px] text-yellow-600 font-bold uppercase mb-2 block">Current Photos</label>
                            <div className="flex flex-wrap gap-2">
                                {existingImageUrls.map((url, index) => (
                                    <img key={index} src={url} alt="current" className="w-12 h-12 object-cover rounded-lg border border-yellow-600/30" />
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-3 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-xs text-center">
                            {error}
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 rounded-xl border border-yellow-600/30 text-yellow-500 font-bold hover:bg-yellow-600/10 transition-all uppercase tracking-widest text-sm"
                        >
                            Discard
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(202,138,4,0.3)]"
                        >
                            {loading ? 'Processing...' : saveButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    )
}