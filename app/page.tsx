import Posts from "./components/Posts";

export const revalidate = 86400

export default function Home() {
  return (
    <div className="mx-auto">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello &#128075; and Welcome <span className="whitespace-nowrap">I'm <span className="font-bold">Daggy</span></span>
      </p>
      
      <Posts />
    </div>
  )
}