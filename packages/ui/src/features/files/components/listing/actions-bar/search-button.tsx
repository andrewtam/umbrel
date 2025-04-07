import {useEffect, useRef, useState} from 'react'
import {SearchIcon} from '@/features/files/assets/search-icon'
import {cn} from '@/shadcn-lib/utils'
import {t} from '@/utils/i18n'
import {RiCloseCircleFill} from 'react-icons/ri'
import {useFileSearch} from '@/features/files/hooks/use-file-search'

export function SearchButton({currentPath = '/'}: {currentPath?: string}) {
	const [isExpanded, setIsExpanded] = useState(false)
	const [searchValue, setSearchValue] = useState('')
	const inputRef = useRef<HTMLInputElement>(null)
	
	// Only destructure public functions
	const { search, clearSearch } = useFileSearch(currentPath)

	useEffect(() => {
		if (isExpanded) {
			inputRef.current?.focus()
		} else {
			clearSearch()
		}
	}, [isExpanded, clearSearch])

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') {
			setIsExpanded(false)
			setSearchValue('')
		}
	}
	
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSearchValue(value)
		search(value)
	}
	
	const handleClearSearch = () => {
		setSearchValue('')
		clearSearch()
		setIsExpanded(false)
	}

	return (
		<div className={cn(
			'group flex h-8 items-center justify-center rounded-md transition-all duration-200',
			isExpanded ? 'w-[200px]' : 'w-8'
		)}>
			<div className={cn(
				'flex h-8 items-center justify-center rounded-md',
				!isExpanded && 'hover:border-[0.5px] hover:border-white/6 hover:bg-white/6 hover:px-0.5 hover:py-0 hover:shadow-button-highlight-soft-hpx hover:ring-white/6',
				isExpanded ? 'w-full border-[0.5px] border-white/6 bg-white/6 px-0.5 py-0 shadow-button-highlight-soft-hpx ring-white/6' : 'w-8'
			)}>
				{isExpanded ? (
					<div className='flex w-full items-center px-2'>
						<SearchIcon className='h-4 w-4 text-white/50 mr-2 shrink-0' />
						<input
							ref={inputRef}
							type="text"
							value={searchValue}
							onChange={handleSearchChange}
							onKeyDown={handleKeyDown}
							onBlur={() => {
								setIsExpanded(false)
								setSearchValue('')
							}}
							className='h-6 w-full border-0 bg-transparent p-0 text-12 text-white outline-none focus:outline-none focus:border-0 placeholder:text-white/50'
							placeholder={t('Search your files...')}
						/>
						{searchValue && (
							<button
								onMouseDown={(e) => e.preventDefault()}
								onClick={handleClearSearch}
								className='ml-2 rounded-full opacity-30 outline-none ring-white/60 transition-opacity hover:opacity-40 active:opacity-100 focus-visible:opacity-40 focus-visible:ring-2'
								aria-label={t('clear')}
							>
								<RiCloseCircleFill className='h-4 w-4' />
							</button>
						)}
					</div>
				) : (
					<button
						className='flex h-8 w-8 items-center justify-center'
						aria-label={t('files-search.open')}
						onClick={() => setIsExpanded(true)}
					>
						<SearchIcon className='h-4 w-4 text-white/50 group-hover:text-white' />
					</button>
				)}
			</div>
		</div>
	)
} 