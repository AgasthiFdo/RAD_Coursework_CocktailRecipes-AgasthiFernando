// import { useEffect, useState } from "react"
// import { getRecipeGrowth } from "../../services/RecipeAPI"
// import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// export default function DashboardLineChart() {
//     const [data, setData] = useState<any[]>([])

//     useEffect(() => {
//         const loadData = async () => {
//             try {
//                 const res = await getRecipeGrowth()
//                 setData(res.data.data)
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
//         <div className="bg-[#1e293b]/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-2xl">
//             <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-xl font-black text-white uppercase tracking-tight">
//                     Recipe <span className="text-[#fbbf24]">Growth</span>
//                 </h2>
//                 <div className="flex items-center gap-2">
//                     <span className="relative flex h-3 w-3">
//                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fbbf24] opacity-75"></span>
//                         <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fbbf24]"></span>
//                     </span>
//                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Live Updates</span>
//                 </div>
//             </div>

//             <ResponsiveContainer width="100%" height={280}>
//                 <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                     <defs>
//                         <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
//                             <stop offset="0%" stopColor="#fbbf24" />
//                             <stop offset="100%" stopColor="#d97706" />
//                         </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//                     <XAxis 
//                         dataKey="day" 
//                         stroke="rgba(255,255,255,0.3)" 
//                         axisLine={false}
//                         tickLine={false}
//                         tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 'bold' }}
//                         dy={10}
//                     />
//                     <YAxis 
//                         stroke="rgba(255,255,255,0.3)" 
//                         axisLine={false}
//                         tickLine={false}
//                         tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
//                     />
//                     <Tooltip 
//                         contentStyle={{ 
//                             backgroundColor: '#0f172a', 
//                             border: '1px solid rgba(255,255,255,0.1)',
//                             borderRadius: '12px',
//                             color: '#fff'
//                         }}
//                         itemStyle={{ color: '#fbbf24', fontWeight: 'bold' }}
//                     />
//                     <Line
//                         type="monotone"
//                         dataKey="recipes"
//                         stroke="url(#lineGradient)"
//                         strokeWidth={4}
//                         dot={{ r: 6, fill: '#0f172a', stroke: '#fbbf24', strokeWidth: 2 }}
//                         activeDot={{ r: 8, fill: '#fbbf24', stroke: '#fff', strokeWidth: 2 }}
//                         animationDuration={1500}
//                     />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     )
// }

import { useEffect, useState } from "react"
import { getRecipeGrowth } from "../../services/RecipeAPI"
import { CartesianGrid, Line, Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function DashboardLineChart() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getRecipeGrowth()
                setData(res.data.data)
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
        <div className="bg-[#001529] rounded-[2rem] p-8 border border-yellow-600/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] transition-all">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-widest">
                        Recipe <span className="opacity-80">Growth</span>
                    </h2>
                    <p className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase mt-1">Analytics Overview</p>
                </div>
                
                <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-full border border-yellow-600/10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                    </span>
                    <span className="text-[10px] font-black text-yellow-600/80 uppercase tracking-widest">Live Monitoring</span>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                {/* මම මේක AreaChart එකක් බවට පත් කළා යටින් ලස්සන Glow එකක් එන්න */}
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        {/* Area එක පිරවීමට භාවිතා කරන Gradient එක */}
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ca8a04" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ca8a04" stopOpacity={0} />
                        </linearGradient>
                        {/* Line එකේ Stroke එක සඳහා Gold Gradient එක */}
                        <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="50%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#a16207" />
                        </linearGradient>
                    </defs>
                    
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(202,138,4,0.05)" vertical={false} />
                    
                    <XAxis 
                        dataKey="day" 
                        stroke="#4b5563" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: '900' }}
                        dy={15}
                    />
                    
                    <YAxis 
                        stroke="#4b5563" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                    />
                    
                    <Tooltip 
                        cursor={{ stroke: '#ca8a04', strokeWidth: 1 }}
                        contentStyle={{ 
                            backgroundColor: '#000c17', 
                            border: '1px solid rgba(202,138,4,0.3)',
                            borderRadius: '15px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            padding: '12px'
                        }}
                        itemStyle={{ color: '#eab308', fontWeight: 'bold', fontSize: '14px' }}
                        labelStyle={{ color: '#6b7280', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}
                    />

                    <Area
                        type="monotone"
                        dataKey="recipes"
                        stroke="url(#lineStroke)"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#chartGradient)"
                        activeDot={{ r: 8, fill: '#facc15', stroke: '#000', strokeWidth: 3 }}
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}