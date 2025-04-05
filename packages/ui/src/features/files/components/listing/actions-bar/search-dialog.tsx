import {useEffect, useRef} from 'react'
import {Dialog} from '@/shadcn-components/ui/dialog'
import {Input} from '@/shadcn-components/ui/input'
import {t} from '@/utils/i18n'
import {SearchDialogContent} from './search-dialog-content'
import {SearchIcon} from '@/features/files/assets/search-icon'

interface SearchDialogProps {
	isOpen: boolean
	onClose: () => void
}

export function SearchDialog({isOpen, onClose}: SearchDialogProps) {
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isOpen) {
			// Focus the input when dialog opens
			inputRef.current?.focus()
		}
	}, [isOpen])

	return (
		<>
			<style jsx>{`
				@keyframes blink {
					0%, 100% { opacity: 1; }
					50% { opacity: 0; }
				}
			`}</style>
			<Dialog open={isOpen} onOpenChange={onClose}>
				<SearchDialogContent>
					<div className='flex w-[95vw] max-w-[750px] h-[467px] flex-col rounded-lg border border-white/10 bg-[#1B1A1F]'>
						{/* Search header */}
						<div className='flex items-center border-b border-white/10 px-4 py-3'>
							<SearchIcon className='h-5 w-5 text-white/50 mr-2' />
							<div className='h-6 w-[1px] bg-white animate-[blink_1s_step-end_infinite] -mr-[1px]' />
							<span className='text-lg font-medium text-white/50'>Search for files...</span>
						</div>
					</div>
				</SearchDialogContent>
			</Dialog>
		</>
	)
} 