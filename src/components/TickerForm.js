import React from 'react'

export default function TickerForm({searchParams, setStockData, setSearchParams}) {

    async function callAPI () {

        const {ticker, multiplyer, timeUnit, startDate, endDate, apiKey} = searchParams
        try{
          const res = await fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${multiplyer}/hour/2023-01-09/2023-01-09?adjusted=true&sort=asc&limit=50000&apiKey=${apiKey}`)
          const data = await res.json()
          setStockData(data.results)
          console.log(data)
        } catch(err){
          console.log(err);
        }
      }

      const searchStock = (e) => {
        e.preventDefault()

        callAPI()
      }

      const modifySearchParams = (e) => {

        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value.toUpperCase() //Maybe find a different way to do this
        })

        console.log(searchParams)
      }
    

  return (
    <form onSubmit={searchStock}>
        <input type="text" name="ticker" autoCapitalize='words' onChange={modifySearchParams}/>
        <button type="submit">Search</button>
    </form>
  )
}