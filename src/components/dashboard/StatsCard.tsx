
// type StatsCardProps ={
//     title: string
//     value: number
//     icon: string
// }

// export default function StatsCard({title, value, icon}: StatsCardProps) {

//     return(

//         <div className="p-6 bg-white/10 rounded-xl text-center shadow-md">
//             <div className="text-4xl mb-2">{icon}</div>
//             <h3 className="text-lg font-medium">{title}</h3>
//             <p className="text-2xl font-bold mt-1">{value}</p>
//         </div>
        
//     )
// }


type StatsCardProps = {
    title: string
    value: number
    icon: string
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
    return (
        <div className="group relative p-6 bg-gradient-to-br from-[#001f3f] to-[#001529] rounded-2xl border border-yellow-600/20 shadow-xl transition-all duration-300 hover:scale-105 hover:border-yellow-600/50 hover:shadow-[0_0_30px_rgba(202,138,4,0.15)] overflow-hidden">
            
            
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-yellow-600/10 rounded-full blur-2xl group-hover:bg-yellow-600/20 transition-all"></div>

            <div className="relative z-10">
                
                <div className="text-4xl mb-3 inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/30 border border-yellow-600/10 group-hover:border-yellow-600/40 transition-all">
                    {icon}
                </div>

                <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest group-hover:text-yellow-500/80 transition-colors">
                    {title}
                </h3>

                <p className="text-4xl font-black mt-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700">
                    {value.toLocaleString()}
                </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-600/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
        </div>
    )
}