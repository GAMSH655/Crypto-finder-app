import { useState  , useDeferredValue, useEffect} from 'react'
import './App.css'
import { FaSearch } from 'react-icons/fa'
import axios from "axios"
function App() {
  const [search, setSearch] = useState("")
  const [currency , setCurrency] = useState([])

  useEffect(()=>{
      axios.get('https://openapiv1.coinstats.app/coins', {
        headers: {'X-API-KEY': 'ATnK4W+6Woo1KCGcL1B351KeZrj2UUIJpB4hhzQmgVo='}
      }).then(res=>setCurrency(res.data.result))
      .catch(error => console.log(error))
  }, [])
 
   return (

     <div>
       <h3 className="headerText">crypto price finder app</h3>
       <div className="inputDiv">
        <FaSearch  className='search'/>
        <input type="text"  onChange={(e)=>setSearch(e.target.value)} />
       </div>

              <table>
              <thead>
                <tr>
                  <th>rank</th>
                  <th>name</th>
                  <th>symbol</th>
                  <th>market cap</th>
                  <th>price</th>
                  <th>available supply</th>
                  <th>volume(24hr)</th>
                </tr>
              </thead>

              <tbody>
                {
                  currency.filter((val)=>{
                     return val.name.toLowerCase().includes(search.toLowerCase())
                  }).map((values)=>{
                      return  <tr>
                      <td>{values.rank}</td>
                      <td>
                        <a href={values.websiteUrl}>
                         <img src={values.icon} alt=""  className='cryptImg'/>
                         </a>
                         <p className='cryptP'>{values.name}</p>
                      </td>
                      <td>{values.symbol}</td>
                      <td>${values.marketCap}</td>
                      <td>${values.price.toFixed(2)}</td>
                      <td>${values.availableSupply}</td>
                      <td>${values.volume.toFixed()}</td>
                   </tr>
                  })
                }
              </tbody>
            </table>
    
            {/* {currency.filter((value)=>{
                  return value.name.toLowercase().includes(search.toLowerCase())
                }).map((val)=>{
                  return <tr>
                     <td>{val.rank}</td>
                     <td>
                       <a href={val.websiteUrl}>
                        <img src={val.icon} alt="" />
                        </a>
                        <p>{val.name}</p>
                     </td>
                     <td>{val.symbol}</td>
                     <td>${val.marketcap}</td>
                     <td>${val.price.toFixed(2)}</td>
                     <td>${val.availableSupply}</td>
                     <td>${val.volume.toFixed()}</td>
                  </tr>
                })} */}
     </div>
  )
}

export default App
