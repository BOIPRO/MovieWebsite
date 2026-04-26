"use client"
import { Epsiode } from '@/types/anilist'
import React from 'react'
interface Prop {
    listEpsiode : Epsiode[]
}
const ListEpsiodes = ({listEpsiode} : Prop) => {
  return (
    <div className='px-5 w-full bg-slate-900 py-2'>
        Danh sach tap
        <div className='grid grid-cols-12 max-h-[300px]  overflow-y-auto scrollbar-custom gap-3 text-center text-[16px]'>
            {listEpsiode.map((e:Epsiode) => (
                <div className='px-2 py-2 w-[75px] rounded-sm   bg-blue-700' key={e.number}>
                     {e.number}
                </div>
               
            ))}
        </div>
    </div>
  )
}

export default ListEpsiodes