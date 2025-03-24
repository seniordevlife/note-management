import { getNote, updateNote, deleteNote } from '@/utils/noteStore';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (_: NextRequest, { params }: any) => {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const note = getNote(id);
    return note
        ? NextResponse.json(note)
        : NextResponse.json({ error: 'Not found' }, { status: 404 });
};

export const PUT = async (req: NextRequest, { params }: any) => {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const updated = await req.json();
    updateNote(id, updated);
    return NextResponse.json(updated);
};

export const DELETE = async (_: NextRequest, { params }: any) => {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    deleteNote(id);
    return NextResponse.json({ success: 'Note deleted successfully' });
};
