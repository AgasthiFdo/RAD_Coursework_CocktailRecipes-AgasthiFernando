// type tabProps = {
//     label: string
//     active: boolean
//     onClick: () => void
// }

// export default function Tab({ label, active, onClick }: tabProps) {
//     return (
//         <button
//             onClick={onClick}
//             className={`
//                 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300
//                 ${active 
//                     ? "bg-[#fbbf24] text-[#0f172a] shadow-lg shadow-[#fbbf24]/20 scale-105" 
//                     : "bg-white/5 text-gray-500 hover:bg-white/10 hover:text-gray-300"
//                 }
//             `}
//         >
//             {label}
//         </button>
//     )
// }


type tabProps = {
    label: string
    active: boolean
    onClick: () => void
}

export default function Tab({ label, active, onClick }: tabProps) {
    return (
        <button
            onClick={onClick}
            className={`
                px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500
                relative overflow-hidden
                ${active 
                    ? "bg-gradient-to-r from-yellow-600 via-yellow-500 to-amber-600 text-black shadow-[0_0_20px_rgba(202,138,4,0.4)] scale-105 z-10" 
                    : "bg-[#001f3f]/40 text-gray-500 border border-yellow-900/20 hover:border-yellow-600/40 hover:text-yellow-500/80"
                }
            `}
        >
            
            {active && (
                <span className="absolute inset-0 bg-white/20 animate-pulse"></span>
            )}
            
            <span className="relative z-20">
                {label}
            </span>
        </button>
    )
}