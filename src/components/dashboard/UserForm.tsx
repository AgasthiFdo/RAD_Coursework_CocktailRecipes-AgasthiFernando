// import { useEffect, useState } from 'react'
// import ReactDOM from 'react-dom'
// import { createUser } from '../../services/UserAPI'
// import { showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts'


// interface User{
//     _id:string
//     name:string
//     email:string
//     password:string
//     role:string
    
// }
// interface FormData{
//     name:string
//     email:string
//     password:string
//     role:string
    
// }
// interface UserFormProps{
//   onClose:() => void
//   onSave: (user: User) => void
// }
// export const  UserForm:React.FC<UserFormProps>=({onClose, onSave})=> {

//   const[formdata, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     password:'',
//     role:''
    
//   })
  
//   const[loading, setLoading] =useState(false)
//   const[error, setError] = useState<string | null> (null)

//   useEffect(()=>{
//     setFormData({
//       name: '',
//       email:'',
//       password:'',
//       role:''
//     })
    
//   },[])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
//     e.preventDefault()
//     const {name, value} = e.target
//         setFormData((prevData)=>({
//             ...prevData,
//             [name] : value
//         }))
//   }
 
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
//     e.preventDefault()
//     if(
//       !formdata.name||
//       !formdata.email||
//       !formdata.password||
//       !formdata.role
//     ){
//       setError("Fill All Fields")
//       return
//     }
//     setError(null)

//     const payload = {
//       name : formdata.name,
//       email: formdata.email,
//       password: formdata.password,
//       role: formdata.role

//     }
//     setLoading(true)

    


//     try{
//       const response = await createUser(payload)
//       showSuccessAlert('Success','User Successfully Added')
//       onSave(response.data.data.user)
//       onClose()
//     }catch(error: any){
//       setLoading(false)
//         let errorMessage = 'Faild to add food. Please try again.';
//           if (error.response?.data?.message) {
//               errorMessage = typeof error.response.data.message === 'object'
//                 ? JSON.stringify(error.response.data.message)
//                 : String(error.response.data.message);
//           }
//           setError(errorMessage);
//           showErrorAlert('Food Add Failed', errorMessage);
//           console.error(' error:', error);  
//     }
//   }
//   return ReactDOM.createPortal (
//     <div>
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-start z-50 overflow-y-auto p-6 transition-opacity duration-300">
//         <div className="relative bg-gradient-to-br from-[#2a2416]/90 via-[#1a1a1a]/95 to-black/95 border border-yellow-600/30 text-white p-8 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] w-full max-w-md my-auto">
//         <h2 className="text-2xl font-bold text-center mb-6 border-b border-gray-700 pb-2">
//         Add User
//         </h2>

//         <form onSubmit={handleSubmit}  className="space-y-4">

//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Name</label>
//             <input
//               name="name"
//               value={formdata.name}
//               onChange={handleChange}
//               placeholder="Enter name"
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"/>
//           </div>

//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Email</label>
//             <input
//               name="email"
//              type="email"
//              value={formdata.email}
//              onChange={handleChange}
//               placeholder="Enter Email"
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
//             />
//           </div>


//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Password</label>
//             <input
//               name="password"
//              type="password"
//              value={formdata.password}
//              onChange={handleChange}
//               placeholder="Enter Password"
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"/>
//           </div>
//           <div className="flex flex-col space-y-1">
//             <label className="text-gray-300 text-sm">Role</label>
//             <select
//               name="role"
//               id="role"
//               value={formdata.role}
//               onChange={handleChange}
//               className="w-full px-3 py-2 rounded-lg bg-black/60 border border-yellow-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none"
//             >
//                <option value="">-- Select Role --</option>
//                 <option value="User">User</option>
//                 <option value="Admin">Admin</option>

//             </select>
//             </div>
          
 
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
//                 {loading ? 'Saving...': "Save"}
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
    
//     </div>,
//     document.body
//   )
// }
// export default UserForm



import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { createUser } from '../../services/UserAPI'
import { showErrorAlert, showSuccessAlert } from '../../utils/SweetAlerts'

// ... (Interfaces remain the same)

export const UserForm: React.FC<UserFormProps> = ({ onClose, onSave }) => {
  const [formdata, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setFormData({ name: '', email: '', password: '', role: '' })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formdata.name || !formdata.email || !formdata.password || !formdata.role) {
      setError("Please fill all required fields.")
      return
    }
    setError(null)
    setLoading(true)

    try {
      const response = await createUser(formdata)
      showSuccessAlert('Success', 'User Successfully Added')
      onSave(response.data.data.user)
      onClose()
    } catch (error: any) {
      setLoading(false)
      let errorMessage = error.response?.data?.message || 'Failed to add user.';
      setError(errorMessage);
      showErrorAlert('Error', errorMessage);
    }
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-[#000c17]/80 backdrop-blur-md flex justify-center items-center z-[100] p-4">
      <div className="relative bg-[#001529] border border-yellow-600/30 text-white p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-md transform transition-all">
        
        {/* Header with Gradient */}
        <h2 className="text-2xl font-black text-center mb-8 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700">
          Add New User
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="flex flex-col space-y-1">
            <label className="text-yellow-600/80 text-[10px] font-bold uppercase tracking-widest ml-1">Full Name</label>
            <input
              name="name"
              value={formdata.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-yellow-900/30 text-white placeholder-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col space-y-1">
            <label className="text-yellow-600/80 text-[10px] font-bold uppercase tracking-widest ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              value={formdata.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-yellow-900/30 text-white placeholder-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col space-y-1">
            <label className="text-yellow-600/80 text-[10px] font-bold uppercase tracking-widest ml-1">Security Password</label>
            <input
              name="password"
              type="password"
              value={formdata.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-yellow-900/30 text-white placeholder-gray-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all"
            />
          </div>

          {/* Role Field */}
          <div className="flex flex-col space-y-1">
            <label className="text-yellow-600/80 text-[10px] font-bold uppercase tracking-widest ml-1">User Role</label>
            <select
              name="role"
              value={formdata.role}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-yellow-900/30 text-white focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none transition-all appearance-none"
            >
              <option value="" className="bg-[#001529]">Select Role</option>
              <option value="User" className="bg-[#001529]">Standard User</option>
              <option value="Admin" className="bg-[#001529]">Administrator</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center animate-shake">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-transparent border border-gray-700 text-gray-400 font-bold hover:bg-white/5 transition-all uppercase text-xs tracking-widest"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-500 text-black font-black hover:scale-105 shadow-lg shadow-yellow-600/20 transition-all uppercase text-xs tracking-widest"
            >
              {loading ? 'Processing...' : 'Save User'}
            </button>
          </div>
        </form>

        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-500 hover:text-yellow-500 transition-colors"
        >
          <span className="text-xl">✕</span>
        </button>
      </div>
    </div>,
    document.body
  )
}
export default UserForm