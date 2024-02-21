// import { NextRequest, NextResponse } from "next/server"

// interface WebhookPayload {
//     repository?: {
//         name?: string
//     };
//     action?: string
// }

// export default function POST(req: NextRequest, res: NextResponse) {
//     if (req.method === 'POST') {
//         const payload: WebhookPayload | ReadableStream<Uint8Array> | null= req.body

//     //extract relevant info:
//     const eventType: string = req.headers['x-github-event'] as string

//     const repoName = payload?.repository?.name
//     }
// }