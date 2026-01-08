import React from 'react';

export default function Category() {
  return (
    <section className='py-16 px-6 md:px-20'>
      {/* Title Section */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className='text-3xl font-black text-white tracking-tight uppercase'>
          Welcome to <span className="text-[#fbbf24]">Our Kitchen</span>
        </h2>
        <div className="h-px flex-grow bg-white/10"></div>
      </div>


      <div className="max-w-3xl">
        <p className="text-gray-300 text-lg leading-relaxed">
          
        🍾 A Collection of Exquisite Drinks

        Indulge in a refined selection of luxurious drinks where elegance meets exceptional taste. Each recipe is thoughtfully crafted using premium ingredients, modern techniques and timeless delights to create satisfying and memorable drinks.
        </p>
       
       <p className="mt-4 text-[#fbbf24] font-medium italic">
          "Discover the best recipes and food experiences with us."
        </p>
      </div>
    </section>
  )
}