import { AnimatePresence, motion } from "framer-motion"
import React, { useRef, useState } from "react"

const GridUi = () => {
  const mainRef = useRef<HTMLDivElement>(null)
  const [bg, setBg] = useState(false)
  return (
    <motion.div
      className="grid grid-cols-[2fr,1fr,2fr] grid-rows-2  w-[100%]  gap-5 relative bg-pink-600 rounded-xl p-5 sm:w-[90%] md:w-[700px]"
      ref={mainRef}
    >
      <Layout
        extraClass={""}
        elmRef={mainRef}
        setBg={setBg}
      />
      <Layout
        extraClass={"col-span-2"}
        elmRef={mainRef}
        setBg={setBg}
      />
      <Layout
        extraClass={"col-span-2"}
        elmRef={mainRef}
        setBg={setBg}
      />
      <Layout
        extraClass={""}
        elmRef={mainRef}
        setBg={setBg}
      />
      <AnimatePresence>
        {bg && (
          <motion.div
            className="backdrop-blur-sm absolute inset-0 rounded-xl z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default GridUi

const Layout = ({
  extraClass,
  elmRef,
  setBg,
}: {
  extraClass: string
  elmRef: React.RefObject<HTMLDivElement>
  setBg: React.Dispatch<boolean>
}) => {
  const [val, setVal] = useState({
    in: false,
    x: 0,
    y: 0,
  })

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (val.in) {
      return
    }
    const currdiv = e.currentTarget.getBoundingClientRect()
    const maindiv = elmRef.current?.getBoundingClientRect()!
    setBg(true)
    const xcenter = maindiv.left + maindiv.width / 2
    const ycenter = maindiv.top + maindiv.height / 2

    setVal({
      in: true,
      x: xcenter - currdiv.left - currdiv.width / 2,
      y: ycenter - currdiv.top - currdiv.height / 2,
    })
  }
  return (
    <motion.div
      initial={"rest"}
      whileHover={val.in ? "rest" : "hover"}
      animate={val.in ? "move" : "rest"}
      variants={{
        hover: {
          scale: 0.9,
        },
        move: {
          x: val.x,
          y: val.y,
          zIndex: 20,
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        },
      }}
      onClick={handleClick}
      className={`bg-white rounded-xl flex flex-col py-3 px-4 justify-between  cursor-pointer h-full ${extraClass}`}
    >
      <AnimatePresence>
        {val.in && (
          <motion.button
            className="bg-red-500  text-white  rounded-full absolute h-[1.3rem] sm:h-[2rem] aspect-square  right-4 top-2 text-sm sm:text-lg flex justify-center items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={(e) => {
              e.stopPropagation()
              setBg(false)
              setVal({ ...val, in: false })
            }}
          >
            X
          </motion.button>
        )}
      </AnimatePresence>
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 aspect-square h-[30px] sm:h-[50px] rounded-full w-min mb-5" />
      <div className="space-y-2 sm:space-y-3">
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full h-2 sm:h-4 "
          variants={{
            hover: {
              width: "100%",
            },
            rest: {
              width: "40%",
            },
          }}
        />
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full h-2 sm:h-4"
          variants={{
            hover: {
              width: "40%",
            },
            rest: {
              width: "100%",
            },
          }}
        />
        <motion.div
          className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full h-2 sm:h-4"
          variants={{
            hover: {
              width: "100%",
            },
            rest: {
              width: "75%",
            },
          }}
        />
      </div>
    </motion.div>
  )
}
