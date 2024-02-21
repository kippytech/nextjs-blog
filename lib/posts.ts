import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import readingDuration from 'reading-duration'
import Video from '@/app/components/Video'
import CustomImage from '@/app/components/CustomImage'
type FileTree = {
    "tree": [
        {
            "path": string
        }
    ]
}

export async function getPostByName(fileName: string): Promise<BlogPost | undefined> {
    const res = await fetch(`https://raw.githubusercontent.com/kippytech/blogposts/main/${fileName}`, {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-Github-Api-Version': '2022-11-28'
        }
    })

    //console.log('Response:', await res.text());


    //if (!res.ok) return undefined
    if (!res.ok) {
        //console.error('Request failed:', await res.text()); // Log error message
        return undefined;
    }
    const rawMDX = await res.text()
    //const arrayBuffer = await res.arrayBuffer();
    //const rawMDX = new TextDecoder('utf-8').decode(arrayBuffer);

    //console.log('Raw MDX:', rawMDX)

    if (rawMDX === '404: Not Found') return undefined

    const duration = readingDuration(rawMDX, {})

    const { frontmatter, content } = await compileMDX<{ title: string, date: string, tags: string[], snippet: string }>({ source: rawMDX, components: { Video, CustomImage }, options: {
        parseFrontmatter: true,
        mdxOptions: {
            rehypePlugins: [
                rehypeHighlight as any,
                rehypeSlug,
                [rehypeAutolinkHeadings, {
                    behavior: 'wrap'
                }]
            ]
        }
    } })

    const id = fileName.replace(/\.mdx$/, '')

    const blogPostObj: BlogPost = { meta: { id, title: frontmatter.title, date: frontmatter.date, tags: frontmatter.tags, snippet:frontmatter.snippet, duration: duration }, content }

    return blogPostObj
}

export async function getPostsMeta(): Promise<Meta[] | undefined> {
    const res = await fetch('https://api.github.com/repos/kippytech/blogposts/git/trees/main?recursive=1', {
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'X-Github-Api-Version': '2022-11-28'
        }
    })

    if (!res.ok) return undefined

    const repoFileTree: FileTree = await res.json()

    const filesArray = repoFileTree.tree.map(obj => obj.path).filter(path => path.endsWith('.mdx'))

    console.log('Files Array:', filesArray);


    let posts: Meta[] = []

    for (const file of filesArray) {
        const post = await getPostByName(file)
        console.log(post)
        if (post) {
            const { meta } = post
            posts.push(meta)
        }
    }

    return posts.sort((a, b) => a.date < b.date ? 1 : -1)
}