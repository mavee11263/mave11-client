import { Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { SearchIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'

function NavSearch():ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [search_query, setSearchQuery] = useState<string>('')
    const history = useRouter()

    const search_handler = () => {
        // history.push('/explore')
        // dispatch({ type: 'SET_SEARCH_QUERY', payload: search_query })
    }

    return (
        <>

            <div onClick={onOpen} className="flex p-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer rounded-full">
                <SearchIcon height={20} width={20} className="text-gray-700 dark:text-gray-200" />
            </div>

            <Modal isOpen={isOpen} onClose={onClose} size={'lg'}>
                <ModalOverlay />
                <ModalContent className='dark:bg-gray-700 bg-white'>
                    <ModalBody className='dark:bg-gray-700 bg-white' rounded={'md'}>
                        <div className="flex flex-row items-center bg-white dark:bg-gray-700 rounded">
                            <input
                                type="text"
                                onChange={e => setSearchQuery(e.target.value)}
                                className='md:p-4 p-2 rounded outline-none border-none w-full dark:bg-gray-700'
                                placeholder='Search name or category' />
                            <div onClick={search_handler} className='cursor-pointer'>
                                <SearchIcon height={20} width={20} className="text-gray-500" />
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default NavSearch