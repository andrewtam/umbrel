import {useState} from 'react'
import {SearchIcon} from '@/features/files/assets/search-icon'
import {cn} from '@/shadcn-lib/utils'
import {t} from '@/utils/i18n'
import {SearchDialog} from './search-dialog'

export function SearchButton() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	return (
		<>
			<button
				className={cn(
					'group flex h-8 w-8 items-center justify-center rounded-md hover:border-[0.5px] hover:border-white/6 hover:bg-white/6 hover:px-0.5 hover:py-0 hover:shadow-button-highlight-soft-hpx hover:ring-white/6',
				)}
				aria-label={t('files-search.open')}
				onClick={() => setIsDialogOpen(true)}
			>
				<SearchIcon className='h-4 w-4 text-white/50 group-hover:text-white' />
			</button>
			<SearchDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
		</>
	)
} 