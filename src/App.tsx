import { motion } from "framer-motion"
import "./App.css"
import GridUi from "./components/GridUi"

function App() {
  return (
    <main className="bg-black h-screen text-white flex flex-col items-center pt-[5rem] w-screen">
      <PopUpTitle title="Grid Ui" />
      <GridUi />
    </main>
  )
}

export default App

const PopUpTitle = ({ title }: { title: string }) => {
  return (
    <motion.div
      className="mb-5 flex"
      initial={"rest"}
      transition={{
        staggerChildren: 0.1,
        delay: 0.5,
        type: "spring",
        bounce: 0,
      }}
      whileInView={"animate"}
    >
      {title.split("").map((i, num) =>
        i === " " ? (
          <p className="h-full w-5" />
        ) : (
          <motion.p
            key={`PopUpTitle-${num}`}
            className="text-7xl font-bold text-pink-600 "
            initial={{ scale: 0 }}
            variants={{
              animate: {
                scale: 1,
              },
              rest: { scale: 0 },
            }}
          >
            {i}
          </motion.p>
        )
      )}
    </motion.div>
  )
}
