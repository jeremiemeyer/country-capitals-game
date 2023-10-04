import "./App.css"
import CountryCapitalGame from "./components/CountryCapitalGame"

function App() {
  return (
    <>
      <div className="h-screen w-screen bg-slate-800">
        <div className="bg-slate-700 text-white font-semibold mx-auto text-5xl py-12">Country Capital Game</div>
        <CountryCapitalGame
          data={{
            Germany: "Berlin",
            Azerbaijan: "Baku",
            France: "Paris",
            Spain: "Madrid",
          }}
        />
      </div>
    </>
  )
}

export default App
