import React from 'react'
import Card from './Card'
import Image from 'next/image'
export default function Friends(props) {
  return (
    <>
    <Card>
            <div className='w-full h-full flex p-3 border-2 rounded-md'>
                <div className='h-full mr-5'>
                    <Image src={props?.avatar} height={60} width={60} alt=' friends image' className='rounded-full'></Image>
                </div>
                <div>
                    <h2>{props?.name}</h2>
                    <p>5 mutual friends</p>
                </div>
            </div>
        </Card>
    </>
  )
}
