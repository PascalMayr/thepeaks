import ListHeader from '../components/listHeader'
import { Result } from '../types'

export async function getServerSideProps() {
  return {
    props: {},
  }
}

interface HomeProps {
  results: {
    top: Result[]
    sport: Result[]
  }
}

const Home: React.FC<HomeProps> = () => (
  <>
    <ListHeader title="Top Stories" />
  </>
)

export default Home
