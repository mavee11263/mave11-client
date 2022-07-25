import React, { ReactElement, useState } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Divider,
    DrawerFooter,
    DrawerHeader,
    Avatar
} from "@chakra-ui/react"
import { MenuIcon, ChevronRightIcon, ArrowLeftIcon } from '@heroicons/react/outline'
import {UserCircleIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'
import { data } from '../../utils/data'
// import logo from '../../public/img/full_logo.png'
import Image from 'next/image'
import Username from '../Username/Username'

interface Props {
    user?: any
}

function MobileNavDrawers({ user }: Props): ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show_category, setShowCotegory] = useState(false)
    const history = useRouter()

    return (
        <>
            <div onClick={onOpen}>
                <MenuIcon height={20} width={20} className="text-gray-700" />
            </div>
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader bg={'white'}>

                        {/* <p className="text-lg font-semibold text-gray-700 uppercase mx-auto text-center my-4">logo</p> */}
                        <div className="flex py-2 text-black font-extrabold font-myriad-pro">
                            {/* <Image height={20} objectFit="contain" src={logo} alt="logo for mobile drawer"/> */}
                            logo
                        </div>
                    </DrawerHeader>
                    {
                        show_category ? (
                            <DrawerBody bg={'white'} p={0}>
                                <Divider />
                                <div className="flex flex-row items-center py-4 bg-white px-4 gap-8">
                                    <Avatar size="sm" name={user?.name} />
                                    {
                                        user ? (
                                            <Username username={user?.name} />
                                        ) : (
                                            <Username username={'Guest User'} />
                                        )
                                    }
                                </div>
                                <Divider />
                                <div className="flex flex-row items-center">
                                    <span onClick={() => setShowCotegory(false)} className='ml-2'>
                                        <ArrowLeftIcon height={20} width={20} />
                                    </span>
                                    <p className='font-semibold capitalize text-center my-4 text-gray-700 mx-auto '>a list of categories</p>
                                </div>
                                <div className="px-4">

                                    {
                                        data?.categories.map((category, index) => (
                                            <div key={index} className="flex flex-row items-center gap-2 py-2 px-4 cursor-pointer justify-between text-sm hover:bg-gray-100">
                                                <div onClick={() => console.log(category.name)} className="flex flex-row items-center">
                                                    {/* <div className="relative mr-2    h-6 w-6">
                                                    <Image src={category.icon} layout="fill" alt={category.name} />
                                                    </div> */}
                                                    <p className='capitalize'>{category.name}</p>
                                                </div>
                                                <ChevronRightIcon height={16} width={16} className='text-gray-400' />
                                            </div>
                                        ))
                                    }

                                </div>

                            </DrawerBody>
                        ) : (
                            <DrawerBody bg={'gray.200'} p={0}>
                                <Divider />
                                <div className="flex flex-row items-center py-4 bg-white mt-4 space-x-2 px-4 mb-4">
                                    <Avatar size="sm" name={user?.name} />
                                    {
                                        user ? (
                                            <Username username={user?.name} />
                                        ) : (
                                            <Username username={'Guest User'} />
                                        )
                                    }
                                </div>
                                <Divider />
                                {
                                    user?.role === 'seller' ? (
                                        <div onClick={() => history.push('/dashboard')} className="capitalize text-gray-700 py-4 text-sm bg-white px-4 font-semibold flex flex-row items-center justify-between">
                                            <p>Sell on trolliey</p>
                                            <ChevronRightIcon height={20} width={20} />
                                        </div>
                                    ) : (
                                        <div onClick={() => history.push('/become-a-seller')} className="capitalize text-gray-700 py-4 text-sm bg-white px-4 font-semibold flex flex-row items-center justify-between">
                                            <p>Sell on trolliey</p>
                                            <ChevronRightIcon height={20} width={20} />
                                        </div>
                                    )
                                }
                                <Divider />
                                <div onClick={() => history.push('/explore')} className="capitalize text-gray-700 py-4 bg-white px-4 text-sm font-semibold flex flex-row items-center justify-between">
                                    <p>explore products</p>
                                    <ChevronRightIcon height={20} width={20} />
                                </div>
                                <Divider />
                                <div onClick={() => setShowCotegory(true)} className="capitalize text-gray-700 py-4 bg-white px-4 text-sm font-semibold flex flex-row items-center justify-between">
                                    <p>shop by categories</p>
                                    <ChevronRightIcon height={20} width={20} />
                                </div>
                                <Divider />
                               
                                <div onClick={() => history.push('/help')} className="capitalize text-gray-700 py-4 bg-white px-4 text-sm font-semibold flex flex-row items-center justify-between">
                                    <p>Help</p>
                                    <ChevronRightIcon height={20} width={20} />
                                </div>
                                <Divider />

                                <Divider />
                            </DrawerBody>
                        )
                    }
                    <Divider />
                    <DrawerFooter width={'full'} borderTopColor={'gray.200'}>
                        <div className="flex flex-row items-center justify-between">
                            <div className='flex flex-row items-center border border-gray-300 rounded-full'>
                                <UserCircleIcon height={28} width={28} className='text-gray-700' />
                                <div className='pr-2 font-semibold '>
                                    {
                                        user ? (
                                            <div className="flex" onClick={() => history.push('/dashboard')}>
                                                <Username username={user.name} />
                                            </div>
                                        ) : (
                                            <Username username={'Register'} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className="flex-1"></div>
                            {
                                user ? (
                                    <p onClick={()=> history.push('/login')} className='font-bold text-gray-700 ml-8'>Logout</p>
                                ) : (
                                    <p onClick={() => history.push('/login')} className='font-bold text-gray-700 ml-8'>Join/Login</p>
                                )
                            }
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MobileNavDrawers