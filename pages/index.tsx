import Layout from '../components/Layout'
import MapComponent from '../components/Map'

const IndexPage = () => {
  let mapboxKey = process.env.NEXT_PUBLIC_REACT_APP_MAPBOX_ACCESS_TOKEN;
  return <Layout title="Home | Next.js + TypeScript Example">
    <MapComponent className="h-full rounded" mapboxKey={mapboxKey} />
  </Layout>
}

export default IndexPage
