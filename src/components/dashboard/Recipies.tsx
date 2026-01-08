// export default function Recipies() {
//     return(
//         <div className="text-center text-gray-300 py-10">
//             Recipies tab content here... 📋
//         </div>
//     )
// }


export default function Recipes() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] bg-[#001529]/50 rounded-2xl border border-yellow-600/10 backdrop-blur-sm p-10">
          
            <div className="mb-6 p-4 rounded-full bg-yellow-600/10 border border-yellow-600/20 shadow-[0_0_30px_rgba(202,138,4,0.1)]">
                <span className="text-5xl">📋</span>
            </div>
            
          
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-widest">
                Recipes Content
            </h2>
            
           
            <p className="text-gray-400 text-sm font-medium italic">
                Manage your culinary collection in style...
            </p>

           
            <div className="mt-6 w-24 h-[2px] bg-gradient-to-r from-transparent via-yellow-600 to-transparent"></div>
        </div>
    )
}