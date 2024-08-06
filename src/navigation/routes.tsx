import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Search } from "../pages/Search"
import { Detail } from "../pages/Detail"
import { RentRequest } from "../pages/RentRequest"

export const RoutesNavigation = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/search/:serviceType/:code' element={ <Search /> } />
        <Route path='/detail/:code' element={ <Detail /> } />
        <Route path='/rent-request' element={ <RentRequest /> } />

        <Route path='/*' element={ <Home /> } />
    </Routes>
  )
}
