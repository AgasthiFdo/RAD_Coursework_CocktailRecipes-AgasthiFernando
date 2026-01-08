// import { useEffect, useState } from "react"
// import { deleteUser, getAllUsers } from "../../services/UserAPI"
// import { showConfirmDialog, showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts"
// import { IoMdAdd } from "react-icons/io";
// import { FaTrash } from 'react-icons/fa'
// import { UserForm } from "./UserForm";




// interface UserItem{
//         _id:string
//         name:string
//         email: string
//         image:string
//     }

// export default function User(){

//     const [page, setPage] = useState(1)
//     const [totalPages, settotalPages] = useState(1)
//     const [users,setUsers] = useState<UserItem[]>([])
//     const [showForm,setShowForm] = useState(false)

//     useEffect(()=>{
//         const fetchUsers = async () =>{
//             try{
//                 const response = await getAllUsers(page, 3)
//                 setUsers(response.data.data.users)
//                 settotalPages(response.data.totalPages )
//             }catch(error){
//                 console.error(error)
//                 showErrorAlert('error', "Can not load data")
//             }
//         }
//         fetchUsers()
//     },[page])

//     const handleAddClick = () =>{
//         setShowForm(true)
//     }

//     const handleDelete = (userDelete : UserItem) =>{
//         showConfirmDialog(
//             'Are you sure?',
//             `${userDelete.name} Do you want to delete? `,
//             'Yes, Delete id!'
//         ).then(async(result)=>{
//             if(result.isConfirmed){
//                 try{
//                     await deleteUser(userDelete._id)
//                     setUsers(prevUsers =>
//                         prevUsers.filter(user => user._id !== userDelete._id)
//                     )

//                     showSuccessAlert('Deleted' ,`${userDelete.name} has been Deleted`)
//                 }catch(error){
//                     console.error(error)
//                     showErrorAlert('error', 'Faild to delete')
//                 }
//             }
//         })
//     }

//     const handleCloseForm = ()=>{
//         setShowForm(false)
//     }  
//     const handleSavedUser = () =>{
//         // if(savedUser._id){
//         //     setUsers(prevUsers => prevUsers.map(user=>
//         //         user._id === savedUser._id ? savedUser : user
//         //     ))
//         // }else{
//         //     setUsers(prevUsers =>[
//         //        ...prevUsers,
//         //        {...savedUser, _id: savedUser._id || Date.now().toString()}
//         //     ])
//         // }
//     }
    
//     return(
//         <>
//             <div className="bg-white/10 p-6 rounded-lg backdrop-blur-md">
//             <h2 className="text-2xl font-bold mb-4 text-white">User</h2>
//                 <div className='flex justify-end mb-4'>
//                     <button className='flex items-center gap-1 text-green-400 hover:text-green-600 font-medium'
//                     onClick={handleAddClick}
//                     >
//                         Add User<IoMdAdd className='text-lg'/>
//                     </button>
//                 </div>
//                 <div className='w-full overflow-x-auto'>
//                     <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[1000px]">
//                         <thead className="uppercase tracking-wider  bg-black/70 backdrop-blur-md border-b border-white/20">
//                             <tr>
//                                 <th className='py-2 px-4 '>User Name</th>
//                                 <th className='py-2 px-4 '>Email</th>
//                                 <th className="py-2 px-4 text-center">Image</th>
//                                 <th className="py-2 px-4 text-center ">Action</th>
                                
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user, index)=>(
//                                 <tr key={index} className="border-b border-gray-800 hover:bg-black/25">
//                                     <td className='py-2 px-4'>{user.name}</td>
//                                     <td className='py-2 px-4'>{user.email}</td>
                                   

//                                     <td className="py-2 px-4 flex gap-2 justify-center">
//                                         {user.image  ? (
                                            
//                                             <img
                                                
//                                                 src={user.image}
//                                                 alt={user.name}
//                                                 className="w-16 h-16 object-cover rounded-md"
//                                             />
                                            
//                                         ) : (
//                                             <span>No Image</span>
//                                         )}
//                                     </td>
                                    
//                                     <td className='py-2 px-4'>
                                        
//                                         <button className='text-red-400 hover:text-red-600 mx-2'
//                                         onClick={()=>handleDelete(user)}>
//                                             <FaTrash/>
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>

//                 <div className="flex justify-center items-center gap-4 mt-10">
//                     <button
//                     disabled={page === 1}
//                     onClick={() => setPage((p) => Math.max(1, p - 1))}
//                     className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
//                         page === 1
//                         ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                         : "text-gray-700 border-gray-300 hover:bg-gray-100"
//                     }`}
//                     >
//                     Prev
//                     </button>

//                     <span className="text-gray-600 text-sm">
//                     Page <span className="font-semibold">{page}</span> of{" "}
//                     <span className="font-semibold">{totalPages}</span>
//                     </span>

//                     <button
//                     disabled={page === totalPages}
//                     onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                     className={`px-5 py-2 rounded-lg border text-sm font-medium transition ${
//                         page === totalPages
//                         ? "text-gray-400 border-gray-200 cursor-not-allowed"
//                         : "text-gray-700 border-gray-300 hover:bg-gray-100"
//                     }`}
//                     >
//                     Next
//                     </button>
//                 </div>
            
                
//             </div>
//             {showForm &&(
//                     <UserForm
//                     onClose={handleCloseForm}
//                     onSave={handleSavedUser}
                   
//                     />
//                 )}
//         </>
//     )
// }


import { useEffect, useState } from "react"
import { deleteUser, getAllUsers } from "../../services/UserAPI"
import { showConfirmDialog, showErrorAlert, showSuccessAlert } from "../../utils/SweetAlerts"
import { IoMdAdd } from "react-icons/io";
import { FaTrash } from 'react-icons/fa'
import { UserForm } from "./UserForm";

// ... (Interface remains the same)

export default function User(){
    const [page, setPage] = useState(1)
    const [totalPages, settotalPages] = useState(1)
    const [users,setUsers] = useState<UserItem[]>([])
    const [showForm,setShowForm] = useState(false)

    useEffect(()=>{
        const fetchUsers = async () =>{
            try{
                const response = await getAllUsers(page, 3)
                setUsers(response.data.data.users)
                settotalPages(response.data.totalPages )
            }catch(error){
                console.error(error)
                showErrorAlert('Error', "Could not load user data")
            }
        }
        fetchUsers()
    },[page])

    const handleAddClick = () => setShowForm(true)
    const handleCloseForm = () => setShowForm(false)
    const handleSavedUser = () => { /* Logic to refresh data if needed */ }

    const handleDelete = (userDelete : UserItem) =>{
        showConfirmDialog(
            'Are you sure?',
            `Do you want to delete ${userDelete.name}?`,
            'Yes, Delete User'
        ).then(async(result)=>{
            if(result.isConfirmed){
                try{
                    await deleteUser(userDelete._id)
                    setUsers(prevUsers => prevUsers.filter(user => user._id !== userDelete._id))
                    showSuccessAlert('Deleted' ,`${userDelete.name} has been removed.`)
                }catch(error){
                    showErrorAlert('Error', 'Failed to delete user')
                }
            }
        })
    }
    
    return(
        <>
            <div className="bg-[#001529] p-8 rounded-2xl shadow-2xl border border-yellow-600/20 shadow-[0_0_50px_rgba(0,0,0,0.4)] transition-all">
                
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-widest">
                        User Management
                    </h2>
                    
                    <button 
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-500 text-black font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-yellow-600/20 uppercase text-xs tracking-tighter"
                        onClick={handleAddClick}
                    >
                        Add New User <IoMdAdd className="text-xl"/>
                    </button>
                </div>

                <div className="w-full overflow-x-auto rounded-xl border border-yellow-900/30">
                    <table className="w-full text-left text-sm text-gray-300 table-fixed min-w-[900px]">
                        <thead className="uppercase tracking-widest bg-[#000c17] text-yellow-500/80 border-b border-yellow-600/50">
                            <tr>
                                <th className="py-5 px-6 w-[25%] font-black">User Profile</th>
                                <th className="py-5 px-6 w-[35%] font-black">Email Address</th>
                                <th className="py-5 px-6 w-[20%] text-center font-black">Avatar</th>
                                <th className="py-5 px-6 w-[15%] text-center font-black">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow-900/10">
                            {users.map((user, index)=>(
                                <tr key={index} className="bg-[#001f3f]/30 hover:bg-[#002b55] transition-all group">
                                    <td className="py-4 px-6 font-semibold text-white text-base">
                                        {user.name}
                                    </td>
                                    <td className="py-4 px-6 text-gray-400 font-medium italic">
                                        {user.email}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex justify-center">
                                            {user.image ? (
                                                <div className="p-1 rounded-full border-2 border-yellow-600/30 group-hover:border-yellow-500 transition-all">
                                                    <img
                                                        src={user.image}
                                                        alt={user.name}
                                                        className="w-12 h-12 object-cover rounded-full"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-yellow-900/20 flex items-center justify-center text-[10px] text-yellow-600 border border-yellow-600/20 uppercase font-bold">
                                                    No Img
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <button 
                                            className="p-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all transform hover:rotate-12"
                                            onClick={() => handleDelete(user)}
                                        >
                                            <FaTrash size={18}/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-8 mt-12">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className={`px-8 py-2 rounded-full border-2 font-black transition-all text-xs tracking-widest ${
                            page === 1
                            ? "border-gray-800 text-gray-700 cursor-not-allowed"
                            : "border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black"
                        }`}
                    >
                        BACK
                    </button>

                    <span className="text-gray-500 font-bold uppercase text-[10px] tracking-widest">
                        Page <span className="text-yellow-500 text-lg mx-1">{page}</span> / {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className={`px-8 py-2 rounded-full border-2 font-black transition-all text-xs tracking-widest ${
                            page === totalPages
                            ? "border-gray-800 text-gray-700 cursor-not-allowed"
                            : "border-yellow-600 text-yellow-500 hover:bg-yellow-600 hover:text-black"
                        }`}
                    >
                        NEXT
                    </button>
                </div>
            </div>

            {showForm && (
                <UserForm onClose={handleCloseForm} onSave={handleSavedUser} />
            )}
        </>
    )
}