import React, { useEffect, useReducer } from 'react'
import SearchBar from './components/SearchBar'
import Item from './components/Item'
import Test from './components/Test'
import Grid from '@material-ui/core/Grid'

const BASE_URL = 'http://localhost:8080/users/v1/fetchUsers'

// Initial State
const initialState = {
  isLoading: true,
  data: [],
  search: '',
  searchData: [],
}

// reducer for storing data
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      }
    case 'SEARCH_INPUT':
      return { ...state, search: action.payload }
    case 'SEARCH_DATA':
      return { ...state, searchData: action.payload }
    default:
      throw new Error()
  }
}

// The Component
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Async Fetch
  const fetchData = async url => {
    try {
      const res = await fetch(url)
      const data = await res.json()
      dispatch({ type: 'SET_DATA', payload: data.data })
    } catch (err) {
      console.log('Error:', err)
    }
  }

  useEffect(() => {
    fetchData(BASE_URL)
  }, [])

  // Search handle Function
  const handleInput = e => {
    let str = e.target.value
    dispatch({ type: 'SEARCH_INPUT', payload: str })
    const newArr = state.data
      .filter(
        item =>
          item.name.toLowerCase().includes(str.toLowerCase()) || item.email.toLowerCase().includes(str.toLowerCase()) ||
          item.phone.toLowerCase().includes(str.toLowerCase()) || item.username.toLowerCase().includes(str.toLowerCase())
          || item.website.toLowerCase().includes(str.toLowerCase()) || item.address.city.toLowerCase().includes(str.toLowerCase()) || item.address.zipcode.toLowerCase().includes(str.toLowerCase()) || item.address.suite.toLowerCase().includes(str.toLowerCase()) || item.address.street.toLowerCase().includes(str.toLowerCase())
          || item.company.name.toLowerCase().includes(str.toLowerCase())
      )
      .map(item => {
        let newName = item.name.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        let newEmail = item.email.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        let newPhone = item.phone.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        let newUsername = item.username.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )

        let newWebsite = item.website.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )

        let newCity = item.address.city.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        let newZip = item.address.zipcode.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        let newStreet = item.address.street.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        let newSuite = item.address.suite.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )

        let newCompanyName = item.company.name.replace(
          new RegExp(str, 'gi'),
          match =>
            `<mark style="background: #2769AA; color: white;">${match}</mark>`
        )
        return {
          ...item,
          name: newName,
          email: newEmail,
          phone: newPhone,
          username: newUsername,
          website: newWebsite,
          city: newCity,
          zipcode: newZip,
          street: newStreet,
          suite: newSuite,
          companyName: newCompanyName
        }
      })

    dispatch({ type: 'SEARCH_DATA', payload: newArr })
  }

  // Returning results
  return (
    <Grid container>
      <Grid container item xs={12} alignItems="center">
        <Grid item xs={10}>
          <SearchBar onInput={e => handleInput(e)} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {state.isLoading ? (
          <Test />
        ) : state.search.length > 0 ? (
          state.searchData.map(user => (
            <Item
              key={user.id}
              name={user.name}
              email={user.email}
              username={user.username}
              phone={user.phone}
              website={user.website}
              city={user.address.city}
              zipcode={user.address.zipcode}
              suite={user.address.suite}
              street={user.address.street}
              companyName={user.company.name}
            />
          ))
        ) : (
          state.data.map(user => (
            <Item
              key={user.id}
              name={user.name}
              email={user.email}
              username={user.username}
              phone={user.phone}
              website={user.website}
              city={user.address.city}
              suite={user.address.suite}
              street={user.address.street}
              zipcode={user.address.zipcode}
              companyName={user.company.name}
            />
          ))
        )}
      </Grid>
    </Grid>
  )
}

export default App
