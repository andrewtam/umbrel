import {useSearchParams} from 'react-router-dom'

import {Listing} from '@/features/files/components/listing'
import {ITEMS_PER_PAGE} from '@/features/files/constants'
import {useListDirectory} from '@/features/files/hooks/use-list-directory'
import {useNavigate} from '@/features/files/hooks/use-navigate'
import {useFileSearch} from '@/features/files/hooks/use-file-search'

export function AppsListing() {
	const [searchParams] = useSearchParams()
	const currentPage = parseInt(searchParams.get('page') || '1')
	const {currentPath} = useNavigate()

	const {listing, isLoading, error} = useListDirectory(currentPath, {
		start: (currentPage - 1) * ITEMS_PER_PAGE,
		count: ITEMS_PER_PAGE,
	})

	// Add search functionality
	const {search, clearSearch, isSearching, results, query} = useFileSearch(currentPath)

	// Determine which items to show based on search state
	const displayItems = query.trim() ? (results?.items || []) : (listing?.items || [])

	return (
		<Listing
			items={displayItems}
			selectableItems={displayItems}
			isLoading={isLoading || isSearching}
			error={error}
			totalItems={query.trim() ? displayItems.length : (listing?.total ?? 0)}
			enableFileDrop={false}
			onSearch={search}
			onClearSearch={clearSearch}
			searchQuery={query}
		/>
	)
}
