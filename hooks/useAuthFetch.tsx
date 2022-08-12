import axios from 'axios'
import { useEffect, useRef, useReducer } from 'react'
import { getError } from '../utils/error'

export const useAuthFetch = (url:any, token:any) => {
  const cache = useRef<any>({})

  const initialState = {
    status: 'idle',
    error: null,
    data: [],
  }

  const [state, dispatch] = useReducer((state: any, action: any) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...initialState, status: 'fetching' }
      case 'FETCHED':
        return { ...initialState, status: 'fetched', data: action.payload }
      case 'FETCH_ERROR':
        return { ...initialState, status: 'error', error: action.payload }
      default:
        return state
    }
  }, initialState)

  useEffect(() => {
    let cancelRequest = false
    if (!url || !url.trim()) return

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' })
      if (cache.current[url]) {
        const data = cache.current[url]
        dispatch({ type: 'FETCHED', payload: data })
      } else {
        try {
          const { data } = await axios.get(url, {
              headers: {
                  Authorization: token
              }
          })
          cache.current[url] = data
          if (cancelRequest) return
          dispatch({ type: 'FETCHED', payload: data })
        } catch (error) {
          if (cancelRequest) return
          dispatch({ type: 'FETCH_ERROR', payload: getError(error) })
        }
      }
    }

    fetchData()

    return function cleanup() {
      cancelRequest = true
    }
  }, [url])

  return state
}
