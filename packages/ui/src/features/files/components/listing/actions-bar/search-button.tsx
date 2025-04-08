import {useEffect, useRef, useState} from 'react'
import {SearchIcon} from '@/features/files/assets/search-icon'
import {cn} from '@/shadcn-lib/utils'
import {t} from '@/utils/i18n'
import {RiCloseCircleFill} from 'react-icons/ri'

interface SearchButtonProps {
	onSearch?: (query: string) => void
	onClearSearch?: () => void
	currentQuery?: string
}

export function SearchButton({onSearch, onClearSearch, currentQuery = ''}: SearchButtonProps) {	
	const [searchValue, setSearchValue] = useState(currentQuery)
	const [isExpanded, setIsExpanded] = useState(currentQuery.trim().length > 0)
	const inputRef = useRef<HTMLInputElement>(null)
	
	// Focus input when expanded
	useEffect(() => {
		if (isExpanded) {
			inputRef.current?.focus()
		}
	}, [isExpanded])

	const handleClose = () => {
		setIsExpanded(false);

		// Delay clearing the input and notifying the parent until after the close transition.
		setTimeout(() => {
			setSearchValue('');
			onClearSearch?.();
		}, 200); 
	}

	const handleBlur = () => {
		// Only close on blur if there's no search value
		if (!searchValue) {
			handleClose()
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') {
			handleClose()
		}
	}
	
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log('handleSearchChange called with:', e.target.value)
		const value = e.target.value
		setSearchValue(value)

		// Only execute a search if it's not an empty string
		if (value.trim()) {
			onSearch?.(value)
		} else {
			// Otherwise, close the search box for now (might try to keep search box open in future)
			handleClose()
		}
	}

	const handleSearchOpen = () => {
		setIsExpanded(true)
	}

	return (
		<div 
			className={cn(
				'group flex h-8 items-center justify-center rounded-md transition-all duration-200',
				isExpanded ? 'w-[200px]' : 'w-8'
			)}
		>
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
							onBlur={handleBlur}
							onFocus={() => setIsExpanded(true)}
							className='h-6 w-full border-0 bg-transparent p-0 text-12 text-white outline-none focus:outline-none focus:border-0 placeholder:text-white/50'
							placeholder={t('Search your files...')}
						/>
						{searchValue && (
							<button
								onMouseDown={(e) => {
									e.preventDefault()
									e.stopPropagation()
								}}
								onClick={handleClose}
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
						onClick={handleSearchOpen}
					>
						<SearchIcon className='h-4 w-4 text-white/50 group-hover:text-white' />
					</button>
				)}
			</div>
		</div>
	)
} 