import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Channel } from '../interfaces'
import { useRouter } from 'next/router'

type Props = {
  children?: ReactNode
  title?: string
  channels?: Array<Channel>
}

const Layout = ({ children, title = 'undefined', channels }: Props) => {
  const router = useRouter()

  const changeToChannel = (e) => {
    router.push({
      pathname: '/channel/'+e
    }, 
    undefined, { shallow: true }
    )
  }

  return <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className='static h-full'>
      {children}
      <div className='absolute top-2 left-2'>
        <header className='bg-white py-2 px-4 rounded drop-shadow-md'>
          <h1>
            {title}
          </h1>
        </header>
        {channels !== undefined && <div className='mt-1 max-h-40 bg-white py-2 px-4 rounded drop-shadow-md grid grid-cols-1 overflow-y-auto'>{
          channels.map((channel, channelIndex) => {
            console.log(channel.map_marker_hex_color)
            return <div className='hover:bg-gray-200 px-1.5 duration-200 rounded-md cursor-pointer' onClick={() => changeToChannel(channel.channel_id)}>
              {channelIndex !== 0 && <hr className="border-t-black-500" />}
              <div className='inline-flex' key={channelIndex}>
                <span style={{ backgroundColor: `${channel.map_marker_hex_color}` }} className={`h-4 w-4 mt-1.5 mr-2 rounded-full`}></span>
                <span>{channel.channel_name}</span>
              </div>
            </div>
          })
        }</div>}
      </div>
    </div>
  </div>
}

export default Layout
