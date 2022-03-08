import Layout from '../../components/Layout'
import MapComponent from '../../components/Map'
import React, { useState } from 'react';
import axios from 'axios'
import { Channel } from '../../interfaces';

const ChannelsPage = (props) => {
  let mapboxKey = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN;
  return <Layout title={"Youtube Map: " + props.channel.channel_name}>
    <MapComponent className="h-full rounded" mapboxKey={mapboxKey} channel={props.channel} />
    
  </Layout>
}

export default ChannelsPage

export async function getServerSideProps(context) {
  let channel: Channel = undefined;
  await axios.get<Channel>('http://localhost:4000/channel/' + context.query.channel_id)
        .then(response => {
          channel = response.data
        });

  if (channel.channel_id === undefined) {
    await axios.post<Channel>('http://localhost:4000/channel' + context.query.channel_id,
    {
      channel_url: "https://www.youtube.com/channel/" + context.query.channel_id
    })
    .then(response => {
      channel = response.data
    });
  }
  console.log(channel);

  return {
    props: {
      channel: channel
    }, // will be passed to the page component as props
  }
}