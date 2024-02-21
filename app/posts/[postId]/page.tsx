import getFormattedDate from '@/lib/getFormattedDate'
import { getPostsMeta, getPostByName } from '@/lib/posts'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import 'highlight.js/styles/github-dark.css' 

export const revalidate = 0

type Props = {
    params: {
        postId: string
    }
}

export async function generateStaticParams() {
    const posts = await getPostsMeta() //deduped!

    if (!posts) return []

    return posts.map((post) => ({
        postId: post.id
    }))
}

export async function generateMetadata({ params: { postId }}: Props ) {
    //const { postId } = params

    const post = await getPostByName(`${postId}.mdx`) //deduped!
    
    //const post = posts.find(post => post.id === postId)

    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }

    return {
        title: post.meta.title,
    }
}

export default async function Post({ params: { postId }}: Props ) {
    
    //const { postId } = params
    const post = await getPostByName(`${postId}.mdx`) //deduped!

    //if (!posts.find(post => post.id === postId)) { notFound() }
    if(!post) notFound()

    //const { title, date, contentHtml } = await getPostData(postId)
    const { meta, content } = post

    const pubDate = getFormattedDate(meta.date)

    const tags = meta.tags.map((tag, i) => (
        <Link key={i} href={`/tags/${tag}`}>{tag}</Link>
    ))
    return (
        <>
            <h2 className="text-3xl mt-4 mb-0">{meta.title}</h2>
            <div className='mt-1 flex gap-3 items-center'>
                <p className="text-sm">
                    {pubDate}
                </p>
                <p className='text-sm font-medium'>by Douglas Kipyegon</p>
                <span className='text-sm'>{meta.duration}</span>
            </div>
            <article>
                {content}
            </article>
            <section>
                <h3>Related:</h3>
                <div className="flex flex-row gap-4">
                    {tags}
                </div>
            </section>
            <p className="mb-10">
                <Link href="/">← Back to home</Link>
            </p>
        </>
  )
}
