//scss files
import './assets/css/bootstrap.min.css'
import './assets/css/typography.css'
import './assets/css/style.css';
import './assets/css/responsive.css'
import ShowTvseries from "./components/ListFilm/ShowTvSeries";
import Home from "./pages/home/home";
import TvSeries from "./components/ListFilm/TvSeries";

function App() {
  return (
      <div className="App">
        <ShowTvseries />
      </div>
  );
}
export default App;
