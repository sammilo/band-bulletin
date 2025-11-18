import { useRoutes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ViewEvents from './pages/ViewEvents'
import AddEvent from './pages/AddEvent'
import EditEvent from './pages/EditEvent'
import DetailEvent from './pages/DetailEvent'
import './App.css';

const App = () => {
  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ViewEvents />
    },
    {
      path:"/edit/:id",
      element: <EditEvent />
    },
    {
      path:"/view/:id",
      element: <DetailEvent />
    },
    {
      path:"/new",
      element: <AddEvent />
    }
  ]);

  return ( 

    <div className="App">

      <div className="header">
        <h1>The Bands' Bulletin</h1>
        <Link to="/"><button className="viewBtn"> 🎶 View Events </button></Link>
        <Link to="/new"><button className="addBtn">🎵 Add Event </button></Link>
      </div>
        {element}
    </div>

  )
}

export default App