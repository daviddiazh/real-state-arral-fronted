import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home"
import { Search } from "../pages/Search"

export const RoutesNavigation = () => {
  return (
    <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/search/:serviceType/:code' element={ <Search /> } />

        <Route path='/*' element={ <Home /> } />
    </Routes>
  )
}
