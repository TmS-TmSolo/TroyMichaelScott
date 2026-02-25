import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body ?? {}

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        name: String(name ?? '').trim(),
        email: String(email ?? '').toLowerCase().trim(),
        subject: subject ? String(subject).trim() : 'general',
        message: String(message ?? '').trim(),
        formType: 'contact',
        status: 'new',
      },
    })

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit message. Please try again.' },
      { status: 500 }
    )
  }
}
