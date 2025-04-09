import {Listing} from '@/features/files/components/listing'
import {useListRecents} from '@/features/files/hooks/use-list-recents'
import {useFileSearch} from '@/features/files/hooks/use-file-search'

export function RecentsListing() {
	const {listing, isLoading, error} = useListRecents()
	const items = listing || []

	// Add search functionality
	const {search, clearSearch, isSearching, results, query} = useFileSearch('Recents')

	// Determine which items to show based on search state
	const displayItems = query.trim() ? (results?.items || []) : items

	return (
		<Listing
			items={displayItems}
			selectableItems={displayItems}
			isLoading={isLoading || isSearching}
			error={error}
			totalItems={displayItems.length} // we only track 50 max recents, so no need to paginate
			enableFileDrop={false}
			onSearch={search}
			onClearSearch={clearSearch}
			searchQuery={query}
		/>
	)
}
