// import { useEffect, useState } from "react"
// import { getTotalStatusAndCompire } from "../../services/RecipeAPI"
// import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// const COLORS = ["#fbbf24", "#d97706", "#475569"];

// export default function DashboardPieChart() {
//     const [data, setData] = useState<any[]>([])

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const response = await getTotalStatusAndCompire()
//                 setData(response.data.statusData)
//             } catch (error) {
//                 console.error(error)
//             }
//         }
//         loadData()

//         const interval = setInterval(() => {
//             loadData()
//         }, 5000)
//         return () => clearInterval(interval)
//     }, [])

//     return (
//         <div className="bg-[#1e293b]/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 shadow-2xl h-[400px] w-full">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-black text-white uppercase tracking-tight">
//                     Status <span className="text-[#fbbf24]">Analysis</span>
//                 </h2>
//                 <div className="bg-white/5 p-2 rounded-lg">
//                     <div className="w-4 h-4 rounded-full border-2 border-[#fbbf24] border-t-transparent animate-spin"></div>
//                 </div>
//             </div>

//             <div style={{ width: '100%', height: '280px' }}>
//                 <ResponsiveContainer>
//                     <PieChart>
//                         <Pie
//                             data={data}
//                             dataKey="value"
//                             nameKey="name"
//                             cx="50%"
//                             cy="50%"
//                             innerRadius={60}
//                             outerRadius={90}
//                             paddingAngle={8}
//                             isAnimationActive={true}
//                             stroke="none"
//                         >
//                             {data.map((_, index) => (
//                                 <Cell 
//                                     key={`cell-${index}`} 
//                                     fill={COLORS[index % COLORS.length]} 
//                                     className="filter drop-shadow-lg transition-all duration-300"
//                                 />
//                             ))}
//                         </Pie>
//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: '#0f172a',
//                                 border: '1px solid rgba(255,255,255,0.1)',
//                                 borderRadius: '12px',
//                                 fontSize: '12px',
//                                 fontWeight: 'bold'
//                             }}
//                             itemStyle={{ color: '#fff' }}
//                         />
//                         <Legend 
//                             verticalAlign="bottom" 
//                             height={36}
//                             formatter={(value) => (
//                                 <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-2">
//                                     {value}
//                                 </span>
//                             )}
//                         />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     )
// }


import { useEffect, useState } from "react"
import { getTotalStatusAndCompire } from "../../services/RecipeAPI"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Royal Gold & Navy Palette
const COLORS = ["#facc15", "#ca8a04", "#854d0e", "#422006"];

export default function DashboardPieChart() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await getTotalStatusAndCompire()
                setData(response.data.statusData)
            } catch (error) {
                console.error(error)
            }
        }
        loadData()

        const interval = setInterval(() => {
            loadData()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="bg-[#001529] p-8 rounded-[2rem] border border-yellow-600/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] h-[400px] w-full transition-all">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-widest">
                        Status <span className="opacity-80">Analysis</span>
                    </h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">Distribution Summary</p>
                </div>
                
                {/* Custom Loading/Sync Indicator */}
                <div className="bg-black/30 p-2.5 rounded-xl border border-yellow-600/10">
                    <div className="w-4 h-4 rounded-full border-2 border-yellow-600 border-t-transparent animate-spin"></div>
                </div>
            </div>

            <div style={{ width: '100%', height: '260px' }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70} // මදක් විශාල කළා Donut Look එක සඳහා
                            outerRadius={100}
                            paddingAngle={8}
                            isAnimationActive={true}
                            stroke="none"
                        >
                            {data.map((_, index) => (
                                <Cell 
                                    key={`cell-${index}`} 
                                    fill={COLORS[index % COLORS.length]} 
                                    className="hover:opacity-80 transition-opacity cursor-pointer shadow-2xl"
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#000c17',
                                border: '1px solid rgba(202,138,4,0.3)',
                                borderRadius: '15px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                padding: '12px'
                            }}
                            itemStyle={{ color: '#eab308', fontWeight: 'bold', fontSize: '13px' }}
                        />
                        <Legend 
                            verticalAlign="bottom" 
                            align="center"
                            iconType="circle"
                            formatter={(value) => (
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2 hover:text-yellow-500 transition-colors">
                                    {value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}