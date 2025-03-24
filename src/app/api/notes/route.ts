import { addNote, getNotes } from '@/utils/noteStore';
import { NextRequest, NextResponse } from 'next/server';

export const GET = () => {
  return NextResponse.json(getNotes());
};

export const POST = async (req: NextRequest) => {
  const newNote = await req.json();
  addNote(newNote);
  return NextResponse.json(newNote);
};
