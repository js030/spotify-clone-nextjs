import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import {shuffle} from 'lodash';
import { useRecoilState, useRecoilValue } from "recoil";
import {playlistIdState, playlistState} from '../atoms/playlistAtom';
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

function Center() {

    const colors = [
        'from-indigo-500',
        'from-blue-500',
        'from-green-500',
        'from-red-500',
        'from-yellow-500',
        'from-pink-500',
        'from-purple-500',
      ];

    const {data : session} = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const playlistId = useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId])

    useEffect(() => {
      spotifyApi.getPlaylist(playlistId).then((data) => {
        setPlaylist(data.body);
      }).catch((err) => console.log("Something went wrong!", err));
    }, [spotifyApi, playlistId])


  return (
    <div className='flex flex-col flex-grow text-white h-screen overflow-y-scroll scrollbar-hide'>
        <header className="absolute top-5 right-8 ">
            <div className="flex items-center bg-red-300 space-x-3 
            opacity-90 hover:opacity-80 cursor-pointer rounded-full
            pr-2 p-1">
                <img
                onClick={signOut}
                className="rounded-full w-10 h-10"
                src="https://item.kakaocdn.net/do/d84248170c2c52303db27306a00fb861f604e7b0e6900f9ac53a43965300eb9a" alt="" />
            <h2>{session?.user.name}</h2>
            <ChevronDownIcon className="h-5 w-5"/>
            </div>
        </header>

        <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} text-white padding-8 w-full h-80 `}>
            <img className="h-44 w-44 shadow-2xl" src={playlist?.images[0]?.url} alt="" />
            <div>
              <p>PLAYLIST</p>
              <h1 className="text-2xl md:text-3xl xl:text-5xl">{playlist?.name}</h1>
            </div>
        </section>

        <div>
          <Songs/>
        </div>
    </div>
  )
}

export default Center