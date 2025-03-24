'use client'

import { use, useEffect, useState } from 'react';
import { Note } from '../../../../type';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import { formatDate } from '@/utils/helper';
import Header from '@/components/Header';
import { useForm, SubmitHandler } from 'react-hook-form';
import Loading from '@/components/Loading';
import { deleteNoteById, fetchNoteById, updateNoteById } from '@/utils/api';
import WithAuth from '@/components/WithAuth';

type FormInputs = {
    title: string;
    content: string;
};

const NoteDetails = ({ params }: { params: Promise<{ id: string }> }) => {
    const [note, setNote] = useState<null | Note>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const { id } = use(params);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FormInputs>();

    useEffect(() => {
        const loadNote = async () => {
            try {
                if (id) {
                    const note = await fetchNoteById(id);
                    if (note) {
                        setNote(note);
                        setValue('title', note.title);
                        setValue('content', note.content);
                    }
                }
            } catch (err) {
                console.error('Failed to fetch note:', err);
            } finally {
                setLoading(false);
            }
        };

        loadNote();
    }, [id, setValue]);

    const handleDelete = async () => {
        if (id) {
            await deleteNoteById(id);
            router.push('/');
        }
    };

    const handleSave: SubmitHandler<FormInputs> = async (data) => {
        if (note) {
            const updatedNote = { ...note, title: data.title, content: data.content };
            await updateNoteById(id, updatedNote);
            router.push('/');
        }
    };

    if (loading) return <Loading />

    if (!note) return <>
        <Header />
        <div className='w-full h-[80vh] flex items-center justify-center'>Note not found!</div>
    </>;

    return (
        <>
            <Header />
            <main className="container px-4 md:px-0 mx-auto mt-8">
                <Button
                    title="Back to Notes"
                    onClick={() => router.push('/')}
                    type="button"
                    buttonStyle="Cancel"
                />
                <div className="max-w-[800px] mx-auto mt-16">
                    <h1 className="text-2xl font-bold mb-1">{note.title}</h1>
                    <p className="text-sm text-gray-500">{formatDate(note.createdTime)}</p>

                    <form onSubmit={handleSubmit(handleSave)} className="my-6">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                {...register('title', {
                                    required: 'Title is required',
                                    maxLength: { value: 50, message: 'Title cannot be longer than 50 characters' },
                                })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Note Title"
                            />
                            {errors.title && (
                                <p className="text-red-500 text-sm">{(errors.title as any).message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-400 mb-1">
                                Content
                            </label>
                            <textarea
                                id="content"
                                {...register('content', {
                                    required: 'Content is required',
                                    maxLength: { value: 200, message: 'Content cannot be longer than 200 characters' },
                                })}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Note Content"
                            />
                            {errors.content && (
                                <p className="text-red-500 text-sm">{(errors.content as any).message}</p>
                            )}
                        </div>
                        <div className="flex justify-end space-x-4">
                            <Button
                                title="Save"
                                type="submit"
                            />
                            <Button
                                title="Delete"
                                onClick={handleDelete}
                                type="button"
                                buttonStyle="Delete"
                            />
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default WithAuth(NoteDetails);
