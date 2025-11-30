import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './pages/Home.jsx';
import PetsSupplies from './pages/PetsSupplies.jsx';
import MyOrders from './pages/MyOrders.jsx';
import MyListings from './pages/MyListings.jsx';
import AddListing from './pages/AddListing.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './contexts/PrivateRoute.jsx';
import ListingDetails from './pages/ListingDetails.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/pets-supplies",
        element: <PetsSupplies />,
        loader: () => fetch('http://localhost:3000/products')
      },
      {
        path: "/add-listing",
        element: <PrivateRoute>
            <AddListing />
          </PrivateRoute>
      },
      {
        path: "/my-listings",
        Component: MyListings
      },
      {
        path: "/listingDetails/:_id",
        element: <PrivateRoute>
          <ListingDetails/>
        </PrivateRoute>
      },
      {
        path: "/my-orders",
        Component: MyOrders
      },
      {
        path: "/login",
        Component: Login
      },
      {
        path: "/register",
        Component: Register
      },
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </AuthProvider>
  </StrictMode>
)
