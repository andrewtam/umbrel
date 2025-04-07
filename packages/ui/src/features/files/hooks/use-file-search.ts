import {useCallback, useState, useEffect} from 'react'
import type {FileSystemItem} from '@/features/files/types'

// Could add stuff like the query and path later on to display on scren.
interface SearchResult {
  items: FileSystemItem[]
}

/**
 * Hook for searching in the file system. Will update / refine once the actual API
 * endpoint is established. 
 */
export function useFileSearch(currentPath: string, debounceTime = 300) {
  const [query, setQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<SearchResult | null>(null)
  const [searchError, setSearchError] = useState<Error | null>(null)
  
  // Used Claude to generate this mock API response - replace with real API functionality eventually.
  const searchFiles = useCallback(async (query: string): Promise<SearchResult> => {
    // Simulated API delay
    await new Promise(resolve => setTimeout(resolve, 200))
    
    // This would be a real API call in the future
    // Example: const data = await trpcReact.files.search.query({ query, path: currentPath })
    
    // For now, return mock data to simulate the API
    console.log(`MOCK API: Searching for "${query}" in ${currentPath}`)
    
    // Create mock items that match the search query
    const fileName = `${query}-document.txt`
    const folderName = `${query}-folder`
    const imageName = `${query}-photo.jpg`
    
    const mockItems: FileSystemItem[] = [
      {
        name: fileName,
        path: `${currentPath}/${fileName}`,
        type: 'file',
        size: 1024, // 1KB file
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
      } as FileSystemItem,
      
      {
        name: folderName,
        path: `${currentPath}/${folderName}`,
        type: 'directory',
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
      } as FileSystemItem,
      
      {
        name: imageName,
        path: `${currentPath}/${imageName}`,
        type: 'image/jpeg',
        size: 2048000, // 2MB image
        created: new Date().toISOString(),
        modified: new Date().toISOString(),
      } as FileSystemItem
    ]
    
    return { items: mockItems }
  }, [currentPath])
  
  /**
   * Handle debounced search.
   */
  useEffect(() => {
  // If there's no query, clear results right away
    if (!query.trim()) {
      setResults(null)
      return
    }

    setIsSearching(true)
    setSearchError(null)

    // Set up a debounced call
    const handle = setTimeout(async () => {
      try {
        const searchResult = await searchFiles(query)
        setResults(searchResult)
      } catch (error) {
        console.error('Search failed:', error)
        setSearchError(error instanceof Error ? error : new Error('Search failed'))
      } finally {
        setIsSearching(false)
      }
    }, debounceTime)

    // Cleanup if query or debounceTime changes
    return () => {
      clearTimeout(handle)
    }
  }, [query, debounceTime, searchFiles])

 /**
  * Public method for initiating a new search.
  * We simply set the query, and the effect above handles debouncing.
  */
 const search = useCallback((q: string) => {
   setQuery(q)
 }, [])

 /**
  * Clear the current search (and any pending debounced calls).
  */
 const clearSearch = useCallback(() => {
   setQuery('')
   setResults(null)
   setSearchError(null)
   setIsSearching(false)
 }, [])

 return {
   search,
   clearSearch,
   isSearching,
   results,
   searchError,
   query,
 }
}