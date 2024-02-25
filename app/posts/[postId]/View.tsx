'use client'

import React, { useEffect } from 'react'

interface ViewProps {
    slug: string
}

export const ReportView = ({slug}: ViewProps) => {

    useEffect(() => {
        fetch('/api/increment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({slug})
        })
    }, [slug])
  return null
}