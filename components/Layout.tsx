import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Channel } from '../interfaces'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Props = {
  children?: ReactNode
  title?: string
  channels?: Array<Channel>
  channel?: Channel
}

const Layout = ({ children, title = 'undefined', channels, channel }: Props) => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalChannel, setModalChannel] = React.useState<Channel>(undefined);

  const router = useRouter()

  const changeToChannel = (e) => {
    router.push({
      pathname: '/channel/' + e
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
        <header className='bg-white py-2 px-4 rounded drop-shadow-md flex flex-row'>
          <h1>
            {title}
          </h1>
          {channel !== undefined &&
            <span style={{ backgroundColor: `${channel.map_marker_hex_color}` }}
            className={`h-5 w-5 mt-0.5 mx-2 rounded-full cursor-pointer flex justify-center items-center text-white`}
            onClick={() => { setModalChannel(channel); setShowModal(true) }}>
            i
          </span>}
        </header>
        {channels !== undefined &&
          <div className='mt-1 max-h-40 bg-white py-2 px-4 rounded drop-shadow-md grid grid-cols-1 overflow-y-auto'>{
          channels.map((channel, channelIndex) => {
            return <div>
              {channelIndex !== 0 && <hr className="border-t-black-500 my-1" />}
              <div className='inline-flex' key={channelIndex}>
                <span style={{ backgroundColor: `${channel.map_marker_hex_color}` }}
                  className={`h-5 w-5 mt-1 mr-1 rounded-full cursor-pointer flex justify-center items-center text-white`}
                  onClick={() => { setModalChannel(channel); setShowModal(true) }}>
                  i
                </span>
                <span className='hover:bg-gray-200 px-1.5 duration-200 rounded-md cursor-pointer w-56 mr-4'
                  onClick={() => changeToChannel(channel.channel_id)}>{channel.channel_name}</span>
              </div>
            </div>
          })
        }</div>}
      </div>
    </div>
    {showModal ? (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {modalChannel.channel_name}
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative px-6 pt-6 flex-auto">
                <div className="text-sm rounded-full px-4 py-2 text-white m-1 inline-block" style={{ backgroundColor: `${modalChannel.map_marker_hex_color}` }}>
                  {"Videos last updated: " + modalChannel.last_updated.toLocaleDateString("en-US")
                  + " - " + modalChannel.last_updated.toLocaleTimeString("en-US")}
                </div>
                <div className="text-sm rounded-full px-4 py-2 text-white m-1 inline-block" style={{ backgroundColor: `${modalChannel.map_marker_hex_color}` }}>
                  {"Status: " + modalChannel.status}
                </div>
                <div className="text-sm rounded-full px-4 py-2 text-white m-1 inline-block" style={{ backgroundColor: `${modalChannel.map_marker_hex_color}` }}>
                  {modalChannel.videos_with_locations_count + " of " + modalChannel.video_count + " videos with location data"}
                </div>
              </div>
              <div className="relative p-6 flex-auto">
                <p className="h-48 overflow-auto text-slate-500 text-lg leading-relaxed">
                {modalChannel.channel_description.split("\\n").map(function(item) {
                    return (
                      <p>{item}</p>
                    )
                })}
                </p>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <Link href={`https://www.youtube.com/channel/${modalChannel.channel_id}`} passHref={true}>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Go to Channel
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null}
  </div>
}

export default Layout
